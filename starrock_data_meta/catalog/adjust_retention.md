---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource:
    labels:
      system: starrocks
      kind: table
description: Daily retention cohort data from Adjust. Tracks D1 through D30 retention
  rates per install cohort, broken down by network and campaign. Used to evaluate
  user quality across acquisition channels.
title: Adjust Retention Cohort
type: dataplex-types.global.generic
---
# Adjust Retention Cohort

Daily retention cohort data from Adjust. Tracks D1 through D30 retention rates per install cohort, broken down by network and campaign. Used to evaluate user quality across acquisition channels.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| cohort_date | DATE | Install date defining the cohort. |
| network | STRING | Ad network the cohort was acquired from. |
| campaign | STRING | Campaign name within the network. |
| cohort_size | INTEGER | Number of installs in this cohort. |
| d1_rate | FLOAT | Day-1 retention rate (0.0–1.0). |
| d7_rate | FLOAT | Day-7 retention rate (0.0–1.0). |
| d30_rate | FLOAT | Day-30 retention rate (0.0–1.0). |
