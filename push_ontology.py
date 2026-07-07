#!/usr/bin/env python3
"""Push ontology entries to Dataplex Knowledge Catalog using the Python SDK."""

import os
import yaml
from google.cloud import dataplex_v1

PROJECT_ID = os.environ.get("GCP_PROJECT", "leon-demo-486305")
LOCATION = os.environ.get("GCP_LOCATION", "us-central1")
ENTRY_GROUP = os.environ.get("ENTRY_GROUP", "gaming-ontology")
ONTOLOGY_PATH = "bigquery_data/ontology.yaml"

ENTRY_TYPE = "projects/dataplex-types/locations/global/entryTypes/generic"
OVERVIEW_ASPECT_TYPE = "dataplex-types.global.overview"
OVERVIEW_ASPECT_TYPE_FULL = "projects/dataplex-types/locations/global/aspectTypes/overview"
GENERIC_ASPECT_TYPE = "dataplex-types.global.generic"
GENERIC_ASPECT_TYPE_FULL = "projects/dataplex-types/locations/global/aspectTypes/generic"


def sanitize_id(entry_id: str) -> str:
    """Convert ontology ID to valid Dataplex entry ID."""
    return entry_id.replace(".", "_")


def build_description_md(entry: dict, columns: list[dict] | None = None) -> str:
    """Build markdown overview content for an entry."""
    lines = []
    desc = entry.get("description", "")
    if desc:
        lines.append(desc)
        lines.append("")

    if entry.get("type") == "table":
        meta_fields = [
            ("Grain", "grain"),
            ("Database", "database"),
            ("Schema", "schema"),
            ("Owner", "owner"),
            ("Timestamp Column", "timestamp_column"),
        ]
        meta_parts = []
        for label, key in meta_fields:
            if key in entry:
                meta_parts.append(f"**{label}:** {entry[key]}")
        if meta_parts:
            lines.append(" | ".join(meta_parts))
            lines.append("")

        pks = entry.get("primary_keys", [])
        if pks:
            lines.append(f"**Primary Keys:** {', '.join(pks)}")
            lines.append("")

        parts = entry.get("partitions", [])
        if parts:
            lines.append(f"**Partitions:** {', '.join(parts)}")
            lines.append("")

    if columns:
        lines.append("## Schema")
        lines.append("")
        lines.append("| Column | Type | Description |")
        lines.append("|--------|------|-------------|")
        for col in columns:
            lines.append(
                f"| {col['name']} | {col.get('data_type', '')} | {col.get('description', '')} |"
            )

    return "\n".join(lines)


def main():
    with open(ONTOLOGY_PATH) as f:
        entries = yaml.safe_load(f)

    tables = [e for e in entries if e.get("type") == "table"]
    columns = [e for e in entries if e.get("type") == "column"]

    cols_by_table: dict[str, list[dict]] = {}
    for col in columns:
        table_ref = col.get("table", "")
        cols_by_table.setdefault(table_ref, []).append(col)

    client = dataplex_v1.CatalogServiceClient()
    parent = f"projects/{PROJECT_ID}/locations/{LOCATION}/entryGroups/{ENTRY_GROUP}"

    print(f"Pushing ontology to {parent}")
    print(f"Tables: {len(tables)}, Columns: {len(columns)}")
    print()

    success = 0
    errors = 0

    for table in tables:
        table_id = table["id"]
        table_name = table.get("table_name", table_id.replace("table.", ""))
        table_cols = cols_by_table.get(table_id, [])
        display_name = table.get("name", table_name)
        desc_md = build_description_md(table, table_cols)

        entry_id = sanitize_id(table_id)

        entry = dataplex_v1.Entry()
        entry.entry_type = ENTRY_TYPE
        entry.entry_source = dataplex_v1.EntrySource()
        entry.entry_source.display_name = display_name
        entry.entry_source.description = table.get("description", "")

        entry.aspects = {
            OVERVIEW_ASPECT_TYPE: dataplex_v1.Aspect(
                aspect_type=OVERVIEW_ASPECT_TYPE_FULL,
                data={"content": desc_md, "contentType": "MARKDOWN"},
            ),
            GENERIC_ASPECT_TYPE: dataplex_v1.Aspect(
                aspect_type=GENERIC_ASPECT_TYPE_FULL,
                data={"type": "table", "system": "bigquery"},
            ),
        }

        try:
            request = dataplex_v1.CreateEntryRequest(
                parent=parent,
                entry_id=entry_id,
                entry=entry,
            )
            client.create_entry(request=request)
            print(f"  [OK] {display_name} ({table_name})")
            success += 1
        except Exception as exc:
            if "ALREADY_EXISTS" in str(exc):
                try:
                    entry.name = f"{parent}/entries/{entry_id}"
                    update_request = dataplex_v1.UpdateEntryRequest(entry=entry)
                    client.update_entry(request=update_request)
                    print(f"  [UP] {display_name} ({table_name}) — updated")
                    success += 1
                except Exception as ue:
                    print(f"  [ERR] {display_name}: {ue}")
                    errors += 1
            else:
                print(f"  [ERR] {display_name}: {exc}")
                errors += 1

    # Push column entries
    print(f"\nPushing {len(columns)} column entries...")
    for col in columns:
        col_name = col["name"]
        table_ref = col.get("table", "")
        table_entry_id = sanitize_id(table_ref)
        col_entry_id = f"{table_entry_id}__col__{col_name}"
        desc = col.get("description", "")

        entry = dataplex_v1.Entry()
        entry.entry_type = ENTRY_TYPE
        entry.parent_entry = f"{parent}/entries/{table_entry_id}"
        entry.entry_source = dataplex_v1.EntrySource()
        entry.entry_source.display_name = col_name
        entry.entry_source.description = desc

        col_md = f"{desc}\n\nData type: `{col.get('data_type', '')}`"
        entry.aspects = {
            OVERVIEW_ASPECT_TYPE: dataplex_v1.Aspect(
                aspect_type=OVERVIEW_ASPECT_TYPE_FULL,
                data={"content": col_md, "contentType": "MARKDOWN"},
            ),
            GENERIC_ASPECT_TYPE: dataplex_v1.Aspect(
                aspect_type=GENERIC_ASPECT_TYPE_FULL,
                data={"type": "column", "system": "bigquery"},
            ),
        }

        try:
            request = dataplex_v1.CreateEntryRequest(
                parent=parent,
                entry_id=col_entry_id,
                entry=entry,
            )
            client.create_entry(request=request)
            success += 1
        except Exception as exc:
            if "ALREADY_EXISTS" in str(exc):
                try:
                    entry.name = f"{parent}/entries/{col_entry_id}"
                    update_request = dataplex_v1.UpdateEntryRequest(entry=entry)
                    client.update_entry(request=update_request)
                    success += 1
                except Exception:
                    errors += 1
            else:
                errors += 1

    print(f"\nDone: {success} succeeded, {errors} errors")


if __name__ == "__main__":
    main()
