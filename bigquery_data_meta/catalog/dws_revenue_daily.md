---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: bigquery
      kind: table
description: Daily revenue aggregation across all monetization channels. Combines
  in-app purchase (IAP) revenue, advertising revenue, and subscription revenue into
  a unified daily view. Includes derived metrics such as ARPU (average revenue per
  user), ARPPU (average revenue per paying user), and paying user conversion rate.
  The single source for all revenue reporting.
title: Daily Revenue
type: dataplex-types.global.generic
---
# Daily Revenue

Daily revenue aggregation across all monetization channels. Combines in-app purchase (IAP) revenue, advertising revenue, and subscription revenue into a unified daily view. Includes derived metrics such as ARPU (average revenue per user), ARPPU (average revenue per paying user), and paying user conversion rate. The single source for all revenue reporting.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| date | STRING | The reporting date in YYYYMMDD format. Partition key for time-series revenue analysis. |
| platform | STRING | The platform dimension (ANDROID, IOS, WEB) for platform-level revenue breakdown. |
| country | STRING | The country dimension for geographic revenue segmentation and regional performance tracking. |
| iap_revenue_usd | DOUBLE | Total in-app purchase revenue in USD for this date, platform, and country. Includes all completed purchase transactions. |
| ad_revenue_usd | DOUBLE | Total advertising revenue in USD, aggregated from rewarded video, interstitial, and banner ad impressions. |
| subscription_revenue_usd | DOUBLE | Total subscription revenue in USD, including initial purchases and renewals. |
| total_revenue_usd | DOUBLE | Sum of all revenue streams (IAP + ads + subscriptions) in USD. The headline revenue metric for executive reporting. |
| paying_users | BIGINT | The number of unique players who made at least one purchase (IAP or subscription) on this date. |
| transactions | BIGINT | The total number of completed purchase transactions on this date. A single player may contribute multiple transactions. |
| arpu | DOUBLE | Average Revenue Per User — total_revenue_usd divided by DAU. Measures the average monetization yield across all active players. |
| arppu | DOUBLE | Average Revenue Per Paying User — total_revenue_usd divided by paying_users. Measures spending intensity among players who convert. |
| conversion_rate | DOUBLE | The percentage of DAU who made at least one purchase. A key monetization health metric, typically expressed as a decimal (e.g., 0.03 = 3%). |
