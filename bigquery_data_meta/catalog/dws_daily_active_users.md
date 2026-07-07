---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource: {}
description: Daily active user metrics aggregation. Pre-computed DAU, WAU, and MAU
  broken down by platform, country, and user type. The primary source for player engagement
  KPIs and executive dashboards. Enables fast time-series analysis of player base
  growth without scanning the raw event log.
title: Daily Active Users
type: dataplex-types.global.generic
---
# Daily Active Users

Daily active user metrics aggregation. Pre-computed DAU, WAU, and MAU broken down by platform, country, and user type. The primary source for player engagement KPIs and executive dashboards. Enables fast time-series analysis of player base growth without scanning the raw event log.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| date | STRING | The reporting date in YYYYMMDD format. Partition key for efficient time-range queries on engagement metrics. |
| platform | STRING | The platform dimension (ANDROID, IOS, WEB). Enables platform-level engagement comparison and trend analysis. |
| country | STRING | The country dimension for geographic segmentation of active user metrics. |
| dau | BIGINT | Daily Active Users — the count of unique players who triggered at least one event on this date, platform, and country combination. |
| wau | BIGINT | Weekly Active Users — the count of unique players active in the trailing 7-day window ending on this date. |
| mau | BIGINT | Monthly Active Users — the count of unique players active in the trailing 30-day window ending on this date. |
| new_users | BIGINT | The number of first-time players whose first_open event occurred on this date. A key growth and acquisition metric. |
| returning_users | BIGINT | The number of players who were active on this date and had a first_open event on a prior date. Measures the health of the returning player base. |
| avg_session_duration_sec | DOUBLE | The average session duration in seconds across all sessions on this date. A proxy for engagement depth and content quality. |
| sessions_per_user | DOUBLE | The average number of sessions per active player on this date. Higher values indicate stronger daily engagement habits. |
