---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: bigquery
      kind: table
description: Player properties snapshot table extracted from the GA4 user_properties
  repeated field. Stores the latest set of player attributes such as first_open_time,
  engagement level, and custom user properties. Used for player segmentation, cohort
  construction, and enriching event-level analysis with stable user traits.
title: Player Properties Snapshot
type: dataplex-types.global.generic
---
# Player Properties Snapshot

Player properties snapshot table extracted from the GA4 user_properties repeated field. Stores the latest set of player attributes such as first_open_time, engagement level, and custom user properties. Used for player segmentation, cohort construction, and enriching event-level analysis with stable user traits.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| user_pseudo_id | STRING | The pseudonymous player identifier linking properties back to the events table and all downstream analytics. |
| property_name | STRING | The name of the user property (e.g., first_open_time, engagement_level, player_tier). Defines what attribute is being stored. |
| string_value | STRING | The string value of the user property, when the property is text-typed. Mutually exclusive with int_value and double_value for a given property. |
| int_value | BIGINT | The integer value of the user property, when the property is integer-typed. Used for numeric properties like total sessions or level reached. |
| double_value | DOUBLE | The floating-point value of the user property, when the property is decimal-typed. Used for properties like lifetime revenue or engagement score. |
| set_timestamp | BIGINT | Unix timestamp in microseconds when this property value was last set. Used to determine the recency of player attribute data. |
| snapshot_date | STRING | The date of the snapshot in YYYYMMDD format. Partition key enabling point-in-time lookups of player properties. |
