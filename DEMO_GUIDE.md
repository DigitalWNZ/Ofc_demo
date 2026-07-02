# Game Analytics Data Catalog — Demo Guide

## Pre-Demo Checklist

- [ ] Demo URL is accessible and loads correctly
- [ ] Search returns results (test: "player retention")
- [ ] Context panel opens with schema details
- [ ] Screen is shared / projector is connected

## Demo Script (5-8 minutes)

### Opening (30 seconds)

> "Gaming companies generate massive amounts of player data — events, purchases, sessions, device info. But finding the right table and understanding what each column means is a constant challenge for analysts and data scientists. Let me show you how OKF and Dataplex Knowledge Catalog solve this."

### 1. Landing Page (30 seconds)

Show the hero section:
- Point out "17 tables across 4 data layers"
- Explain these represent a typical gaming analytics stack built on Firebase/GA4

### 2. Semantic Search — "player retention" (1 minute)

Click the **"player retention analysis"** chip.

> "Notice I'm searching in natural language — not SQL, not table names. The system understands what I mean by 'player retention' and returns the most relevant tables."

Point out the results:
- `dws_retention_cohort` — the primary retention analysis table
- Related tables like `dws_daily_active_users`

### 3. Deep Dive — Table Details (1.5 minutes)

Click on **dws_retention_cohort** to open the context panel.

Walk through:
- **Description**: "Pre-computed retention rates by install cohort..."
- **Metadata badges**: grain (cohort_day), partitions, database (BigQuery)
- **Schema**: Show columns like `d1_rate`, `d7_rate`, `d30_rate` with clear descriptions
- **Owner**: analytics_team — you know who to ask

> "All this metadata was defined once in a simple YAML file using OKF — the Open Knowledge Format. It's version-controlled, human-readable, and automatically synced to Dataplex."

### 4. Revenue Search (1 minute)

Search for **"how much money are players spending"**

> "The search understands business intent, not just keywords. It returns revenue tables, LTV predictions, and purchase-related data."

Click on `dws_revenue_daily` — show IAP, ad revenue, ARPU columns.

### 5. ML/AI Tables (1 minute)

Search for **"churn prediction"**

> "We also catalog ML model outputs. This churn prediction table helps the LiveOps team identify at-risk players before they leave."

Click on `ads_churn_prediction` — show `churn_probability`, `risk_tier`, `recommended_action`.

### 6. Game Design Analytics (1 minute)

Search for **"level completion funnel"**

> "Game designers need to know where players get stuck. This table tracks completion rates, average attempts, and time spent per level."

### Closing (30 seconds)

> "What you've seen is:
> 1. **OKF** — an open YAML format to define your data catalog
> 2. **Dataplex Knowledge Catalog** — Google Cloud's platform that makes it searchable
> 3. **Semantic search** — find data with natural language, no SQL needed
>
> This works with any data warehouse — BigQuery, Snowflake, Databricks — and scales to thousands of tables."

## FAQ / Objection Handling

**Q: How long does setup take?**
A: One-click deployment script. Define your tables in YAML, run `setup.sh`, done.

**Q: Does it work with our existing data warehouse?**
A: Yes — OKF is format-agnostic. The metadata layer is separate from the data itself. Works with BigQuery, Snowflake, Databricks, or any data platform.

**Q: How is this different from a data dictionary in a spreadsheet?**
A: Three key advantages: (1) version-controlled in Git, (2) semantic search instead of Ctrl+F, (3) automatically synced to a centralized catalog.

**Q: Can non-technical users use this?**
A: That's the point — natural language search means anyone can find data without knowing SQL or table names.

**Q: What about data governance and access control?**
A: Dataplex integrates with Google Cloud IAM. You can control who sees what at the project, dataset, or table level.
