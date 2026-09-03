# Computer Farm Interaction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the temporary full-scene farm panel with a fixed 6×4 interactive field containing two watering plots, two weeding plots, and two harvest plots.

**Architecture:** Keep the existing farm inside the computer dialog. Render the supplied field as one responsive image, overlay 24 proportional cells with CSS Grid, and attach state only to the six fixed target cells. JavaScript changes each cell's visual state, plays a one-second asset animation, and automatically reveals the classmate message after all six cells finish.

**Tech Stack:** HTML, CSS Grid, CSS animations, vanilla JavaScript, Node.js built-in test runner.

---

### Task 1: Lock the farm structure and coordinates

**Files:**
- Modify: `web/room.test.mjs`
- Modify: `web/room.html`

- [ ] **Step 1: Write the failing structure test**

Add assertions that the farm uses the supplied 6×4 field, contains one overlay grid, and declares exactly six target plots with fixed coordinates:

```js
test("farm uses six fixed interactive plots on the 6x4 field", () => {
  assert.match(html, /电脑_QQ农场_土地底图_6列4行_桌面\.png/);
  assert.match(html, /data-farm-grid/);
  assert.equal((html.match(/data-farm-plot=/g) ?? []).length, 6);
  for (const coordinate of ["2-2", "4-5", "2-5", "4-2", "3-3", "3-4"]) {
    assert.match(html, new RegExp(`data-farm-coordinate="${coordinate}"`));
  }
});
```

- [ ] **Step 2: Run the test and verify failure**

Run:

```bash
/Users/carmen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test web/room.test.mjs
```

Expected: the new farm structure test fails because the current panel still uses `电脑_QQ农场_场景_桌面.png` and three global action buttons.

- [ ] **Step 3: Replace the temporary farm markup**

In `web/room.html`, replace the current `.farm-scene` content with:

```html
<div class="farm-field" data-farm-field>
  <img class="farm-field-image" src="素材/图片【移除背景】/电脑_QQ农场_土地底图_6列4行_桌面.png" alt="六列四行的小满农场">
  <div class="farm-grid" data-farm-grid>
    <button class="farm-plot" type="button" data-farm-plot="water" data-farm-coordinate="2-2" aria-label="给第二行第二列的幼苗浇水"></button>
    <button class="farm-plot" type="button" data-farm-plot="water" data-farm-coordinate="4-5" aria-label="给第四行第五列的幼苗浇水"></button>
    <button class="farm-plot" type="button" data-farm-plot="weed" data-farm-coordinate="2-5" aria-label="清除第二行第五列的杂草"></button>
    <button class="farm-plot" type="button" data-farm-plot="weed" data-farm-coordinate="4-2" aria-label="清除第四行第二列的杂草"></button>
    <button class="farm-plot" type="button" data-farm-plot="harvest" data-farm-coordinate="3-3" aria-label="收获第三行第三列的成熟作物"></button>
    <button class="farm-plot" type="button" data-farm-plot="harvest" data-farm-coordinate="3-4" aria-label="收获第三行第四列的成熟作物"></button>
  </div>
</div>
```

Each button receives its initial crop image, hover action label, and hidden animation layers in Task 2.

- [ ] **Step 4: Run the structure test**

Run the Node test command from Step 2.

Expected: the fixed-coordinate test passes; animation tests are not present yet.

### Task 2: Build responsive plot layers and controls

**Files:**
- Modify: `web/room.html`
- Modify: `web/styles/room.css`
- Modify: `web/room.test.mjs`

- [ ] **Step 1: Write the failing asset-layer test**

Add a test requiring all operation assets and the three icon-plus-text labels:

```js
test("farm plot controls use the supplied state and action assets", () => {
  for (const asset of [
    "作物_幼苗", "作物_浇水后", "作物_成熟", "杂草_默认",
    "水壶_默认", "水流_效果", "浇水_水花效果",
    "镰刀_默认", "镰刀_挥动残影", "除草_叶片效果",
    "成熟果子_默认", "果子_掉落轨迹", "收获_星光效果",
  ]) assert.match(html, new RegExp(asset));
  assert.match(html, />浇水</);
  assert.match(html, />除草</);
  assert.match(html, />收获</);
});
```

- [ ] **Step 2: Run the test and verify failure**

Run the Node test command from Task 1.

Expected: FAIL because plot contents and animation layers do not exist.

- [ ] **Step 3: Add content to each target plot**

Give water plots a `电脑_QQ农场_作物_幼苗_桌面.png` state image and water action layers; weed plots a `电脑_QQ农场_杂草_默认_桌面.png` state image and weed action layers; harvest plots a `电脑_QQ农场_作物_成熟_桌面.png` state image and harvest action layers. Each plot button contains:

```html
<img class="farm-plot-state" data-farm-state-image src="..." alt="">
<span class="farm-plot-label"><img src="..." alt="">浇水</span>
<span class="farm-effect" data-farm-effect hidden>
  <img class="farm-tool" src="..." alt="">
  <img class="farm-effect-layer" src="..." alt="">
</span>
```

