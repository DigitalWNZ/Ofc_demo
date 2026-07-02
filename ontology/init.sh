#!/bin/bash -e

PROJECT_ID="${GCP_PROJECT:-lufeng-demo}"
REGION="${GCP_LOCATION:-us-central1}"
ENTRY_GROUP="${ENTRY_GROUP:-gaming-ontology}"

echo "=== OKF Ontology Ingestion ==="
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

# Initialize and push
cd "$SCRIPT_DIR"
"$KCMD" init --kb "${PROJECT_ID}.${REGION}.${ENTRY_GROUP}"
"$KCMD" push

echo "Ontology ingestion complete."
