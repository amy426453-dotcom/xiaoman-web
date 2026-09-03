# Fixed Module Order Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Enforce the confirmed module order and guide the player with a pulsing next hotspot.

**Architecture:** Add one pure next-stage helper in `room.js`, use it to gate hotspot entry and maintain the `is-next` class, and add CSS animation for that class. Existing module-specific completion logic remains intact.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js tests.

### Task 1: Tests

- Add failing tests covering the fixed order, locked future hotspots, and `is-next` animation.
- Run the test file and confirm the new assertions fail.

### Task 2: Implementation

- Add ordered module list and next-stage calculation.
- Update hotspot state after initialization and every module completion/close.
- Prevent opening a future module before its predecessor is complete.
- Add the pulsing hotspot CSS.

### Task 3: Verification

- Run all tests, JavaScript syntax check, and `git diff --check`.
