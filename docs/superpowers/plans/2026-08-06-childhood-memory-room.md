# Childhood Memory Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive interactive clay-style bedroom experience with selectable boy/girl story perspective, free-order guided exploration, and AI-generated personal memory objects.

**Architecture:** Greenfield Vite + React + TypeScript app. Keep the scene renderer, story state machine, AI generation client, and local persistence as separate modules connected through typed data contracts. The first release uses deterministic local mock generation so the full experience is testable without API credentials; a server endpoint can replace that adapter without changing scene or interaction code.

**Tech Stack:** Vite, React, TypeScript, CSS, Vitest, Testing Library, localStorage; optional server endpoint `POST /api/memories/generate` for production AI integration.

---

### Task 1: Scaffold the application and test harness

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- Create: `src/test/setup.ts`, `src/App.test.tsx`

- [ ] **Step 1: Write the failing smoke test**

```tsx
it('renders the character choice before the bedroom', () => {
  render(<App />)
  expect(screen.getByRole('heading', { name: /选择你的童年伙伴/ })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '小男孩' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '小女孩' })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run `npm test -- --run src/App.test.tsx` and verify it fails because the app is not scaffolded.**
- [ ] **Step 3: Add the minimal Vite/React files and render the character-choice screen.**
- [ ] **Step 4: Run `npm test -- --run src/App.test.tsx`; expect one passing test.**
- [ ] **Step 5: Commit with `git add package.json vite.config.ts tsconfig.json index.html src && git commit -m "chore: scaffold memory room app"`.**

### Task 2: Define typed story and persistence contracts

**Files:**
- Create: `src/domain/story.ts`
- Create: `src/domain/memory.ts`
- Create: `src/domain/story.test.ts`
- Create: `src/storage/localState.ts`, `src/storage/localState.test.ts`

- [ ] **Step 1: Write tests for character-specific copy, free-order completion, and persistence round-trip.**
- [ ] **Step 2: Run `npm test -- --run src/domain/story.test.ts src/storage/localState.test.ts`; verify failures for missing contracts.**
- [ ] **Step 3: Implement `Character = 'boy' | 'girl'`, five typed `StoryNode`s, `recommendedNextNode(completed)`, `completeNode(state, id)`, `MemoryObject`, and versioned `loadState/saveState/clearState` wrappers around `localStorage`.**
- [ ] **Step 4: Re-run the focused tests; expect PASS, including both characters sharing node IDs but receiving distinct copy and selected props.**
- [ ] **Step 5: Commit with `git add src/domain src/storage && git commit -m "feat: add story and local state contracts"`.**

### Task 3: Build the clay bedroom scene and character entry flow

**Files:**
- Create: `src/components/CharacterChoice.tsx`
- Create: `src/components/BedroomScene.tsx`
- Create: `src/components/ClayObject.tsx`
- Create: `src/assets/assetManifest.ts`
- Modify: `src/App.tsx`, `src/styles.css`
- Create: `src/components/BedroomScene.test.tsx`

- [ ] **Step 1: Write tests that selecting either character enters the room, renders all five object targets, and does not rely on hover.**
- [ ] **Step 2: Run the focused test and verify failure.**
- [ ] **Step 3: Implement the fixed-stage clay visual using replaceable entries from `assetManifest.ts`; use temporary neutral placeholders until the user-provided character/background/object images arrive. Keep responsive touch targets, mute control, and subtle idle animation independent of asset dimensions.**
- [ ] **Step 4: Connect character selection to persisted state and re-run tests; expect PASS at desktop and narrow viewport dimensions.**
- [ ] **Step 5: Commit with `git add src/components src/App.tsx src/styles.css && git commit -m "feat: add clay bedroom and character selection"`.**

### Task 4: Implement the guided free-order story interactions

**Files:**
- Create: `src/components/StoryNodeModal.tsx`
- Create: `src/components/interactions/SchoolBag.tsx`
- Create: `src/components/interactions/OldComputer.tsx`
- Create: `src/components/interactions/Drawer.tsx`
- Create: `src/components/interactions/Mp3Player.tsx`
- Create: `src/components/interactions/WindowTimeline.tsx`
- Modify: `src/components/BedroomScene.tsx`, `src/App.tsx`
- Create: `src/components/interactions/storyInteractions.test.tsx`

- [ ] **Step 1: Write tests proving any uncompleted node can open, completion marks a sticker, the next recommendation changes without locking other nodes, and all five completed nodes unlock the ending.**
- [ ] **Step 2: Run the focused tests and verify failure.**
- [ ] **Step 3: Implement each interaction with pointer and touch handlers, concise character-specific lines, completion callbacks, replay actions, and recommendation cues. The MP3 interaction must present two choices, `左手右手` and `童年`, layered after the fan/cicada/TV ambience; wire it to user-provided or licensed audio asset entries only.**
- [ ] **Step 4: Re-run tests and manually verify a non-linear order such as drawer → MP3 → school bag → computer → window.**
- [ ] **Step 5: Commit with `git add src/components src/App.tsx && git commit -m "feat: add guided free-order story interactions"`.**

### Task 5: Add AI memory generation adapter and collection UI

**Files:**
- Create: `src/ai/memoryGenerator.ts`
- Create: `src/ai/mockMemoryGenerator.ts`
- Create: `src/ai/memoryGenerator.test.ts`
- Create: `src/components/MemoryComposer.tsx`
- Create: `src/components/GenerationResults.tsx`
- Create: `src/components/MemoryShelf.tsx`
- Modify: `src/domain/memory.ts`, `src/App.tsx`, `src/styles.css`

- [ ] **Step 1: Write tests for text-only, image-only, and combined input; assert two result variants and recoverable errors for invalid files/timeouts.**
- [ ] **Step 2: Run `npm test -- --run src/ai/memoryGenerator.test.ts`; verify failure.**
- [ ] **Step 3: Implement the typed adapter contract and deterministic mock returning `repaintImage` and `preservedImage`; validate one image, supported MIME types, compressed size, and 60-character text limit before request.**
- [ ] **Step 4: Implement composer, side-by-side result selection, retry/error states, delete/clear controls, and shelf placement animation.**
- [ ] **Step 5: Re-run focused tests and manually verify local generation without credentials.**
- [ ] **Step 6: Commit with `git add src/ai src/components src/domain src/App.tsx src/styles.css && git commit -m "feat: add personal memory generation and shelf"`.**

### Task 6: Add production API boundary and privacy safeguards

**Files:**
- Create: `server/api/memories.ts`
- Create: `server/api/memories.test.ts`
- Modify: `src/ai/memoryGenerator.ts`, `.env.example`, `README.md`

- [ ] **Step 1: Write endpoint tests for accepted text/image input, rejection of oversized or unsupported files, structured generation response, and redacted server errors.**
- [ ] **Step 2: Run the endpoint tests and verify failure.**
- [ ] **Step 3: Implement `POST /api/memories/generate` with server-only provider credentials, bounded request size, explicit status transitions, and no raw image/text logging.**
- [ ] **Step 4: Switch the client adapter from mock to API when `VITE_MEMORY_API_URL` is set; keep mock as the local fallback.**
- [ ] **Step 5: Run endpoint and client tests; verify no secret appears in the browser bundle or request payload metadata.**
- [ ] **Step 6: Commit with `git add server src/ai .env.example README.md && git commit -m "feat: add secure memory generation endpoint"`.**

### Task 7: Verify responsive experience and acceptance criteria

**Files:**
- Modify: `src/styles.css` and affected components only when verification finds a defect
- Create: `src/acceptance.test.tsx`

- [ ] **Step 1: Add an end-to-end-style test covering character choice, all five nodes in arbitrary order, ending unlock, generated variant selection, refresh persistence, and clear-memory behavior.**
- [ ] **Step 2: Run `npm test -- --run`; expect all unit and acceptance tests to pass.**
- [ ] **Step 3: Run `npm run build`; expect a successful production build with no TypeScript errors.**
- [ ] **Step 4: Run the dev server and inspect desktop plus mobile viewports; verify touch targets, readable copy, no overlap, muted audio state, and nonblank clay scene.**
- [ ] **Step 5: Replace manifest entries with user-provided assets when available and re-check crop, focal point, contrast, and loading fallbacks without changing story code.**
- [ ] **Step 6: Commit final verification-only fixes with `git add ... && git commit -m "test: verify memory room acceptance criteria"`.**

## Plan Self-Review

- Spec coverage: character selection, shared story with free-order nodes and guided recommendations, clay visual language, five interactions, AI dual generation, local persistence, privacy, responsive behavior, and failure recovery each have a task.
- Placeholder scan: no `TBD`, `TODO`, or unspecified implementation steps are used.
- Type consistency: `Character`, `StoryNode`, `MemoryObject`, generator result fields, and status values are introduced before their consumers.
- Scope: the production AI endpoint is isolated behind an adapter; the app remains runnable with the deterministic mock.
