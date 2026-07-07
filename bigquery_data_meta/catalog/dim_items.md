---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource: {}
description: Master data for all virtual goods, currency packs, and purchasable items
  in the game. Contains pricing, categorization, rarity, and consumability attributes.
  Links to revenue and purchase event analysis, enabling monetization teams to evaluate
  item performance and optimize the in-game economy.
title: In-Game Item Catalog
type: dataplex-types.global.generic
---
# In-Game Item Catalog

Master data for all virtual goods, currency packs, and purchasable items in the game. Contains pricing, categorization, rarity, and consumability attributes. Links to revenue and purchase event analysis, enabling monetization teams to evaluate item performance and optimize the in-game economy.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| item_id | STRING | The unique identifier for the in-game item or product SKU. Primary key linking to purchase events and revenue analysis. |
| item_name | STRING | The display name of the item as shown to players in the in-game store (e.g., "Gem Pack 500", "Premium Pass"). |
| item_category | STRING | The category of the item (e.g., currency_pack, power_up, cosmetic, subscription). Used for category-level revenue analysis. |
| item_type | STRING | The type classification of the item (e.g., virtual_currency, booster, skin, bundle). A finer-grained classification than item_category. |
| price_usd | DOUBLE | The base price of the item in US dollars. Used for revenue forecasting and price point optimization analysis. |
| currency_type | STRING | The currency used to purchase this item (e.g., real_money, gems, coins). Distinguishes between hard-currency and soft-currency items. |
| is_consumable | BOOLEAN | Whether the item is consumed upon use (true) or permanently owned (false). Consumable items drive repeat purchases and recurring revenue. |
| rarity | STRING | The rarity tier of the item (e.g., common, rare, epic, legendary). Affects perceived value and influences pricing strategy. |
| description | STRING | A text description of the item's function or benefit, as displayed in the in-game item detail view. |
