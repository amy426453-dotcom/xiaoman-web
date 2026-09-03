# 水果连连看交互实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让电脑里的水果连连看稳定支持翻牌、配对、失败回盖、单次提示和完成反馈。

**Architecture:** 保留现有 16 张卡片和事件委托结构，只增加防止第三张卡片在回盖等待期间被点击的状态。提示仍只展示一对，不自动完成配对，也不修改农场逻辑。

**Tech Stack:** HTML、CSS、原生 JavaScript、Node.js `node:test`

---

### Task 1: 锁定翻牌回合

**Files:**
- Modify: `web/room.js`
- Test: `web/room.test.mjs`

- [ ] 在 `web/room.test.mjs` 增加失败测试，要求第二张不匹配卡片等待回盖时设置锁定状态，并在定时器结束后解除。
- [ ] 运行 `node --test web/room.test.mjs`，确认测试因缺少回合锁定而失败。
- [ ] 在 `regionStates` 增加布尔状态，并在连连看点击处理器开头阻止锁定期间的新点击。
- [ ] 在不匹配分支设置锁定，在 420ms 回盖完成后解除锁定。
- [ ] 再次运行测试并确认通过。

### Task 2: 固化提示与完成反馈

**Files:**
- Modify: `web/room.js`
- Modify: `web/styles/room.css`
- Test: `web/room.test.mjs`

- [ ] 增加测试，确认提示只能使用一次、不会增加配对数量，且完成八对后出现完成文案。
- [ ] 增加已完成卡片的禁用状态，让已配对卡片不可再次交互。
- [ ] 保留现有提示高亮与完成文案，不新增第二套流程。
- [ ] 运行完整测试和 JavaScript 语法检查。

