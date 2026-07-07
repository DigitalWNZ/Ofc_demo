---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: bigquery
      kind: table
description: Aggregated outcomes of Firebase A/B Testing and Remote Config experiments.
  Contains statistical significance metrics including p-values, sample sizes, conversion
  rates, and revenue impact per variant. The authoritative source for data-driven
  game design decisions, feature rollout evaluations, and monetization experiments.
title: A/B Test Results
type: dataplex-types.global.generic
---
# A/B Test Results

Aggregated outcomes of Firebase A/B Testing and Remote Config experiments. Contains statistical significance metrics including p-values, sample sizes, conversion rates, and revenue impact per variant. The authoritative source for data-driven game design decisions, feature rollout evaluations, and monetization experiments.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| experiment_id | STRING | The unique identifier for the A/B test experiment. Part of the composite primary key and used for joining to experiment metadata. |
| experiment_name | STRING | The human-readable name of the experiment (e.g., "New Tutorial Flow v2", "Holiday Sale Banner"). Used for display in experiment dashboards. |
| variant | STRING | The variant name within the experiment (e.g., control, variant_a, variant_b). Part of the composite primary key. |
| start_date | STRING | The date the experiment started collecting data, in YYYYMMDD format. Defines the observation window start. |
| end_date | STRING | The date the experiment stopped collecting data, in YYYYMMDD format. May be null for ongoing experiments. |
| sample_size | BIGINT | The number of players assigned to this variant. Required for statistical power assessment and significance calculations. |
| conversion_rate | DOUBLE | The primary conversion rate for this variant, expressed as a decimal. The definition of "conversion" is experiment-specific (e.g., purchase, level completion). |
| revenue_per_user | DOUBLE | The average revenue generated per player in this variant during the experiment window. A key metric for monetization experiments. |
| retention_d7 | DOUBLE | The day-7 retention rate for players in this variant. Used to evaluate whether the experiment positively or negatively impacts player retention. |
| p_value | DOUBLE | The statistical p-value comparing this variant against the control group. Values below 0.05 are typically considered statistically significant. |
| is_significant | BOOLEAN | Flag indicating whether the result reached statistical significance (p_value < 0.05 and sufficient sample size). Used for automated experiment graduation decisions. |
