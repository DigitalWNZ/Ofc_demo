#!/bin/bash
set -euo pipefail

PROJECT_ID="${1:?Usage: ./setup.sh PROJECT_ID [REGION]}"
REGION="${2:-us-central1}"
ENTRY_GROUP="okf_demo"
SERVICE_NAME="okf-gaming-demo"

echo "============================================"
echo "  OKF Gaming Demo — One-Click Setup"
echo "============================================"
echo "  Project:     $PROJECT_ID"
echo "  Region:      $REGION"
echo "  Entry Group: $ENTRY_GROUP"
echo ""

# ─── Step 1: Enable APIs ───
echo "[1/5] Enabling required APIs..."
gcloud services enable \
  dataplex.googleapis.com \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  --project="$PROJECT_ID" --quiet

# ─── Step 2: Create Dataplex entry group ───
echo "[2/5] Creating Dataplex entry group..."
if ! gcloud dataplex entry-groups describe "$ENTRY_GROUP" \
    --location="$REGION" --project="$PROJECT_ID" &>/dev/null; then
  gcloud dataplex entry-groups create "$ENTRY_GROUP" \
    --location="$REGION" --project="$PROJECT_ID"
  echo "  Created: $ENTRY_GROUP"
else
  echo "  Already exists: $ENTRY_GROUP"
fi

# ─── Step 3: Ingest catalogs ───
echo "[3/5] Ingesting catalogs into Knowledge Catalog..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export GCP_PROJECT="$PROJECT_ID"
export GCP_LOCATION="$REGION"
export ENTRY_GROUP="$ENTRY_GROUP"
"$SCRIPT_DIR/init.sh"

# ─── Step 4: Deploy to Cloud Run ───
echo "[4/5] Building and deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --region "$REGION" \
  --project "$PROJECT_ID" \
  --allow-unauthenticated \
  --set-env-vars "GCP_PROJECT=$PROJECT_ID,GCP_LOCATION=$REGION,ENTRY_GROUP=$ENTRY_GROUP" \
  --quiet

# ─── Step 5: Show URL ───
URL=$(gcloud run services describe "$SERVICE_NAME" \
  --region="$REGION" --project="$PROJECT_ID" \
  --format="value(status.url)")

echo ""
echo "============================================"
echo "  Setup Complete!"
echo ""
echo "  Demo URL: $URL"
echo "============================================"
