---
catalogEntry:
  aspects:
    dataplex-types.global.generic: {}
  resource: {}
description: Device dimension table containing reference data for device models, brands,
  and operating systems. Used for device-level performance analysis, compatibility
  testing prioritization, and understanding the hardware landscape of the player base
  to guide optimization efforts.
title: Device Dimension
type: dataplex-types.global.generic
---
# Device Dimension

Device dimension table containing reference data for device models, brands, and operating systems. Used for device-level performance analysis, compatibility testing prioritization, and understanding the hardware landscape of the player base to guide optimization efforts.

## Schema

| Column | Type | Description |
|--------|------|-------------|
| device_model | STRING | The specific device model identifier (e.g., Pixel 7, SM-G991B, iPhone 14). Part of the composite primary key. |
| device_brand | STRING | The manufacturer or brand of the device (e.g., Google, Samsung, Apple). Used for brand-level performance segmentation. |
| device_category | STRING | The form factor category of the device (e.g., mobile, tablet, desktop). Influences UI/UX optimization priorities. |
| operating_system | STRING | The operating system name (e.g., Android, iOS). Part of the composite primary key alongside device_model. |
| os_version | STRING | The OS version string (e.g., 14.0, 13). Used for minimum OS version support decisions and version-specific bug tracking. |
| screen_resolution | STRING | The screen resolution of the device (e.g., 1080x2400, 2532x1170). Important for UI asset optimization and rendering performance analysis. |
| is_supported | BOOLEAN | Flag indicating whether the device is officially supported by the current game version. Unsupported devices may experience degraded performance. |
