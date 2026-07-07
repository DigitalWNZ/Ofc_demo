---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource: {}
description: Firebase Crashlytics crash and error reports. Records application crashes,
  non-fatal errors, and ANR (Application Not Responding) events with stack traces
  and device context. Used for stability monitoring, crash-free user rate tracking,
  and prioritizing bug fixes that impact player experience and retention.
title: Crashlytics Reports
type: dataplex-types.global.generic
---
# Crashlytics Reports

Firebase Crashlytics crash and error reports. Records application crashes, non-fatal errors, and ANR (Application Not Responding) events with stack traces and device context. Used for stability monitoring, crash-free user rate tracking, and prioritizing bug fixes that impact player experience and retention.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| report_id | STRING | Unique identifier for the crash or error report. Primary key for deduplication and individual report lookup. |
| event_date | STRING | The date the crash or error occurred, formatted as YYYYMMDD. Partition key for time-based crash trend analysis. |
| event_type | STRING | The type of stability event — crash (fatal application termination), non_fatal (handled exception), or anr (Application Not Responding timeout). |
| user_pseudo_id | STRING | The pseudonymous player identifier, linking crash reports to player profiles and engagement data for impact assessment. |
| app_version | STRING | The application version that produced the crash. Essential for identifying version-specific regressions and prioritizing hotfixes. |
| os_version | STRING | The operating system version on the affected device. Helps identify OS-specific crashes and compatibility issues. |
| device_model | STRING | The model of the device that experienced the crash. Used to detect device-specific hardware or driver issues. |
| issue_id | STRING | The Crashlytics issue group identifier. Groups individual crash reports by root cause for aggregate impact analysis. |
| issue_title | STRING | Human-readable title of the crash issue, typically the exception class and top-of-stack method. Used for quick triage and prioritization. |
| blame_frame | STRING | The stack frame identified by Crashlytics as the most likely root cause of the crash. Accelerates debugging by pointing engineers to the responsible code. |