- [ ] **Step 4: Add proportional field CSS**

Use the field as a responsive positioning context and place the grid within the visible soil area:

```css
.farm-field { position: relative; width: min(100%, 360px); margin: 8px auto 12px; }
.farm-field-image { display: block; width: 100%; height: auto; }
.farm-grid { position: absolute; inset: 25.5% 7% 24.5%; display: grid; grid-template-columns: repeat(6, 1fr); grid-template-rows: repeat(4, 1fr); gap: 1.5%; }
.farm-plot { position: absolute; width: calc((100% - 7.5%) / 6); height: calc((100% - 4.5%) / 4); border: 0; background: transparent; }
.farm-plot-label { position: absolute; left: 50%; bottom: 100%; display: flex; opacity: 0; transform: translate(-50%, 4px); }
.farm-plot:hover .farm-plot-label,
.farm-plot:focus-visible .farm-plot-label { opacity: 1; transform: translate(-50%, -4px); }
```

Assign each coordinate with CSS custom properties written inline by the markup (`--farm-column`, `--farm-row`) so all six plots share one positioning rule.

- [ ] **Step 5: Add one-second animation classes**

Define focused animations for `.is-watering`, `.is-weeding`, and `.is-harvesting`, plus reduced-motion overrides that use opacity changes only. Keep plot content inside the plot bounds except the hover label.

- [ ] **Step 6: Run the tests**

Run the Node test command from Task 1.

Expected: structure and asset-layer tests pass.

### Task 3: Implement state transitions and automatic completion

**Files:**
- Modify: `web/room.js`
- Modify: `web/room.test.mjs`

- [ ] **Step 1: Write the failing behavior test**

Add source-level assertions for six-plot completion, locked animation state, automatic message reveal, and computer completion:

```js
test("farm completes after all six plot actions and reveals the message automatically", () => {
  assert.match(script, /farmCompletedPlots/);
  assert.match(script, /farmPlots\.length/);
  assert.match(script, /is-animating/);
  assert.match(script, /farmMessage\.hidden = false/);
  assert.match(script, /regionStates\.farmMessageSeen = true/);
  assert.match(script, /computerIsComplete\(\)/);
});
```

- [ ] **Step 2: Run the test and verify failure**

Run the Node test command from Task 1.

Expected: FAIL because the existing farm tracks global harvest and weed buttons.

- [ ] **Step 3: Replace global farm flags with plot state**

Add:

```js
const farmPlots = document.querySelectorAll("[data-farm-plot]");
const farmCompletedPlots = new Set();

function farmIsComplete() {
  return farmCompletedPlots.size === farmPlots.length;
}
```

Update `computerIsComplete()` to require `farmIsComplete()` and `regionStates.farmMessageSeen` instead of `farmHarvested` and `farmWeeded`.

- [ ] **Step 4: Implement one handler for all plot actions**

On plot click:

1. Return if the plot is complete or has `.is-animating`.
2. Add `.is-animating` and the operation-specific animation class.
3. After about 1 second, update the state image:
   - water → `电脑_QQ农场_作物_浇水后_桌面.png`
   - weed → remove the state image
   - harvest → remove the state image
4. Mark the plot `.is-complete`, disable it, and add its coordinate to `farmCompletedPlots`.
5. Update `data-farm-status` with the remaining plot count.
6. When all six finish, reveal the message, set `regionStates.farmMessageSeen = true`, and update the computer completion button if the matching game is also complete.

- [ ] **Step 5: Remove obsolete global farm controls**

Delete the old listeners for `[data-farm-action]` and `[data-farm-message]`, along with obsolete `farmHarvested` and `farmWeeded` fields. Preserve the existing message text and computer completion flow.

- [ ] **Step 6: Run targeted verification**

Run:

```bash
/Users/carmen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test web/room.test.mjs
/Users/carmen/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check web/room.js
/Users/carmen/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/git diff --check
```

Expected: all tests pass, JavaScript syntax is valid, and the diff contains no whitespace errors.

### Task 4: Browser verification

**Files:**
- Verify: `web/room.html`
- Verify: `web/styles/room.css`
- Verify: `web/room.js`

- [ ] **Step 1: Open the local room preview**

Run the existing local server and open `http://127.0.0.1:4173/room.html`.

- [ ] **Step 2: Verify fixed placement**

Confirm the six targets appear only at `2-2`, `4-5`, `2-5`, `4-2`, `3-3`, and `3-4`, with all assets centered inside their soil plots.

- [ ] **Step 3: Verify hover and keyboard behavior**

Confirm each action label appears above its plot on hover and keyboard focus, then disappears when focus leaves.

- [ ] **Step 4: Verify the three animations**

Complete one watering, one weeding, and one harvest plot; confirm the correct tool, effect, final state, and one-action-only behavior.

- [ ] **Step 5: Verify completion**

Complete all six plots, confirm the classmate message appears automatically, then finish the matching game and confirm the computer module can be completed.
