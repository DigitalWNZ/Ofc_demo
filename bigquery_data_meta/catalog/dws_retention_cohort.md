---
catalogEntry:
  aspects:
    dataplex-types.global.generic:
      database: bigquery
      grain: cohort_day
      owner: analytics_team
      partitions:
      - cohort_date
      primary_keys:
      - cohort_date
      - platform
      - country
      schema: floodit_analytics
      table_name: dws_retention_cohort
      timestamp_column: cohort_date
  resource: {}
description: Player retention cohort analysis with pre-computed retention rates by
  install cohort. Tracks D1 through D30 retention broken down by platform and country.
  The key table for measuring long-term player engagement, game stickiness, and the
  impact of game updates on player loyalty.
title: Retention Cohort Analysis
type: dataplex-types.global.generic
---
# Retention Cohort Analysis

Player retention cohort analysis with pre-computed retention rates by install cohort. Tracks D1 through D30 retention broken down by platform and country. The key table for measuring long-term player engagement, game stickiness, and the impact of game updates on player loyalty.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| cohort_date | STRING | The install (first_open) date defining the cohort, formatted as YYYYMMDD. Partition key for cohort-based retention lookups. |
| platform | STRING | The platform dimension for comparing retention curves across Android, iOS, and Web. |
| country | STRING | The country dimension for geographic retention analysis and identifying regional engagement differences. |
| cohort_size | BIGINT | The number of new players in this cohort (i.e., players who first opened the app on cohort_date for this platform and country). |
| d1_retained | BIGINT | The number of cohort players who returned and were active on day 1 after install. |
| d3_retained | BIGINT | The number of cohort players who returned and were active on day 3 after install. |
| d7_retained | BIGINT | The number of cohort players who returned and were active on day 7 after install. A standard industry benchmark for early retention. |
| d14_retained | BIGINT | The number of cohort players who returned and were active on day 14 after install. |
| d30_retained | BIGINT | The number of cohort players who returned and were active on day 30 after install. The long-term retention benchmark. |
| d1_rate | DOUBLE | Day-1 retention rate — d1_retained divided by cohort_size. The most commonly watched early retention metric in the gaming industry. |
| d7_rate | DOUBLE | Day-7 retention rate — d7_retained divided by cohort_size. A key mid-term engagement indicator and industry benchmark. |
| d30_rate | DOUBLE | Day-30 retention rate — d30_retained divided by cohort_size. Measures long-term stickiness and is correlated with sustainable revenue. |
