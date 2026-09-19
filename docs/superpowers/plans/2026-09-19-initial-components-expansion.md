# Initial Components Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the initial `@neobrut-vue/core` release with composable tabs and the most-used missing form controls.

**Architecture:** Keep the package dependency-free and use Vue provide/inject only for the compound tabs relationship. Prefer native inputs, radio buttons, checkbox semantics, fieldset, and legend for forms; CSS supplies the neobrutal presentation. Existing public controls remain intact except for the intentionally replaced pre-1.0 tabs API.

**Tech Stack:** Vue 3.5+, TypeScript, CSS custom properties, Vitest, Vue Test Utils, jsdom, and vitest-axe.

**Spec:** `docs/superpowers/specs/2026-09-19-neobrutal-vue-design.md`

## Global Constraints

- Package name is exactly `@neobrut-vue/core`.
- No runtime dependencies beyond the Vue peer dependency.
- Components use Vue Composition API with `<script setup lang="ts">`.
- Prefer native HTML semantics before ARIA.
- Preserve visible focus, disabled, invalid, and reduced-motion states.
- Preserve the user's uncommitted playground package-label edit and exclude it from unrelated commits.
- Run tests through `bun run test -- --run`; direct `bun test` bypasses Vitest configuration.

---

### Task 1: Record the approved initial-release contract

**Files:**
- Modify: `docs/superpowers/specs/2026-09-19-neobrutal-vue-design.md`
- Create: `docs/superpowers/plans/2026-09-19-initial-components-expansion.md`

**Interfaces:**
- Produces the source-of-truth compound tabs API and native-form scope used by later tasks.

- [ ] **Step 1: Update the design specification**

Record the four-part tabs API, native radio/switch/fieldset semantics, input-group slots, reference styling, and explicit dependency-free boundary.

- [ ] **Step 2: Self-review specification coverage**

Confirm the specification covers controlled and uncontrolled tabs, orientation keyboard behavior, disabled items, form labels/descriptions, playground states, and ARIA.

- [ ] **Step 3: Commit the contract**

```bash
git add docs/superpowers/specs/2026-09-19-neobrutal-vue-design.md docs/superpowers/plans/2026-09-19-initial-components-expansion.md
git commit -m "docs: plan initial component expansion"
```

### Task 2: Replace tabs with composable accessible primitives

**Files:**
- Create: `src/components/NbTabs/tabsContext.ts`
- Create: `src/components/NbTabs/NbTabsList.vue`
- Create: `src/components/NbTabs/NbTabsTrigger.vue`
- Create: `src/components/NbTabs/NbTabsContent.vue`
- Modify: `src/components/NbTabs/NbTabs.vue`
- Modify: `src/components/NbTabs/index.ts`
- Modify: `src/index.ts`
- Modify: `src/styles/overlays.css`
- Modify: `tests/components/navigation.test.ts`

**Interfaces:**
- `NbTabs` consumes `modelValue?: string`, `defaultValue?: string`, and `orientation?: 'horizontal' | 'vertical'`; it emits `update:modelValue`.
- `NbTabsList` renders `role="tablist"` and the current orientation.
- `NbTabsTrigger` consumes `value: string` and `disabled?: boolean`, registers itself locally, and renders a button with tab ARIA.
- `NbTabsContent` consumes `value: string` and renders the active panel with matching IDs.

- [ ] **Step 1: Write failing compound-API tests**

Mount:

```vue
<NbTabs default-value="one">
  <NbTabsList>
    <NbTabsTrigger value="one">One</NbTabsTrigger>
    <NbTabsTrigger value="two">Two</NbTabsTrigger>
  </NbTabsList>
  <NbTabsContent value="one">First</NbTabsContent>
  <NbTabsContent value="two">Second</NbTabsContent>
</NbTabs>
```

Assert that only `First` is visible, IDs connect trigger and panel, ArrowRight selects `two`, disabled triggers are skipped, and vertical ArrowDown navigation works.

- [ ] **Step 2: Verify the tests fail for the removed array API**

Run: `bun run test -- --run tests/components/navigation.test.ts`

Expected: FAIL because the compound exports and context do not exist.

- [ ] **Step 3: Implement the minimal tabs context and components**

Use a symbol-keyed Vue provide/inject context containing the current value, orientation, root ID, trigger registration, and `select(value)` callback. Scope focus queries to the current list element; never call `document.querySelector`.

- [ ] **Step 4: Style the reference-like segmented list**

