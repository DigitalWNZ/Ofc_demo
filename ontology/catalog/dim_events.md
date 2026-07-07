---
catalogEntry:
  aspects:
    dataplex-types.global.generic:
      database: bigquery
      grain: snapshot
      owner: analytics_team
      primary_keys:
      - event_name
      schema: floodit_analytics
      table_name: dim_events
      timestamp_column: null
  resource: {}
description: Event name dimension table providing business context for raw event data.
  Maps event names to categories, human-readable descriptions, and metadata flags.
  Distinguishes auto-collected events from custom events, and identifies which events
  are marked as conversions for attribution and funnel analysis.
title: Event Dimension
type: dataplex-types.global.generic
---
# Event Dimension

Event name dimension table providing business context for raw event data. Maps event names to categories, human-readable descriptions, and metadata flags. Distinguishes auto-collected events from custom events, and identifies which events are marked as conversions for attribution and funnel analysis.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| event_name | STRING | The canonical event name, serving as the primary key. Joins to events.event_name for enrichment. |
| event_category | STRING | The business category of the event (e.g., engagement, monetization, progression, social). Used for grouping events in reports. |
| event_description | STRING | A human-readable description of what the event represents and when it fires. Provides business context for analysts. |
| is_auto_collected | BOOLEAN | Flag indicating whether the event is automatically collected by the Firebase SDK (true) or custom-instrumented by the development team (false). |
| is_conversion | BOOLEAN | Flag indicating whether the event has been marked as a conversion in the Firebase console. Conversion events drive attribution and funnel reporting. |
| event_group | STRING | A higher-level grouping for events (e.g., core_loop, ftue, store, social). Enables aggregate analysis across related event types. |
