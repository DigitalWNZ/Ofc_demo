---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: bigquery
      kind: table
description: ML-driven player segmentation combining engagement patterns, monetization
  behavior, and progression signals into actionable player clusters. Assigns each
  player a behavioral segment, monetization tier, and engagement level. Used for targeted
  communications, personalized in-game experiences, and LiveOps campaign planning.
title: Player Behavioral Segments
type: dataplex-types.global.generic
---
# Player Behavioral Segments

ML-driven player segmentation combining engagement patterns, monetization behavior, and progression signals into actionable player clusters. Assigns each player a behavioral segment, monetization tier, and engagement level. Used for targeted communications, personalized in-game experiences, and LiveOps campaign planning.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| user_pseudo_id | STRING | The pseudonymous player identifier for this segmentation record. |
| segment_date | STRING | The date this segmentation was computed, in YYYYMMDD format. Partition key enabling historical segment migration analysis. |
| player_segment | STRING | The primary behavioral segment label (e.g., hardcore_grinder, casual_explorer, social_player, at_risk_churner). Drives personalization and targeting strategies. |
| monetization_tier | STRING | The monetization-based tier (e.g., whale, dolphin, minnow, non_payer). Categorizes players by their spending behavior for targeted offers. |
| engagement_level | STRING | The engagement level label (e.g., highly_engaged, moderately_engaged, lightly_engaged, dormant). Based on session frequency and depth signals. |
| days_since_install | INT | The number of days since the player's first_open event. Provides lifecycle stage context for the segmentation. |
| lifetime_sessions | BIGINT | The player's total session count since install. A cumulative engagement metric used as a segmentation input feature. |
| lifetime_revenue_usd | DOUBLE | The player's total revenue contribution in USD since install. A cumulative monetization metric used for tier assignment. |
| current_level | INT | The highest game level the player has reached. Indicates progression depth and content consumption stage. |
| preferred_play_time | STRING | The player's most common play time window (e.g., morning, afternoon, evening, night). Used for optimal push notification and LiveOps event timing. |
