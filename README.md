# Game Analytics Data Catalog Demo

Showcase **Open Knowledge Format (OKF)** and **Google Cloud Knowledge Catalog** using a gaming industry data catalog. Search and explore 17 game analytics tables with natural language — no SQL needed.

Built on the [Firebase public dataset](https://developers.google.com/analytics/bigquery/app-gaming-demo-dataset) (Flood-It! puzzle game, `firebase-public-project.analytics_153293282`).

## Quick Start

```bash
# One-click deploy (requires gcloud CLI, Node.js 18+, Python 3.10+)
chmod +x setup.sh
./setup.sh YOUR_PROJECT_ID us-central1
```

This will:
1. Enable Knowledge Catalog and Cloud Run APIs
2. Create a Knowledge Catalog entry group
3. Ingest the gaming catalog via `kcmd`
4. Deploy the web app to Cloud Run
5. Print the demo URL

## Architecture

```
bigquery_data/bigquery_data_meta.yaml ← 17 gaming tables defined in OKF YAML
        │
        ▼
bigquery_data_meta/init.sh (kcmd init + push) ← Converts OKF → Knowledge Catalog entries
        │
        ▼
Knowledge Catalog             ← Semantic search + context APIs
        │
        ├── search_catalog.py          ← CLI: semantic / keyword search
        │
        └── backend/main.py           ← FastAPI + React web UI
```

## Data Catalog: 17 Tables Across 4 Layers

| Layer | Tables | Description |
|-------|--------|-------------|
| **Raw/DWD** | `events`, `user_properties`, `crashlytics_reports` | GA4/Firebase raw exports |
| **DWS** | `dws_daily_active_users`, `dws_revenue_daily`, `dws_level_funnel`, `dws_session_stats`, `dws_retention_cohort`, `dws_acquisition_channel` | Pre-aggregated analytics |
| **DIM** | `dim_events`, `dim_countries`, `dim_devices`, `dim_items` | Reference/dimension tables |
| **ADS** | `ads_player_ltv`, `ads_churn_prediction`, `ads_ab_test_results`, `ads_player_segmentation` | ML outputs and application layer |

## Run Locally

```bash
# Install dependencies
pip install -r backend/requirements.txt
cd frontend && npm install && npm run build && cd ..

# Set your project (optional — defaults to lufeng-demo)
export GCP_PROJECT=your-project-id

# Start
uvicorn backend.main:app --reload --port 8000
# Open http://localhost:8000
```

## Run with Docker

```bash
docker build -t okf-gaming-demo .
docker run -p 8080:8080 \
    -e GCP_PROJECT=your-project-id \
    -v ~/.config/gcloud:/root/.config/gcloud:ro \
    okf-gaming-demo
```

## CLI Search

```bash
# Semantic search
python3 search_catalog.py "player retention" --semantic
python3 search_catalog.py "in-app purchase revenue" --semantic

# Keyword search
python3 search_catalog.py "name:dws_revenue_daily"
```

## Configuration

All settings are configurable via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `GCP_PROJECT` | `gpu-launchpad-playground` | GCP project ID |
| `GCP_LOCATION` | `us-central1` | Knowledge Catalog region |
| `ENTRY_GROUP` | `okf_demo` | Knowledge Catalog entry group name |

## Demo Guide

See [DEMO_GUIDE.md](DEMO_GUIDE.md) for a scripted demo flow with talking points and FAQ.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Metadata | OKF (YAML) |
| Catalog | Google Cloud Knowledge Catalog |
| Backend | FastAPI (Python 3.12) |
| Frontend | React 19 + TypeScript + Vite |
| Deploy | Docker + Cloud Run |
