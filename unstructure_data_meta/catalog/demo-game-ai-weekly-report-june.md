---
type: dataplex-types.global.generic
title: Demo-腾讯游戏AI能力6月运营周报
description: 本周围绕游戏 AI 能力的产品化落地，重点关注四类方向：
resource: https://docs.qq.com/doc/DWU5SU01SVENjaHVu
source_system: tencent_docs
source_file_id: 300000000$YNRSMRTCchun
domain: 游戏 AI 运营
owner: 游戏 AI 运营团队
tags:
- weekly-report
- game-ai
- ai-npc
- ai-anti-cheat
- ai-ugc
timestamp: '2026-06-26T04:55:44Z'
relations:
- target: https://docs.qq.com/doc/DWU5SU01SVENjaHVu
  type: source
- target: concept:ai-companion
  type: discusses
- target: concept:ai-anti-cheat
  type: discusses
- target: concept:ai-ugc-creation
  type: discusses
- target: concept:new-user-retention
  type: discusses
- target: concept:reinforcement-learning
  type: discusses
- target: product:peacekeeper-elite
  type: references
- target: product:honor-of-kings
  type: references
- target: product:delta-force
  type: references
- target: product:arena-breakout
  type: references
public_sources:
- https://www.tencent.com/zh-cn/articles/2202340.html
- https://www.news.cn/tech/20260529/ea67a3b2d56340e9a8fdddf9f38877df/c.html
- https://tencentarena.com/aiarena/zh/
- https://www.tencentcloud.com/dynamic/news-details/101021
catalogEntry:
  resource:
    labels:
      system: unstructured
      kind: file
  aspects:
    dataplex-types.global.generic: {}
---

# Demo-腾讯游戏AI能力6月运营周报

## Overview

本周围绕游戏 AI 能力的产品化落地，重点关注四类方向：

## Source Document

- Tencent Docs: https://docs.qq.com/doc/DWU5SU01SVENjaHVu
- Source file id: `300000000$YNRSMRTCchun`
- Owner: 游戏 AI 运营团队
- Domain: 游戏 AI 运营

## Key Sections

- 腾讯游戏 AI 能力 6 月运营周报（Demo）
- 一、周报摘要
- 二、重点进展
- 1. 《和平精英》AI NPC 与 AI 明星队友
- 2. 《王者荣耀》灵宝 AI 陪伴与赛事 AI 解说
- 3. AI 反作弊成为射击与搜打撤产品的关键安全底座
- 三、Demo 假设指标（用于演示）
- 四、待跟进问题
- 五、公开资料依据

## Related Concepts

