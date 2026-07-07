#!/usr/bin/env python3
"""Convert bigquery_data_meta.yaml into kcmd-compatible markdown catalog files."""

import os
import yaml

ONTOLOGY_PATH = "bigquery_data/bigquery_data_meta.yaml"
CATALOG_DIR = "bigquery_data_meta/catalog"


def table_to_md(table: dict, columns: list[dict]) -> str:
    """Generate markdown for a table entry."""
    title = table.get("name", table["table_name"])
    desc = table.get("description", "")

    meta = {}
    for key in ("grain", "timestamp_column", "primary_keys", "partitions",
                "database", "owner", "schema", "table_name"):
        if key in table:
            meta[key] = table[key]

    frontmatter = {
        "type": "dataplex-types.global.generic",
        "title": title,
        "description": desc,
        "catalogEntry": {
            "resource": {},
            "aspects": {
                "dataplex-types.global.generic": meta,
            },
        },
    }

    body_lines = [f"# {title}", "", desc, ""]
    if columns:
        body_lines.append("## Schema")
        body_lines.append("")
        body_lines.append("| Column | Type | Description |")
        body_lines.append("|--------|------|-------------|")
        for col in columns:
            body_lines.append(
                f"| {col['name']} | {col.get('data_type', '')} | {col.get('description', '')} |"
            )

    fm = yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True).strip()
    body = "\n".join(body_lines)
    return f"---\n{fm}\n---\n{body}\n"


def column_to_md(col: dict) -> str:
    """Generate markdown for a column entry."""
    title = col["name"]
    desc = col.get("description", "")
    data_type = col.get("data_type", "")

    meta = {"data_type": data_type}
    if "entity" in col:
        meta["entity"] = col["entity"]

    frontmatter = {
        "type": "dataplex-types.global.generic",
        "title": title,
        "description": desc,
        "catalogEntry": {
            "resource": {},
            "aspects": {
                "dataplex-types.global.generic": meta,
            },
        },
    }

    body = f"# {title}\n\n{desc}"
    if data_type:
        body += f"\n\nData type: `{data_type}`"

    fm = yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True).strip()
    return f"---\n{fm}\n---\n{body}\n"


def index_md(tables: list[dict]) -> str:
    """Generate root index markdown."""
    frontmatter = {
        "type": "dataplex-types.global.generic",
        "title": "Game Analytics Data Catalog",
        "description": "Gaming analytics data catalog based on Firebase/GA4 for the Flood-It! puzzle game",
        "catalogEntry": {
            "resource": {},
            "aspects": {
                "dataplex-types.global.generic": {},
            },
        },
    }

    lines = [
        "# Game Analytics Data Catalog",
        "",
        "Gaming analytics data catalog with 17 tables across 4 data layers,",
        "based on Firebase/GA4 BigQuery export schema for the Flood-It! puzzle game.",
        "",
        "## Tables",
        "",
    ]
    for t in tables:
        name = t.get("table_name", t["id"].replace("table.", ""))
        title = t.get("name", name)
        lines.append(f"- [{title}]({name}.md)")

    fm = yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True).strip()
    body = "\n".join(lines)
    return f"---\n{fm}\n---\n{body}\n"


def main():
    with open(ONTOLOGY_PATH) as f:
        entries = yaml.safe_load(f)

    tables = [e for e in entries if e.get("type") == "table"]
    columns = [e for e in entries if e.get("type") == "column"]

    # Group columns by table
    cols_by_table: dict[str, list[dict]] = {}
    for col in columns:
        table_ref = col.get("table", "")
        cols_by_table.setdefault(table_ref, []).append(col)

    # Clean and create catalog directory
    os.makedirs(CATALOG_DIR, exist_ok=True)

    # Write root index
    with open(os.path.join(CATALOG_DIR, "index.md"), "w") as f:
        f.write(index_md(tables))
    print(f"  index.md")

    # Write each table and its columns
    for table in tables:
        table_id = table["id"]
        table_name = table.get("table_name", table_id.replace("table.", ""))
        table_cols = cols_by_table.get(table_id, [])

        # Write table markdown
        with open(os.path.join(CATALOG_DIR, f"{table_name}.md"), "w") as f:
            f.write(table_to_md(table, table_cols))
        print(f"  {table_name}.md ({len(table_cols)} columns)")

        # Write column markdowns
        if table_cols:
            col_dir = os.path.join(CATALOG_DIR, table_name)
            os.makedirs(col_dir, exist_ok=True)
            for col in table_cols:
                col_name = col["name"]
                with open(os.path.join(col_dir, f"{col_name}.md"), "w") as f:
                    f.write(column_to_md(col))

    total_files = 1 + len(tables) + len(columns)
    print(f"\nGenerated {total_files} files in {CATALOG_DIR}/")


if __name__ == "__main__":
    main()
