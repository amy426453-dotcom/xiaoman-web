# Computer Module Excel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the computer interaction match every state documented in the workbook's “电脑模块” sheet.

**Architecture:** Keep the existing single-page state model in `room.js`. Add one small completion helper so either game can become the final game without duplicating button, story-strip, and message-suffix logic.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js built-in test runner.

---

### Task 1: Lock the Excel-defined copy and completion order into tests

**Files:**
- Modify: `web/room.test.mjs`

- [ ] Add failing assertions for the new match-game message, the last-completed-game suffix, the first close narration, and the reopened completion-card copy.
- [ ] Run `node --test web/room.test.mjs` and confirm the new assertions fail for missing behavior.

### Task 2: Implement the computer state transitions

**Files:**
- Modify: `web/room.js`

- [ ] Replace the match-game completion message with the Excel copy.
- [ ] Add a shared helper that appends `留言都看完啦，可以关闭电脑了。` only to whichever game finishes last and updates the close action and story strip once.
- [ ] Make the first completed close use the drawer-transition narration, while later completed closes use the general room narration.
- [ ] Make the completion card and recheck flow use the workbook copy and button states.
- [ ] Keep the computer lit during partial exploration and recheck, and black after completed close.

### Task 3: Verify the implementation

**Files:**
- Verify: `web/room.js`
- Verify: `web/room.test.mjs`

- [ ] Run the complete Node test file and confirm zero failures.
- [ ] Run `node --check web/room.js`.
- [ ] Run `git diff --check`.