- [Source Tencent Doc](https://docs.qq.com/doc/DWU5SU01SVENjaHVu) — `source`
- [ai-companion](/unstructure_data/concepts/ai-companion.md) — `discusses`
- [ai-anti-cheat](/unstructure_data/concepts/ai-anti-cheat.md) — `discusses`
- [ai-ugc-creation](/unstructure_data/concepts/ai-ugc-creation.md) — `discusses`
- [new-user-retention](/unstructure_data/concepts/new-user-retention.md) — `discusses`
- [reinforcement-learning](/unstructure_data/concepts/reinforcement-learning.md) — `discusses`
- [peacekeeper-elite](/unstructure_data/products/peacekeeper-elite.md) — `references`
- [honor-of-kings](/unstructure_data/products/honor-of-kings.md) — `references`
- [delta-force](/unstructure_data/products/delta-force.md) — `references`
- [arena-breakout](/unstructure_data/products/arena-breakout.md) — `references`

## Citations

- [1] https://www.tencent.com/zh-cn/articles/2202340.html
- [2] https://www.news.cn/tech/20260529/ea67a3b2d56340e9a8fdddf9f38877df/c.html
- [3] https://tencentarena.com/aiarena/zh/
- [4] https://www.tencentcloud.com/dynamic/news-details/101021

## Original Working Document

<!--
Tencent Document Title: Demo-腾讯游戏AI能力6月运营周报
Tencent Document URL: https://docs.qq.com/doc/DWU5SU01SVENjaHVu
Document Type: weekly_report
Demo Note: 演示样例文档，基于公开资料整理，并加入用于演示 OKF/Knowledge Catalog 的业务化表述。
-->

# 腾讯游戏 AI 能力 6 月运营周报（Demo）

## 一、周报摘要

本周围绕游戏 AI 能力的产品化落地，重点关注四类方向：

1. AI 伴侣与 AI NPC 从工具型问答向情感陪伴、对局辅助演进。
2. AI UGC 工具开始降低玩家创作门槛，推动玩法内容供给扩张。
3. AI 反作弊从样本检测走向基于回放数据和行为理解的智能运营。
4. 强化学习和多智能体决策能力持续服务竞技陪练、赛事解说和科研开放。

公开资料显示，SPARK 2026 腾讯游戏发布会上，多个产品披露了 AI 相关能力进展：包括《和平精英》AI 明星队友“小田”、AI NPC 玩法累计体验用户 1.1 亿、《王者荣耀》灵宝 AI 陪伴与 AI 解说、以及绿洲启元 AI 创作助手等。

## 二、重点进展

### 1. 《和平精英》AI NPC 与 AI 明星队友

《和平精英》AI NPC 玩法已经从固定应答角色，逐步演进到可实时互动、可辅助对局、具备记忆和人格表达的 AI 队友形态。公开报道显示，AI NPC 玩法累计体验用户已达 1.1 亿，并计划推出由策略大模型驱动的 AI 明星队友“小田”。

业务观察：

- AI 队友能力适合承接新手引导、陪伴式留存、轻度策略建议和对局中断托管等场景。
- 后续需要重点评估大模型调用成本、对局公平性边界、AI 回复安全性和玩家接受度。

### 2. 《王者荣耀》灵宝 AI 陪伴与赛事 AI 解说

公开资料显示，《王者荣耀》未来灵宝将实现局内外全天候沉浸式陪伴，并支持对局互动聊天；AI 技术也已融入赛事，AI 解说已经上线，并将通过腾讯开悟人工智能全球公开赛继续探索科研场景。

业务观察：

- 灵宝 AI 陪伴更适合承接玩家情感连接、赛事内容消费和新手对局解释。
- AI 解说能力可沉淀为赛事内容生产、战术复盘、主播辅助和观赛理解工具。

### 3. AI 反作弊成为射击与搜打撤产品的关键安全底座

腾讯云 ACE 在 GDC 2026 展示了 AI 驱动的游戏安全能力。公开资料显示，针对搜打撤玩法，ACE 将大规模回放分析与 AI 模型结合，用于识别透视、自瞄和协同作弊等复杂风险，并已在《三角洲行动》《暗区突围》等产品中应用。

业务观察：

- 搜打撤类产品的局内资产损失感强，作弊会直接破坏核心体验。
- AI 反作弊不仅是安全工具，也会影响玩家信任、付费意愿和长期留存。

## 三、Demo 假设指标（用于演示）

以下指标为 Demo 设计中的样例指标，不代表真实业务数据：

| 指标 | 定义 | 关联能力 | 适用文档 |
| --- | --- | --- | --- |
| AI NPC 互动深度 | 单用户在 AI NPC 场景中的有效互动轮数 | 和平精英 AI 队友 | AI NPC 复盘、用户反馈 |
| AI 陪伴留存贡献 | 使用 AI 陪伴后次日/七日留存变化 | 王者荣耀灵宝、和平精英小田 | 新手体验复盘 |
| AI 反作弊运营效率 | 单位人工审核处理的风险样本覆盖提升 | ACE 反作弊 | 安全月报 |
| UGC AI 创作转化 | 使用 AI 创作助手后完成可玩内容的比例 | 绿洲启元 AI 助手 | UGC 创作分析 |

## 四、待跟进问题

1. AI 伴侣能力是否对新手留存、回流用户激活、活动参与有可解释的正向影响？
2. AI NPC 是否会引发玩家对公平性、隐私和内容安全的担忧？
3. AI UGC 工具降低创作门槛后，内容质量审核和推荐机制是否需要同步升级？
4. AI 反作弊结果如何与人工复核、客服申诉和社区公示机制衔接？

## 五、公开资料依据

- 腾讯游戏 SPARK 2026 发布会公开信息：https://www.tencent.com/zh-cn/articles/2202340.html
- 新华网：腾讯游戏“三板斧”：IP“活化”、全球化和 AI 覆盖：https://www.news.cn/tech/20260529/ea67a3b2d56340e9a8fdddf9f38877df/c.html
- 腾讯开悟 AI Arena：https://tencentarena.com/aiarena/zh/
- 腾讯云 GDC 2026 AI 游戏方案：https://www.tencentcloud.com/dynamic/news-details/101021