Render a pale flat list with an ink border, equally sized triggers, a saturated inset active trigger, no folder-tab overlap, and independent bordered content. Add a compact vertical variant.

- [ ] **Step 5: Verify and commit tabs**

Run: `bun run test -- --run tests/components/navigation.test.ts && bun run typecheck`

```bash
git add src/components/NbTabs src/index.ts src/styles/overlays.css tests/components/navigation.test.ts
git commit -m "feat: add composable tabs"
```

### Task 3: Add the common native form primitives

**Files:**
- Create: `src/components/NbRadioGroup/NbRadioGroup.vue`
- Create: `src/components/NbRadioGroup/index.ts`
- Create: `src/components/NbSwitch/NbSwitch.vue`
- Create: `src/components/NbSwitch/index.ts`
- Create: `src/components/NbFieldset/NbFieldset.vue`
- Create: `src/components/NbFieldset/index.ts`
- Create: `src/components/NbInputGroup/NbInputGroup.vue`
- Create: `src/components/NbInputGroup/index.ts`
- Modify: `src/index.ts`
- Modify: `src/styles/fields.css`
- Modify: `tests/components/forms.test.ts`

**Interfaces:**
- `NbRadioGroup` consumes `modelValue?: string`, `name?: string`, `label?: string`, `hint?: string`, `disabled?: boolean`, and `options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>`.
- `NbSwitch` consumes boolean `modelValue`, `label`, optional `description`, and `disabled`.
- `NbFieldset` consumes optional `legend`, `description`, and `disabled`, then renders its default slot.
- `NbInputGroup` exposes `start`, `default`, and `end` slots and contains no state.

- [ ] **Step 1: Write failing native-semantics tests**

Assert that selecting a radio emits its value, radio names are shared, the switch emits a boolean from a real checkbox, fieldset/legend are native elements, and input-group slots render in order.

- [ ] **Step 2: Verify the tests fail because exports are missing**

Run: `bun run test -- --run tests/components/forms.test.ts`

Expected: FAIL because the four components are not exported.

- [ ] **Step 3: Implement native controls with stable IDs**

Reuse `useStableId`. Connect group labels and descriptions with `aria-labelledby`/`aria-describedby` only when rendered. Keep each control's native `disabled`, `checked`, and keyboard behavior.

- [ ] **Step 4: Add neobrutal form styling**

Use square radio marks, a sliding hard-edged switch, grouped-addon borders, visible focus outlines, and checked choice-card highlighting. Keep control heights aligned with existing inputs.

- [ ] **Step 5: Verify and commit forms**

Run: `bun run test -- --run tests/components/forms.test.ts && bun run typecheck`

```bash
git add src/components/NbRadioGroup src/components/NbSwitch src/components/NbFieldset src/components/NbInputGroup src/index.ts src/styles/fields.css tests/components/forms.test.ts
git commit -m "feat: add form primitives"
```

### Task 4: Expand the playground and accessibility coverage

**Files:**
- Modify: `playground/App.vue`
- Modify: `playground/style.css`
- Modify: `tests/accessibility.test.ts`
- Modify: `README.md`

**Interfaces:**
- Playground demonstrates tabs with icon-capable slot labels, a disabled trigger, required/error/disabled/file input states, radio choice cards, switch, fieldset, and an input group.
- README documents the compound tabs API and form imports.

- [ ] **Step 1: Add failing accessibility coverage**

Mount the compound tabs and new form controls in representative states, run axe, and assert no violations. Before production edits, verify failures caused by missing exports/components.

- [ ] **Step 2: Update the playground without discarding user edits**

Replace the old array tabs usage with compound components. Add a compact form showcase and keep the user's `@neobrut-vue/core` badge text.

- [ ] **Step 3: Document the public API**

Add concise examples for compound tabs, radio group, switch, fieldset, and input group. Do not add validation-library integration.

- [ ] **Step 4: Run full verification**

Run: `bun run test -- --run && bun run typecheck && bun run build`

Expected: all test files pass, type-check exits zero, and Vite emits JavaScript, declarations, and CSS.

- [ ] **Step 5: Visually verify the playground**

Open `http://127.0.0.1:5174/` and confirm desktop and narrow layouts, equal field heights, centered select chevron, keyboard tabs, focus states, and no console errors.

- [ ] **Step 6: Commit the playground and docs**

```bash
git add playground/App.vue playground/style.css tests/accessibility.test.ts README.md
git commit -m "docs: expand component playground"
```
