---
catalogEntry:
  aspects:
    dataplex-types.global.generic:
      database: starrocks
      grain: event
      owner: ua_team
      partitions:
      - created_at
      primary_keys:
      - callback_id
      schema: adjust
      table_name: adjust_callbacks
      timestamp_column: created_at
  resource: {}
description: Raw callback events from Adjust SDK covering installs, sessions, reattributions,
  and in-app revenue events. Each row is one server-to-server callback.
title: Adjust Callbacks
type: dataplex-types.global.generic
---
# Adjust Callbacks

Raw callback events from Adjust SDK covering installs, sessions, reattributions, and in-app revenue events. Each row is one server-to-server callback.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| callback_id | STRING | Unique identifier for the callback event. |
| adid | STRING | Adjust device ID used for attribution. |
| activity_kind | STRING | Type of activity — install, session, reattribution, or event. |
| network | STRING | Ad network that drove the activity (e.g. Google Ads, Meta, TikTok). |
| campaign | STRING | Campaign name within the ad network. |
| created_at | TIMESTAMP | Timestamp when the callback was received. |
