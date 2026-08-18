# 抽屉完成态素材 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用现有打开抽屉与独立合照一角图层构成完成态，使“查看六件物品后发现照片”的叙事成立且抽屉不发生状态跳动。

**Architecture:** 完成态始终复用现有打开态抽屉，不生成另一张抽屉主体。六件物品全部查看后移除物品图层，并显示独立的合照一角透明图层；通过定位、裁切或前板遮挡形成照片位于抽屉内部的层级。

**Tech Stack:** HTML/CSS 图层定位与裁切、PNG alpha、macOS `sips` 元数据检查、浏览器截图验收

---

### Task 1: 配置分层完成态

**Files:**
- Read: `素材/图片【移除背景】/抽屉_书桌抽屉_打开_桌面.png`
- Read: `素材/图片【移除背景】/抽屉_全班合照_一角_桌面.png`
- Reuse: `素材/图片【移除背景】/抽屉_全班合照_一角_桌面.png`

- [ ] **Step 1: 记录输入文件的技术规格**

Run:

```bash
sips -g pixelWidth -g pixelHeight -g hasAlpha '素材/图片【移除背景】/抽屉_书桌抽屉_打开_桌面.png' '素材/图片【移除背景】/抽屉_全班合照_一角_桌面.png'
```

Expected: 两个输入均为 `1024 × 1024`，并显示 `hasAlpha: yes`。

- [ ] **Step 2: 在网页中叠加现有合照一角图层**

实现约束：

```text
始终显示“抽屉_书桌抽屉_打开_桌面.png”。
完成前显示六件物品图层并隐藏合照一角。
六件物品全部查看后移除物品图层，在抽屉内部右后方显示“抽屉_全班合照_一角_桌面.png”。
合照约露出20%–25%，使用裁切、遮罩或抽屉前板遮挡隐藏照片下沿。
```

- [ ] **Step 3: 不创建独立完成态图片**

Expected: 正式实现只引用打开抽屉与合照一角两个现有文件，不引用 `抽屉_书桌抽屉_完成_桌面.png`。

### Task 2: 技术与状态连续性检查

**Files:**
- Read: `素材/图片【移除背景】/抽屉_书桌抽屉_打开_桌面.png`
- Read: `素材/图片【移除背景】/抽屉_全班合照_一角_桌面.png`

- [ ] **Step 1: 检查两个现有图层的尺寸和透明通道**

Run:

```bash
sips -g pixelWidth -g pixelHeight -g hasAlpha '素材/图片【移除背景】/抽屉_书桌抽屉_打开_桌面.png' '素材/图片【移除背景】/抽屉_全班合照_一角_桌面.png'
```

Expected: 两个文件均为 `pixelWidth: 1024`、`pixelHeight: 1024`、`hasAlpha: yes`。

- [ ] **Step 2: 在浏览器中切换完成前后状态**

Expected:

- 前后状态引用同一张打开抽屉素材，抽屉主体完全不跳动。
- 唯一新增的叙事信息是右后方合照露角。
- 照片位于抽屉内部而非漂浮在前板上。
- 透明背景边缘没有黑边、白边或不透明方块。

- [ ] **Step 3: 检查照片信息泄露**

Expected:

- 可识别为旧合照，但看不清任何人物面孔。
- 看不到学校名称、班级或日期。
- 暖橙天空、白边和蓝白校服能与纸箱完整合照建立联系。

### Task 3: 用户验收

**Files:**
- Review: 完成态网页截图

- [ ] **Step 1: 向用户展示完成态网页截图**

Expected: 用户确认抽屉状态连续、照片位置自然、信息量不过度。

- [ ] **Step 2: 若用户要求调整，只修改照片图层配置**

允许调整：照片位置、露出比例、透视、遮挡和接触阴影。

禁止调整：抽屉主体素材、画布、透明背景和完整合照内容。

- [ ] **Step 3: 用户明确通过后将此图层配置确定为正式完成态**

Expected: 不复制、不覆盖、不删除任何图片文件；现有整张 `抽屉_书桌抽屉_完成_桌面.png` 不进入网页资源引用。

- [ ] **Step 4: 再次切换完成前后状态**

Expected: 抽屉主体无位移，照片仅在完成后出现，六件物品仅在完成前出现。
