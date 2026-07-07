---
description: Standard methodology for classifying users based on monthly activity
  and business plans.
relations:
- target: gs://my-bucket/catalog/datasets/user_login_log.md
  type: depends_on
- target: gs://my-bucket/catalog/tables/user_profiles.md
  type: depends_on
resource: https://docs.qq.com/doc/doc_user_segmentation_v2
tags:
- user-segmentation
- logins
- user-metrics
timestamp: '2026-06-25T06:56:32Z'
title: Tencent Docs User Segmentation Guide
type: okf-concept
---

# Tencent Docs User Segmentation Guide

## Overview
Standard methodology for classifying users based on monthly activity and business plans.

## Extracted Semantic Concepts

### Elite Tier Users
Enterprise plan users exhibiting high platform usage of greater than 15 active logins per month.

### Active Tier Users
Regular users logging into the platform between 5 and 15 times within a calendar month.

## Knowledge Relationships and Linages

| Target Entity | Relationship Type |
| --- | --- |
| `gs://my-bucket/catalog/datasets/user_login_log.md` | depends_on |
| `gs://my-bucket/catalog/tables/user_profiles.md` | depends_on |


*Metadata generated automatically via Gemini on 2026-06-25 06:56:32 UTC*