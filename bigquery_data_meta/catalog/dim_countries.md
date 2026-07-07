---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource: {}
description: Country and region dimension table providing geographic reference data
  for player segmentation and regional analysis. Includes hierarchical geography (country,
  sub-continent, continent), local currency codes, and market tier classifications
  used for revenue normalization and regional strategy.
title: Country Dimension
type: dataplex-types.global.generic
---
# Country Dimension

Country and region dimension table providing geographic reference data for player segmentation and regional analysis. Includes hierarchical geography (country, sub-continent, continent), local currency codes, and market tier classifications used for revenue normalization and regional strategy.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| country_code | STRING | ISO 3166-1 alpha-2 country code (e.g., US, JP, BR). The primary key joining to event and aggregation tables. |
| country_name | STRING | The full English name of the country (e.g., United States, Japan, Brazil). Used for display in dashboards and reports. |
| region | STRING | The geographic region within the continent (e.g., Northern America, Southeast Asia, Western Europe). Enables regional rollup reporting. |
| sub_continent | STRING | The sub-continental grouping (e.g., Northern America, Eastern Asia, Southern Europe). A mid-level geographic hierarchy. |
| continent | STRING | The continent name (e.g., Americas, Asia, Europe, Africa, Oceania). The top-level geographic hierarchy for global rollups. |
| currency_code | STRING | The primary local currency code (e.g., USD, JPY, BRL). Used for revenue localization and currency conversion context. |
| tier | STRING | Market tier classification (e.g., T1, T2, T3) based on purchasing power and ad market maturity. Drives regional monetization strategy and CPI benchmarks. |
