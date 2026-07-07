#!/bin/bash
set -euo pipefail

PROJECT_ID="${1:?Usage: ./setup.sh PROJECT_ID [REGION]}"
REGION="${2:-us-central1}"
ENTRY_GROUP="gaming-catalog"
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

# ─── Step 3: Build kcmd and ingest catalog ───
echo "[3/5] Ingesting gaming catalog into Knowledge Catalog..."
KCMD_DIR="/tmp/knowledge-catalog"
if [ ! -d "$KCMD_DIR" ]; then
  git clone --depth 1 https://github.com/GoogleCloudPlatform/knowledge-catalog "$KCMD_DIR"
  cd "$KCMD_DIR/toolbox/mdcode"
  npm install && npm run build
  cd -
fi
KCMD="$KCMD_DIR/toolbox/mdcode/dist/kcmd"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sed -i "s|^scope:.*|scope: kb.${PROJECT_ID}.${REGION}.${ENTRY_GROUP}|" "$SCRIPT_DIR/bigquery_data_meta/catalog.yaml"

cd "$SCRIPT_DIR/bigquery_data_meta"
"$KCMD" init --kb "${PROJECT_ID}.${REGION}.${ENTRY_GROUP}"
"$KCMD" push
cd "$SCRIPT_DIR"

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
