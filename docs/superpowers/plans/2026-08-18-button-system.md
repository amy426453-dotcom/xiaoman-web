# 暖色手写便签按钮系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在没有现有网页源码的工作区中，创建一个可独立预览的原生 HTML/CSS/JS 按钮系统，统一童年回忆网页的纸卡按钮、工具按钮、状态反馈和无障碍行为。

**Architecture:** 使用原生 HTML、CSS 和少量 JavaScript，不引入框架。颜色和尺寸集中在 CSS 自定义属性；按钮样式通过 `.memory-button` 及修饰类复用；进度图标与按钮分离，按钮只负责动作和反馈。完成独立预览后，再将同一套 CSS/HTML 接入完整房间页面。

**Tech Stack:** HTML5、CSS3 自定义属性、CSS `mask`、原生 JavaScript、浏览器开发者工具

---

### Task 1: 创建可预览的按钮演示页面

**Files:**
- Create: `web/index.html`
- Create: `web/styles/tokens.css`
- Create: `web/styles/buttons.css`
- Create: `web/app.js`

- [ ] **Step 1: 创建 HTML 页面结构**

在 `web/index.html` 中创建可访问的演示页面，包含四组真实按钮文案：

```html
<main class="demo-shell">
  <h1>按钮视觉预览</h1>

  <section aria-labelledby="primary-title">
    <h2 id="primary-title">主操作</h2>
    <button class="memory-button memory-button--primary" type="button">收好照片</button>
    <button class="memory-button memory-button--primary" type="button">把这段记忆放进去</button>
  </section>

  <section aria-labelledby="secondary-title">
    <h2 id="secondary-title">次操作</h2>
    <button class="memory-button memory-button--secondary" type="button">这次先不放</button>
    <button class="memory-button memory-button--secondary" type="button">返回房间</button>
  </section>

  <section aria-labelledby="utility-title">
    <h2 id="utility-title">工具与状态</h2>
    <button class="memory-button memory-button--utility" type="button" aria-label="关闭">×</button>
    <button class="memory-button memory-button--utility" type="button">静音</button>
    <button class="memory-button memory-button--primary" type="button" disabled>已完成</button>
  </section>

  <p id="status" role="status" aria-live="polite">等待操作</p>
</main>
```

- [ ] **Step 2: 写入设计令牌**

在 `web/styles/tokens.css` 中加入：

```css
:root {
  --ink: #5b402c;
  --paper: #f1e4c8;
  --paper-edge: #b68b55;
  --warm-yellow: #f2c66d;
  --done-gold: #d9903d;
  --muted-brown: #a79b86;
  --focus-ring: #f6d58a;
  --shadow-paper: 0 4px 12px rgb(91 64 44 / 18%);
  --radius-paper: 6px;
  --font-hand: "XiaomanHand", "KaiTi", cursive;
  --font-body: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
}

@font-face {
  font-family: "XiaomanHand";
  src: url("../../素材/字体_小满手写.woff2") format("woff2");
  font-display: swap;
}
```

- [ ] **Step 3: 实现纸卡按钮样式**

在 `web/styles/buttons.css` 中实现以下约束：

```css
.memory-button {
  min-height: 44px;
  padding: 10px 18px;
  border: 1px solid var(--paper-edge);
  border-radius: var(--radius-paper);
  color: var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow-paper);
  font: 600 1rem/1.25 var(--font-hand);
  cursor: pointer;
  transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

.memory-button:hover:not(:disabled) {
  border-color: var(--warm-yellow);
  box-shadow: 0 0 0 3px rgb(242 198 109 / 28%), var(--shadow-paper);
  transform: translateY(-1px);
}

.memory-button:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgb(91 64 44 / 16%);
}

.memory-button:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}

.memory-button:disabled {
  color: var(--muted-brown);
  border-color: rgb(167 155 134 / 60%);
  background: rgb(241 228 200 / 55%);
  cursor: not-allowed;
  box-shadow: none;
}

.memory-button--secondary {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
  text-decoration: underline;
  text-decoration-color: var(--paper-edge);
  text-underline-offset: 5px;
}

.memory-button--utility {
  min-width: 44px;
  padding: 8px 12px;
  box-shadow: 0 2px 8px rgb(91 64 44 / 12%);
}

@media (prefers-reduced-motion: reduce) {
  .memory-button { transition: none; }
  .memory-button:hover:not(:disabled),
  .memory-button:active:not(:disabled) { transform: none; }
}
```

- [ ] **Step 4: 注册字体并实现最小交互反馈**

在 `web/styles/tokens.css` 中通过相对路径加载 `../../素材/字体_小满手写.woff2`；在 `web/app.js` 中为演示按钮绑定状态文字：点击任一按钮时，将按钮文案写入 `#status`，不改变按钮本身的动作语义。

### Task 2: 验证按钮状态与可访问性

**Files:**
- Test: `web/index.html`
- Test: `web/styles/buttons.css`

- [ ] **Step 1: 启动本地静态服务器**

Run:

```bash
python3 -m http.server 4173 --directory web
```

Expected: 页面可通过 `http://127.0.0.1:4173/` 打开。

- [ ] **Step 2: 检查视觉状态**

逐项验证默认、悬停、按下、键盘聚焦、禁用状态：

- 默认按钮是米白纸卡和深棕文字；
- 悬停出现暖黄色边缘光，并只上移 1–2px；
- 按下时阴影减弱并回落；
- 禁用按钮没有悬停反馈；
- 次按钮不会与主按钮争夺视觉层级；
- 页面背景上使用的按钮不出现纯白、冷蓝或现代玻璃质感。

- [ ] **Step 3: 检查键盘和减少动态效果**

使用 Tab 聚焦所有按钮，使用 Enter 触发，使用浏览器或系统设置开启减少动态效果后重新检查。Expected：焦点始终有暖黄色外框，减少动态效果后没有位移和晃动。

- [ ] **Step 4: 检查文本可读性**

使用浏览器无障碍检查确认：关闭按钮有 `aria-label`，状态区域有 `role="status"` 和 `aria-live="polite"`，所有按钮均有可见文字或可读标签。

### Task 3: 接入互动网页的第一批动作

**Files:**
- Modify: `web/app.js`
- Modify: `web/index.html`

- [ ] **Step 1: 将已确认文案映射到按钮动作**

至少接入以下动作，不改变按钮视觉类：

```js
const actions = {
  collectPhoto: "收好照片",
  skipMemory: "这次先不放",
  returnRoom: "回房间看看",
  restartSummer: "再过一次夏天",
  putMemory: "把这段记忆放进去"
};
```

- [ ] **Step 2: 为重置动作加入确认框**

点击“再过一次夏天”时先显示确认文本：

```text
要重新回到这个夏夜吗？
房间探索和小满物件的整理结果会重新开始，你的童年记忆卡会保留。
```

确认按钮为“重新开始”，取消按钮为“先留在这里”。

- [ ] **Step 3: 运行回归检查**

Run:

```bash
git diff --check
```

Expected: 命令无输出；演示页的按钮文案、状态颜色、键盘焦点和减少动态效果行为不回退。
