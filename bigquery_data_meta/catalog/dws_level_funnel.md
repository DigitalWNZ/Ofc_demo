---
catalogEntry:
  aspects:
    dataplex-types.global.generic:
      database: bigquery
      grain: daily_level
      owner: analytics_team
      partitions:
      - date
      primary_keys:
      - date
      - level_number
      schema: floodit_analytics
      table_name: dws_level_funnel
      timestamp_column: date
  resource: {}
description: Level completion funnel metrics tracking player progression through game
  levels. Captures starts, completions, failures, time spent, and retry patterns for
  each level. Essential for game design optimization, difficulty curve balancing,
  and identifying levels that cause excessive player drop-off.
title: Level Completion Funnel
type: dataplex-types.global.generic
---
# Level Completion Funnel

Level completion funnel metrics tracking player progression through game levels. Captures starts, completions, failures, time spent, and retry patterns for each level. Essential for game design optimization, difficulty curve balancing, and identifying levels that cause excessive player drop-off.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| date | STRING | The reporting date in YYYYMMDD format. Partition key for tracking level performance trends over time. |
| level_number | INT | The numeric identifier of the game level. Links to game design data for difficulty and content analysis. |
| level_name | STRING | The human-readable name or label of the game level, as displayed to the player in the UI. |
| starts | BIGINT | The total number of times this level was started (including retries) on this date. The top of the level completion funnel. |
| completions | BIGINT | The total number of successful level completions on this date. Compared against starts to calculate the completion rate. |
| failures | BIGINT | The total number of level failures (player ran out of moves or time) on this date. High failure rates may indicate difficulty balancing issues. |
| completion_rate | DOUBLE | The ratio of completions to starts, expressed as a decimal. The primary metric for evaluating level difficulty and player success. |
| avg_duration_sec | DOUBLE | The average time in seconds players spent on a single attempt of this level. Indicates level complexity and engagement. |
| avg_attempts | DOUBLE | The average number of attempts players needed before completing this level. High values suggest the level may be frustrating. |
| unique_players | BIGINT | The number of distinct players who attempted this level on this date. Provides reach context for the funnel metrics. |
| first_time_completion_rate | DOUBLE | The percentage of players who completed this level on their first attempt. A more stringent measure of level accessibility than overall completion rate. |
