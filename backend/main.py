"""FastAPI backend for the Knowledge Catalog Web Application.

Exposes search and context-lookup endpoints that wrap the Dataplex
Knowledge Catalog client defined in ``search_catalog.py``.

Run locally:
    uvicorn backend.main:app --reload --port 8000
"""

import os
import re
import sys
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional

import yaml
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

# ---------------------------------------------------------------------------
# Make the project root importable so we can reuse search_catalog helpers.
# ---------------------------------------------------------------------------
_PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_PROJECT_ROOT))

from search_catalog import (  # noqa: E402
    _extract_location,
    lookup_context,
    search_entries,
)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------
DEFAULT_PROJECT = os.environ.get("GCP_PROJECT", "gpu-launchpad-playground")
FRONTEND_DIST = _PROJECT_ROOT / "frontend" / "dist"
CATALOG_DIR = _PROJECT_ROOT / "unstructure_data_meta" / "catalog"
SOURCE_FILE_DIR = _PROJECT_ROOT / "unstructure_data"

# ---------------------------------------------------------------------------
# Application lifespan — singleton Dataplex client
# ---------------------------------------------------------------------------
_catalog_client = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create (and later tear-down) the Dataplex CatalogServiceClient."""
    global _catalog_client  # noqa: PLW0603
    try:
        from google.cloud import dataplex_v1

        _catalog_client = dataplex_v1.CatalogServiceClient()
        print("✓ CatalogServiceClient initialised successfully.")
    except Exception as exc:
        print(
            f"⚠ Failed to create CatalogServiceClient: {exc}\n"
            "  The /api/search and /api/context endpoints will return 503."
        )
        _catalog_client = None
    yield
    _catalog_client = None


# ---------------------------------------------------------------------------
# FastAPI app
# ---------------------------------------------------------------------------
app = FastAPI(
    title="Knowledge Catalog API",
    description="Search and explore Dataplex Knowledge Catalog entries.",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — allow everything for local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------
class SearchRequest(BaseModel):
    """Body for ``POST /api/search``."""

    query: str = Field(..., description="Search query (natural language or keyword).")
    limit: int = Field(
        default=5,
        ge=1,
        le=1000,
        description="Max results to return (1–1000).",
    )
    project: Optional[str] = Field(
        default=None,
        description="GCP project ID to scope the search to. Defaults to server-configured project.",
    )
    location: Optional[str] = Field(
        default=None,
        description="GCP location to scope the search to (e.g. 'us-central1').",
    )
    semantic: bool = Field(
        default=True,
        description="Use semantic (natural language) search. Syntax predicates (e.g. entry_group=X) also work in semantic mode.",
    )


class SearchResponse(BaseModel):
    """Response for ``POST /api/search``."""

    results: list[dict]
    total: int
    mode: str


class ContextResponse(BaseModel):
    """Response for ``GET /api/context``."""

    entry_name: str
    display_name: str = ""
    entry_type: str = ""
    context_raw: str
    context_parsed: Optional[dict | list] = None


class FileContentResponse(BaseModel):
    """Response for ``GET /api/file``."""

    slug: str
    title: str = ""
    source_file_id: str = ""
    content: str


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _require_client():
    """Return the singleton client or raise HTTP 503."""
    if _catalog_client is None:
        raise HTTPException(
            status_code=503,
            detail=(
                "Dataplex CatalogServiceClient is not available. "
                "Check server logs for credential / initialisation errors."
            ),
        )
    return _catalog_client


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------
@app.post("/api/search", response_model=SearchResponse)
async def api_search(body: SearchRequest):
    """Search the Knowledge Catalog using semantic (natural language) search.

    Wraps ``search_entries()`` from ``search_catalog.py`` and returns
    matching entries together with a count and the search mode.
    """
    client = _require_client()
    try:
        project = body.project or DEFAULT_PROJECT
        scope = None
        if body.location:
            scope = f"projects/{project}/locations/{body.location}"
        elif body.project:
            scope = f"projects/{project}"
        raw_results = search_entries(
            client=client,
            project=project,
            query=body.query,
            semantic=body.semantic,
            limit=body.limit,
            scope=scope,
        )
        # Map field names from search_catalog.py → frontend expected shape.
        results = []
        for r in raw_results:
            labels = r.get("labels", {})
            results.append({
                "entry_name": r.get("name", ""),
                "display_name": r.get("display_name", ""),
                "entry_type": r.get("entry_type", ""),
                "description": r.get("description", ""),
                "system": labels.get("system", r.get("system", "")),
                "kind": labels.get("kind", ""),
                "labels": labels,
                "resource_path": r.get("resource", ""),
                "fully_qualified_name": r.get("fqn", ""),
                "parent": r.get("parent", ""),
            })
        return SearchResponse(results=results, total=len(results), mode="semantic" if body.semantic else "syntax")
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Search failed: {exc}",
        ) from exc


@app.get("/api/context", response_model=ContextResponse)
async def api_context(
    entry_name: str = Query(..., description="Full Dataplex entry resource name."),
):
    """Retrieve rich context (schema, descriptions, quality …) for one entry.

    The raw YAML string is always returned.  If YAML parsing succeeds the
    structured data is provided in ``context_parsed``; otherwise it is
    ``null``.
    """
    client = _require_client()
    try:
        location = _extract_location(entry_name)
        raw_yaml = lookup_context(
            client=client,
            project=DEFAULT_PROJECT,
            location=location,
            resource_names=[entry_name],
            context_format="yaml",
        )
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Context lookup failed: {exc}",
        ) from exc

    # Best-effort YAML → dict/list parsing.
    parsed = None
    try:
        parsed = yaml.safe_load(raw_yaml)
    except Exception:
        pass  # Return context_parsed=null; raw string is still available.

    # Extract display_name and entry_type from the context if available.
    display_name = ""
    entry_type = ""
    if isinstance(parsed, dict):
        display_name = parsed.get("display_name", "") or parsed.get("name", "")
        entry_type = parsed.get("entry_type", "") or parsed.get("type", "")

    return ContextResponse(
        entry_name=entry_name,
        display_name=display_name,
        entry_type=entry_type,
        context_raw=raw_yaml or "",
        context_parsed=parsed,
    )


def _parse_frontmatter(text: str) -> tuple[dict, str]:
    """Split a markdown file into YAML frontmatter dict and body string."""
    m = re.match(r"^---\s*\n(.*?\n)---\s*\n(.*)", text, re.DOTALL)
    if not m:
        return {}, text
    try:
        fm = yaml.safe_load(m.group(1)) or {}
    except Exception:
        fm = {}
    return fm, m.group(2)


@app.get("/api/file", response_model=FileContentResponse)
async def api_file(
    entry_name: str = Query(..., description="Full Dataplex entry name."),
):
    """Return the source document content for a file-type catalog entry.

    Extracts the slug from the entry name, reads the catalog markdown,
    and returns the document body.  If a matching source file exists in
    ``unstructure_data/``, that content is returned instead.
    """
    slug = entry_name.rstrip("/").rsplit("/", 1)[-1]
    safe = re.sub(r"[^a-zA-Z0-9_\-]", "", slug)
    if not safe:
        raise HTTPException(status_code=400, detail="Invalid entry name")

    catalog_path = CATALOG_DIR / f"{safe}.md"
    if not catalog_path.is_file():
        raise HTTPException(status_code=404, detail=f"Catalog entry not found: {safe}")

    raw = catalog_path.read_text(encoding="utf-8")
    fm, body = _parse_frontmatter(raw)
    title = fm.get("title", "")
    source_file_id = fm.get("source_file_id", "")

    content = body
    if source_file_id:
        source_path = SOURCE_FILE_DIR / f"{source_file_id}.md"
        if source_path.is_file():
            src_raw = source_path.read_text(encoding="utf-8")
            _, src_body = _parse_frontmatter(src_raw)
            content = src_body

    return FileContentResponse(
        slug=safe,
        title=title,
        source_file_id=source_file_id,
        content=content.strip(),
    )


# ---------------------------------------------------------------------------
# Static file serving & SPA catch-all
# ---------------------------------------------------------------------------
if FRONTEND_DIST.is_dir():
    # Serve built frontend assets (JS, CSS, images …).
    app.mount(
        "/assets",
        StaticFiles(directory=str(FRONTEND_DIST / "assets")),
        name="static-assets",
    )

    @app.get("/{full_path:path}")
    async def spa_catch_all(full_path: str):
        """Serve ``index.html`` for any non-API route (SPA client-side routing)."""
        index = FRONTEND_DIST / "index.html"
        if index.is_file():
            return FileResponse(str(index))
        raise HTTPException(status_code=404, detail="index.html not found")
