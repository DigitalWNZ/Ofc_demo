---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: bigquery
      kind: table
description: Player session statistics aggregated daily by platform and country. Includes
  session counts, duration distributions, depth metrics, and engagement patterns.
  Used for understanding play behavior, identifying engagement trends, and benchmarking
  session quality across player segments.
title: Session Statistics
type: dataplex-types.global.generic
---
# Session Statistics

Player session statistics aggregated daily by platform and country. Includes session counts, duration distributions, depth metrics, and engagement patterns. Used for understanding play behavior, identifying engagement trends, and benchmarking session quality across player segments.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| date | STRING | The reporting date in YYYYMMDD format. Partition key for session behavior trend analysis. |
| platform | STRING | The platform dimension (ANDROID, IOS, WEB) for comparing session behavior across platforms. |
| country | STRING | The country dimension for geographic segmentation of session metrics. |
| total_sessions | BIGINT | The total number of sessions recorded on this date for this platform and country combination. |
| unique_users | BIGINT | The number of distinct players who had at least one session on this date. Equivalent to DAU for this dimension slice. |
| avg_session_duration_sec | DOUBLE | The mean session duration in seconds. May be skewed by long-tail sessions; use median for a more robust central tendency. |
| median_session_duration_sec | DOUBLE | The median session duration in seconds. More robust than the mean for understanding typical player session length. |
| avg_sessions_per_user | DOUBLE | The average number of sessions per unique player. Higher values indicate stronger daily re-engagement patterns. |
| avg_events_per_session | DOUBLE | The average number of events triggered per session. A proxy for session depth and interaction richness. |
| bounce_rate | DOUBLE | The percentage of sessions with only a single event (or shorter than a minimum threshold). High bounce rates may indicate onboarding or technical issues. |
