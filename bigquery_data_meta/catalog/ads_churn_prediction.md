---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: bigquery
      kind: table
description: ML model output scoring each player's likelihood of churning within the
  next 7 days. Includes risk tiers, engagement scores, win-back likelihood, and recommended
  retention actions. Enables proactive retention interventions such as push notifications,
  bonus rewards, or personalized offers targeted at at-risk players.
title: Churn Risk Prediction
type: dataplex-types.global.generic
---
# Churn Risk Prediction

ML model output scoring each player's likelihood of churning within the next 7 days. Includes risk tiers, engagement scores, win-back likelihood, and recommended retention actions. Enables proactive retention interventions such as push notifications, bonus rewards, or personalized offers targeted at at-risk players.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| user_pseudo_id | STRING | The pseudonymous player identifier for whom the churn prediction is generated. |
| prediction_date | STRING | The date the churn prediction was generated, in YYYYMMDD format. Partition key for tracking prediction freshness. |
| churn_probability | DOUBLE | The estimated probability (0.0 to 1.0) that this player will not return within the next 7 days. Higher values indicate greater churn risk. |
| risk_tier | STRING | The categorical churn risk tier (e.g., low, medium, high, critical). Derived from churn_probability thresholds for use in retention campaign targeting. |
| days_inactive | INT | The number of consecutive days the player has been inactive as of the prediction_date. A strong behavioral predictor of churn. |
| last_active_date | STRING | The most recent date the player was active, in YYYYMMDD format. Provides recency context for the churn prediction. |
| sessions_last_7d | INT | The number of sessions the player had in the 7 days preceding the prediction_date. A key engagement feature for the churn model. |
| engagement_score | DOUBLE | A composite engagement score (0.0 to 1.0) combining session frequency, duration, and depth. Used as a feature in the churn model and for player health monitoring. |
| win_back_likelihood | DOUBLE | The estimated probability (0.0 to 1.0) that a targeted retention intervention will successfully bring this player back. Used to prioritize intervention spend. |
| recommended_action | STRING | The model-recommended retention intervention (e.g., push_notification, bonus_reward, discount_offer, personal_message). Actionable output for the LiveOps team. |
