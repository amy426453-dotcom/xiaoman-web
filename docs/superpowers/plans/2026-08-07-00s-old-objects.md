# 00 后童年老物件 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the existing clay bedroom prototype into an interactive 00 后 childhood-object museum with archive cards, mini-games, keep/leave decisions, and personal AI object admission.

**Architecture:** Preserve the existing React scene shell and replace the single generic node dialog with typed object records, archive-card states, independent mini-game components, and a local memory summary. Keep AI generation behind an adapter so text/photo input can use a deterministic local mock until a server provider is configured.

**Tech Stack:** Vite, React, TypeScript, CSS, Vitest, Testing Library, localStorage, optional server API for AI image transformation.

---

### Task 1: Replace generic story nodes with the old-object catalog

**Files:**
- Modify: `src/domain/story.ts`
- Modify: `src/domain/memory.ts`
- Create: `src/domain/objects.test.ts`

- [ ] **Step 1: Write failing tests for five scene areas, object labels, two recognition choices, and exact props from the approved design: school bag, old computer, drawer with 水晶糖纸, MP3 with 童年, and window box with class photo.**
- [ ] **Step 2: Run `pnpm test -- --run src/domain/objects.test.ts`; expect failures for missing object records and recognition types.**
- [ ] **Step 3: Implement `ObjectRecord`, `RecognitionChoice = 'remember' | 'familiar'`, `Placement = 'undecided' | 'new-home' | 'old-room'`, and catalog data with character-neutral dialogue except approved prop variants.**
- [ ] **Step 4: Run the focused tests and expect PASS.**
- [ ] **Step 5: Commit with `git add src/domain && git commit -m "feat: add 00s old object catalog"`.**

### Task 2: Build the archive-card flow

**Files:**
- Create: `src/components/ObjectArchiveCard.tsx`
- Create: `src/components/ObjectArchiveCard.test.tsx`
- Modify: `src/App.tsx`, `src/styles.css`

- [ ] **Step 1: Write tests for the two recognition choices, their distinct content, the archive mark (handwritten sticker or translucent label), and the footer actions `再玩一次`, `带去新家`, `留在这里`.**
- [ ] **Step 2: Run the focused test and verify it fails.**
- [ ] **Step 3: Implement the card as a non-fullscreen modal that leaves the room visible behind it; store recognition choice and placement separately.**
- [ ] **Step 4: Verify that selecting `我好像见过，告诉我它的故事` shows object archive, usage, disappearance context, and a related-memory card.**
- [ ] **Step 5: Commit with `git add src/components/ObjectArchiveCard.tsx src/App.tsx src/styles.css && git commit -m "feat: add object archive cards"`.**

### Task 3: Add independent object mini-games

**Files:**
- Create: `src/components/minigames/SchoolBagGame.tsx`
- Create: `src/components/minigames/PasswordBookGame.tsx`
- Create: `src/components/minigames/Match3Game.tsx`
- Create: `src/components/minigames/QQFarmGame.tsx`
- Create: `src/components/minigames/DrawerCollectionGame.tsx`
- Create: `src/components/minigames/Mp3Game.tsx`
- Create: `src/components/minigames/WindowBoxGame.tsx`
- Create: `src/components/minigames/minigames.test.tsx`

- [ ] **Step 1: Write tests for each game’s completion callback and the password-book date `1015`.**
- [ ] **Step 2: Run the focused tests and verify failures.**
- [ ] **Step 3: Implement small touch-friendly interactions: school-bag arrange, birthday password book, original 7k7k-style 连连看, QQ 农场 harvest, drawer reveal with 水晶糖纸/photo-corner clue, MP3 environment layer + authorized 童年 clip, and window-box photo flip.**
- [ ] **Step 4: Ensure the same game mechanics and dialogue are used for boy/girl; only approved object props differ.**
- [ ] **Step 5: Run focused tests and manually verify an arbitrary order such as drawer → computer → bag → MP3 → window box.**
- [ ] **Step 6: Commit with `git add src/components/minigames && git commit -m "feat: add old object mini-games"`.**

### Task 4: Add archive placement, room recap, and final pause

**Files:**
- Create: `src/components/MemoryBox.tsx`
- Create: `src/components/MemorySummary.tsx`
- Modify: `src/App.tsx`, `src/storage/localState.ts`, `src/styles.css`
- Create: `src/components/MemorySummary.test.tsx`

- [ ] **Step 1: Write tests for `new-home` and `old-room` collections, replay counts, all-five-node completion, and the fixed class-photo message.**
- [ ] **Step 2: Implement the paper-box recap and old-room review panels; keep the class photo as the guaranteed ending object.**
- [ ] **Step 3: Add the one-second black pause after the photo message before showing `纸箱里，还有一个位置。` and the personal-memory entry.**
- [ ] **Step 4: Verify refresh persistence and deletion/clear-memory controls.**
- [ ] **Step 5: Commit with `git add src/components src/storage src/App.tsx src/styles.css && git commit -m "feat: add memory box recap and ending"`.**

### Task 5: Add AI personal-object admission

**Files:**
- Create: `src/ai/memoryGenerator.ts`
- Create: `src/ai/mockMemoryGenerator.ts`
- Create: `src/components/PersonalObjectAdmission.tsx`
- Create: `src/components/PersonalObjectAdmission.test.tsx`
- Modify: `src/domain/memory.ts`, `src/storage/localState.ts`, `src/App.tsx`

- [ ] **Step 1: Write tests for text-only and image input, two generated variants, confirmation into the paper box, 60-character validation, and recoverable failure.**
- [ ] **Step 2: Implement a deterministic local mock that returns clay repaint and preserved-original variants; keep provider credentials out of client code.**
- [ ] **Step 3: Implement upload/description input, side-by-side result selection, one-sentence memory field, retry/error UI, and local persistence.**
- [ ] **Step 4: Verify the generated personal object appears separately from preset collective objects in the final summary.**
- [ ] **Step 5: Commit with `git add src/ai src/components/PersonalObjectAdmission.tsx src/domain src/storage src/App.tsx && git commit -m "feat: add personal object admission"`.**

### Task 6: Production verification and asset handoff

**Files:**
- Modify: `src/assets/assetManifest.ts`, `src/styles.css` and affected components only for verified defects
- Create: `src/acceptance.test.tsx`
- Modify: `README.md`, `.env.example`

- [ ] **Step 1: Add an acceptance test covering character entry, both archive choices, every mini-game, free-order exploration, placement recap, black pause, AI object admission, and refresh persistence.**
- [ ] **Step 2: Run `pnpm test -- --run`; expect all tests to pass.**
- [ ] **Step 3: Run `pnpm build`; expect a successful production build with no TypeScript errors.**
- [ ] **Step 4: Inspect desktop and mobile layouts; verify touch targets, modal readability, muted audio, and the final summary.**
- [ ] **Step 5: Replace placeholder background/character/object/audio entries only through `assetManifest.ts`; verify crops, focal points, contrast, and fallback states.**
- [ ] **Step 6: Commit final verification fixes with `git add ... && git commit -m "test: verify old object museum experience"`.**

## Plan Self-Review

- Spec coverage: archive cards, merged recognition choices, mini-games, exact object list, 1015 password, QQ/7k7k flow, MP3 童年 audio, ending pause, paper-box recap, AI admission, local persistence, privacy, and responsive acceptance each map to a task.
- Placeholder scan: no TBD/TODO or unspecified implementation steps remain.
- Type consistency: `ObjectRecord`, `RecognitionChoice`, `Placement`, memory generator variants, and archive state are introduced before their consumers.
