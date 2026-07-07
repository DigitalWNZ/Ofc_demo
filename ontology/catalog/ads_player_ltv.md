---
catalogEntry:
  aspects:
    dataplex-types.global.generic:
      database: bigquery
      grain: player_snapshot
      owner: analytics_team
      partitions:
      - prediction_date
      primary_keys:
      - user_pseudo_id
      - prediction_date
      schema: floodit_analytics
      table_name: ads_player_ltv
      timestamp_column: prediction_date
  resource: {}
description: ML-generated player lifetime value predictions combining historical spending
  behavior with engagement signals. Provides per-player LTV estimates, confidence
  scores, percentile rankings, and segment assignments. Used for player valuation,
  high-value player identification, and marketing targeting to maximize return on
  acquisition spend.
title: Player Lifetime Value
type: dataplex-types.global.generic
---
# Player Lifetime Value

ML-generated player lifetime value predictions combining historical spending behavior with engagement signals. Provides per-player LTV estimates, confidence scores, percentile rankings, and segment assignments. Used for player valuation, high-value player identification, and marketing targeting to maximize return on acquisition spend.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| user_pseudo_id | STRING | The pseudonymous player identifier for whom the LTV prediction is generated. |
| prediction_date | STRING | The date the LTV prediction was generated, in YYYYMMDD format. Partition key enabling comparison of predictions over time. |
| predicted_ltv_usd | DOUBLE | The model's predicted total lifetime value for this player in USD, covering all future monetization from IAP, ads, and subscriptions. |
| ltv_percentile | INT | The player's percentile rank within the LTV distribution (0-100). Players at the 99th percentile are whale-tier high-value players. |
| days_since_install | INT | The number of days between the player's first_open event and the prediction_date. Provides context for the prediction's maturity. |
| total_spend_usd | DOUBLE | The player's cumulative in-app purchase spending in USD up to the prediction_date. A key input feature to the LTV model. |
| total_sessions | BIGINT | The player's cumulative session count up to the prediction_date. An engagement signal used as an input feature to the LTV model. |
| predicted_30d_revenue | DOUBLE | The model's predicted revenue from this player over the next 30 days in USD. A shorter-horizon prediction useful for near-term planning. |
| confidence_score | DOUBLE | The model's confidence in the LTV prediction, expressed as a value between 0 and 1. Lower scores indicate higher uncertainty, often for new players. |
| ltv_segment | STRING | The LTV-based player segment label (e.g., whale, dolphin, minnow, free_player). Derived from predicted_ltv_usd thresholds for use in targeting rules. |
