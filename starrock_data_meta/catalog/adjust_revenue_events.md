---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource: {}
description: In-app purchase and ad revenue events reported through Adjust. Used for
  ROAS calculation, LTV modeling, and campaign-level revenue attribution.
title: Adjust Revenue Events
type: dataplex-types.global.generic
---
# Adjust Revenue Events

In-app purchase and ad revenue events reported through Adjust. Used for ROAS calculation, LTV modeling, and campaign-level revenue attribution.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| event_id | STRING | Unique identifier for the revenue event. |
| adid | STRING | Adjust device ID linking this event to an attributed user. |
| revenue | DECIMAL | Revenue amount in the reported currency. |
| currency | STRING | ISO 4217 currency code for the revenue event. |
| network | STRING | Attributed ad network for this revenue event. |
| event_time | TIMESTAMP | Timestamp when the revenue event occurred. |
