#!/bin/bash -e

PROJECT_ID="${GCP_PROJECT:-gpu-launchpad-playground}"
REGION="${GCP_LOCATION:-us-central1}"
ENTRY_GROUP="${ENTRY_GROUP:-okf_demo}"

echo "=== OKF Catalog Ingestion ==="
echo "Project:     $PROJECT_ID"
echo "Region:      $REGION"
echo "Entry Group: $ENTRY_GROUP"
echo ""

# Build kcmd if not available
if [ -z "$KCMD" ]; then
  if [ ! -d "/tmp/knowledge-catalog" ]; then
    echo "Building kcmd from source..."
    git clone --depth 1 https://github.com/GoogleCloudPlatform/knowledge-catalog /tmp/knowledge-catalog
    cd /tmp/knowledge-catalog/toolbox/mdcode
    npm install
    npm run build
    cd -
  fi
  KCMD="/tmp/knowledge-catalog/toolbox/mdcode/dist/kcmd"
fi

# Create entry group if needed
if ! gcloud dataplex entry-groups describe "$ENTRY_GROUP" \
    --location="$REGION" --project="$PROJECT_ID" &>/dev/null; then
  echo "Creating entry group: $ENTRY_GROUP"
  gcloud dataplex entry-groups create "$ENTRY_GROUP" \
    --location="$REGION" --project="$PROJECT_ID"
fi

# Update catalog.yaml scope
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sed -i "s|^scope:.*|scope: kb.${PROJECT_ID}.${REGION}.${ENTRY_GROUP}|" "$SCRIPT_DIR/catalog.yaml"

# Initialize and push each catalog directory
for catalog_dir in bigquery_data_meta starrock_data_meta unstructure_data_meta; do
  echo ""
  echo "--- Pushing $catalog_dir ---"
  cd "$SCRIPT_DIR/$catalog_dir"

  # Create catalog.yaml if missing, otherwise update scope
  if [ ! -f catalog.yaml ]; then
    "$KCMD" init --kb "${PROJECT_ID}.${REGION}.${ENTRY_GROUP}"
  else
    sed -i "s|^scope:.*|scope: kb.${PROJECT_ID}.${REGION}.${ENTRY_GROUP}|" catalog.yaml
  fi

  "$KCMD" push
done

echo ""
echo "Catalog ingestion complete."
