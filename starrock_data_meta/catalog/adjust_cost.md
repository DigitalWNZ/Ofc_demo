---
catalogEntry:
  aspects:
    dataplex-types.global.generic:
      database: starrocks
      grain: daily
      owner: ua_team
      partitions:
      - date
      primary_keys:
      - date
      - network
      - campaign
      schema: adjust
      table_name: adjust_cost
      timestamp_column: date
  resource: {}
description: Daily campaign cost data synced from Adjust cost aggregation API. Joined
  with revenue events to compute CPI, CPA, and ROAS per network and campaign.
title: Adjust Cost Data
type: dataplex-types.global.generic
---
# Adjust Cost Data

Daily campaign cost data synced from Adjust cost aggregation API. Joined with revenue events to compute CPI, CPA, and ROAS per network and campaign.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| date | DATE | Date of the cost record. |
| network | STRING | Ad network name. |
| campaign | STRING | Campaign name within the network. |
| spend | DECIMAL | Total ad spend in USD for this campaign on this date. |
| installs | INTEGER | Number of installs attributed to this campaign on this date. |
