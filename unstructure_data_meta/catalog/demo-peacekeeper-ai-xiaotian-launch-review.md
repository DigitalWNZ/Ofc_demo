---
type: dataplex-types.global.generic
title: Demo-和平精英AI明星队友小田上线前业务复盘
description: 《和平精英》近两年持续探索 AI NPC、AI 队友和大模型交互能力。公开资料显示，《和平精英》曾接入 DeepSeek，为数字代言人“吉莉”注入人工智能，并计划推出由策略大模型驱动的
  AI 明星队友“小田”。
resource: https://docs.qq.com/doc/DWVFXUVFYVG9qVEFp
source_system: tencent_docs
source_file_id: 300000000$YQWQQXTojTAi
domain: 和平精英 / AI NPC
owner: 产品运营团队
tags:
- peacekeeper-elite
- ai-npc
- ai-companion
- retention
- launch-review
timestamp: '2026-06-26T04:55:43Z'
relations:
- target: https://docs.qq.com/doc/DWVFXUVFYVG9qVEFp
  type: source
- target: concept:ai-companion
  type: discusses
- target: concept:ai-anti-cheat
  type: discusses
- target: concept:new-user-retention
  type: discusses
- target: product:peacekeeper-elite
  type: references
public_sources:
- https://gp.qq.com/gicp/news/736/18793217.html
- https://www.news.cn/tech/20260529/ea67a3b2d56340e9a8fdddf9f38877df/c.html
- https://gp.qq.com/gicp/news/736/18578244.html
catalogEntry:
  resource: {}
  aspects:
    dataplex-types.global.generic: {}
---

# Demo-和平精英AI明星队友小田上线前业务复盘

## Overview

《和平精英》近两年持续探索 AI NPC、AI 队友和大模型交互能力。公开资料显示，《和平精英》曾接入 DeepSeek，为数字代言人“吉莉”注入人工智能，并计划推出由策略大模型驱动的 AI 明星队友“小田”。

## Source Document

- Tencent Docs: https://docs.qq.com/doc/DWVFXUVFYVG9qVEFp
- Source file id: `300000000$YQWQQXTojTAi`
- Owner: 产品运营团队
- Domain: 和平精英 / AI NPC

## Key Sections

- 和平精英 AI 明星队友“小田”上线前业务复盘（Demo）
- 一、背景
- 二、业务目标
- 三、用户场景拆解
- 1. 新手引导
- 2. 对局辅助
- 3. 情感陪伴
- 四、Demo 假设指标
- 五、风险与治理点
- 六、OKF/Knowledge Catalog 可抽取知识
- 七、公开资料依据

## Related Concepts

- [Source Tencent Doc](https://docs.qq.com/doc/DWVFXUVFYVG9qVEFp) — `source`
- [ai-companion](/unstructure_data/concepts/ai-companion.md) — `discusses`
- [ai-anti-cheat](/unstructure_data/concepts/ai-anti-cheat.md) — `discusses`
- [new-user-retention](/unstructure_data/concepts/new-user-retention.md) — `discusses`
- [peacekeeper-elite](/unstructure_data/products/peacekeeper-elite.md) — `references`

## Citations

- [1] https://gp.qq.com/gicp/news/736/18793217.html
- [2] https://www.news.cn/tech/20260529/ea67a3b2d56340e9a8fdddf9f38877df/c.html
- [3] https://gp.qq.com/gicp/news/736/18578244.html

## Original Working Document

<!--
Tencent Document Title: Demo-和平精英AI明星队友小田上线前业务复盘
Tencent Document URL: https://docs.qq.com/doc/DWVFXUVFYVG9qVEFp
Document Type: launch_review
Demo Note: 演示样例文档，公开资料事实 + Demo 业务复盘结构。
-->

# 和平精英 AI 明星队友“小田”上线前业务复盘（Demo）

## 一、背景

《和平精英》近两年持续探索 AI NPC、AI 队友和大模型交互能力。公开资料显示，《和平精英》曾接入 DeepSeek，为数字代言人“吉莉”注入人工智能，并计划推出由策略大模型驱动的 AI 明星队友“小田”。

SPARK 2026 相关报道披露，《和平精英》AI NPC 玩法累计体验用户已达 1.1 亿，“小田”具备独立故事背景与记忆功能，定位从工具型辅助升级为情感型陪伴与策略协助。

## 二、业务目标

1. 降低战术竞技新手的学习门槛。
2. 提供对局中的路线规划、资源点位建议和风险提醒。
3. 在大厅、活动、对局等场景中形成持续陪伴。
4. 通过明星虚拟形象提高 AI 能力的可感知度和传播度。

## 三、用户场景拆解

### 1. 新手引导

新玩家进入海岛地图时，对跑圈、搜物资、枪械选择和交火时机理解不足。AI 队友可以通过自然语言提供即时提示，减少挫败感。

### 2. 对局辅助

中低段位玩家在跑圈、战术转移、是否接战等决策上需要轻量建议。AI 队友可根据局势给出路线和风险提示。

### 3. 情感陪伴

传统 NPC 缺少记忆和人格连续性，“小田”的独立背景与记忆功能可帮助其从功能入口升级为长期陪伴对象。

## 四、Demo 假设指标

以下指标为演示用假设指标：

| 指标 | 观察目的 | 预期变化 |
| --- | --- | --- |
| 新手首局完成率 | 衡量 AI 队友是否降低早期流失 | 提升 |
| AI 队友互动轮数 | 衡量陪伴能力是否被主动使用 | 提升 |
| 对局中策略建议采纳率 | 衡量 AI 建议是否有实际价值 | 待验证 |
| AI 回复负反馈率 | 衡量内容安全和体验风险 | 下降 |

## 五、风险与治理点

1. 成本风险：大模型实时调用会带来云端推理成本，需要分层调用和缓存策略。
2. 公平性风险：AI 战术建议不能破坏竞技公平，需要明确能力边界。
3. 内容安全：语音和文本互动需要过滤违规内容、错误建议和敏感话题。
4. 隐私边界：AI 记忆能力需要明确可记忆范围、可删除机制和用户授权。

## 六、OKF/Knowledge Catalog 可抽取知识

该文档适合抽取为以下 OKF 条目：

- `type: document`
- `title: 和平精英 AI 明星队友小田上线前业务复盘`
- `tags: [peacekeeper-elite, ai-npc, ai-companion, strategy-model, retention]`
- `relations`:
  - references: 和平精英 AI NPC 公开资料
  - impacts: 新手留存、对局完成率、AI 互动深度
  - depends_on: AI 内容安全策略、模型调用成本评估

## 七、公开资料依据

- 和平精英夏日版本前瞻：https://gp.qq.com/gicp/news/736/18793217.html
- 新华网：腾讯游戏“三板斧”：IP“活化”、全球化和 AI 覆盖：https://www.news.cn/tech/20260529/ea67a3b2d56340e9a8fdddf9f38877df/c.html
- 和平精英接入 DeepSeek 公开报道：https://gp.qq.com/gicp/news/736/18578244.html
