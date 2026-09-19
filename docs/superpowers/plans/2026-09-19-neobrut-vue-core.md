# @neobrut-vue/core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first publishable Vue 3 component library for colorful neo-brutalist interfaces.

**Architecture:** A Vite-built Vue 3 + TypeScript package with colocated single-file components, semantic CSS custom-property tokens, named exports, and an optional plugin. A small playground app and Vitest suite provide visual and behavioral verification without requiring SSR.

**Tech Stack:** Vue 3.5+, TypeScript, Vite, Vitest, Vue Test Utils, jsdom, `vue-tsc`, and `vite-plugin-dts`.

**Spec:** `docs/superpowers/specs/2026-09-19-neobrutal-vue-design.md`

## Global Constraints

- Package name is exactly `@neobrut-vue/core`.
- Components use Vue Composition API with `<script setup lang="ts">`.
- The package has no runtime SSR dependency.
- Do not add Tailwind, daisyUI, Nuxt UI, PrimeVue, or another visual component library.
- Prefer native HTML semantics before ARIA.
- Every interactive component needs a visible `:focus-visible` state and reduced-motion behavior.
- Public components use the `Nb` prefix.
- Build output must include ESM JavaScript, generated `.d.ts` files, and importable CSS.

---

### Task 1: Scaffold the package and test harness

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.build.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `src/index.ts`
- Create: `src/plugin.ts`
- Create: `tests/smoke.test.ts`
- Create: `.gitignore`

**Interfaces:**
- Produces package scripts `build`, `typecheck`, `test`, and `test:watch`.
- Produces `src/index.ts` as the public entry point.
- Produces `NeoBrutalVue` as the optional Vue plugin.

- [ ] **Step 1: Write the failing smoke test**

```ts
import { describe, expect, it } from 'vitest'
import { NeoBrutalVue } from '../src'

describe('package entry point', () => {
  it('exports the plugin', () => {
    expect(NeoBrutalVue).toBeDefined()
  })
})
```

- [ ] **Step 2: Run the test to verify the scaffold is missing**

Run: `npm test -- --run tests/smoke.test.ts`

Expected: FAIL because the package files and test configuration do not exist.

- [ ] **Step 3: Add the minimal package configuration and exports**

Configure `@vitejs/plugin-vue`, library mode with entry `src/index.ts`, `vite-plugin-dts`, Vitest with the jsdom environment, and Vue as a peer dependency. Export a plugin that registers named components passed through a local registry.

- [ ] **Step 4: Run the smoke test and type-check**

Run: `npm test -- --run tests/smoke.test.ts && npm run typecheck`

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: Commit the scaffold**

```bash
git add package.json tsconfig.json tsconfig.build.json vite.config.ts vitest.config.ts src tests .gitignore
git commit -m "chore: scaffold neobrut vue package"
```

### Task 2: Add the theme tokens and shared component utilities

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/base.css`
- Create: `src/styles/index.css`
- Create: `src/lib/ids.ts`
- Create: `src/lib/variants.ts`
- Create: `tests/styles.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Produces CSS tokens such as `--nb-color-primary`, `--nb-border-width`, and `--nb-shadow-x`.
- Produces `useStableId(prefix: string): string` for accessible form relationships.
- Produces `cx(...values: Array<string | false | null | undefined>): string` for deterministic class composition.

- [ ] **Step 1: Write tests for token loading and utilities**

```ts
import { describe, expect, it } from 'vitest'
import { cx } from '../src/lib/variants'

describe('shared utilities', () => {
  it('joins only active class names', () => {
    expect(cx('nb-button', false, undefined, 'is-primary')).toBe('nb-button is-primary')
  })
})
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- --run tests/styles.test.ts`

Expected: FAIL because the utility does not exist.

- [ ] **Step 3: Implement tokens and utilities**

Define a paper/ink base palette, saturated primary/secondary/accent/danger colors, 3px borders, hard shadows, compact radius, typography hooks, and a reduced-motion rule. Import `src/styles/index.css` from the package entry point.

- [ ] **Step 4: Run tests and type-check**

Run: `npm test -- --run tests/styles.test.ts && npm run typecheck`

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: Commit the theme foundation**

```bash
git add src/styles src/lib tests/styles.test.ts src/index.ts
git commit -m "feat: add neobrutal theme tokens"
```

### Task 3: Build foundational visual components

**Files:**
- Create: `src/components/NbButton/NbButton.vue`
- Create: `src/components/NbButton/index.ts`
- Create: `src/components/NbCard/NbCard.vue`
- Create: `src/components/NbCard/index.ts`
- Create: `src/components/NbBadge/NbBadge.vue`
- Create: `src/components/NbBadge/index.ts`
- Create: `tests/components/NbButton.test.ts`
- Create: `tests/components/NbCard.test.ts`
- Create: `tests/components/NbBadge.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- `NbButton` accepts `variant: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost'`, `size: 'sm' | 'md' | 'lg'`, `loading`, and native button attributes.
- `NbCard` accepts `tone: 'paper' | 'primary' | 'secondary' | 'ink'` and `interactive`.
- `NbBadge` accepts the same semantic tones and `size: 'sm' | 'md'`.

- [ ] **Step 1: Write failing component tests**

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbButton } from '../../src'

describe('NbButton', () => {
  it('renders its label and variant class', () => {
    const wrapper = mount(NbButton, { props: { variant: 'accent' }, slots: { default: 'Launch' } })
    expect(wrapper.text()).toBe('Launch')
    expect(wrapper.classes()).toContain('nb-button--accent')
  })

  it('sets aria-busy while loading and disables interaction', () => {
    const wrapper = mount(NbButton, { props: { loading: true }, slots: { default: 'Save' } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `npm test -- --run tests/components/NbButton.test.ts tests/components/NbCard.test.ts tests/components/NbBadge.test.ts`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the components with semantic elements**

Use `<button>` for `NbButton`, `<article>` or `<section>` for `NbCard` depending on the `interactive` mode, and `<span>` for `NbBadge`. Forward `$attrs`, expose slots, and implement hard-shadow hover/pressed states with CSS only.

- [ ] **Step 4: Run focused tests and type-check**

Run: `npm test -- --run tests/components/NbButton.test.ts tests/components/NbCard.test.ts tests/components/NbBadge.test.ts && npm run typecheck`

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: Commit the foundational components**

```bash
git add src/components src/index.ts tests/components/NbButton.test.ts tests/components/NbCard.test.ts tests/components/NbBadge.test.ts
git commit -m "feat: add foundational neobrut components"
```

### Task 4: Build accessible form components

**Files:**
- Create: `src/components/NbInput/NbInput.vue`
- Create: `src/components/NbInput/index.ts`
- Create: `src/components/NbTextarea/NbTextarea.vue`
- Create: `src/components/NbTextarea/index.ts`
- Create: `src/components/NbSelect/NbSelect.vue`
- Create: `src/components/NbSelect/index.ts`
- Create: `src/components/NbCheckbox/NbCheckbox.vue`
- Create: `src/components/NbCheckbox/index.ts`
- Create: `src/components/formField.ts`
- Create: `tests/components/forms.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- Text fields use `modelValue`/`update:modelValue` and accept `label`, `hint`, `error`, and `disabled`.
- `NbSelect` accepts native option slots and native select attributes.
- `NbCheckbox` uses a boolean `modelValue` and a visible label.

- [ ] **Step 1: Write failing accessibility and model tests**

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbInput, NbCheckbox } from '../../src'

describe('form fields', () => {
  it('connects input label and error description', () => {
    const wrapper = mount(NbInput, { props: { label: 'Email', error: 'Required' } })
    const input = wrapper.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toContain('error')
  })

  it('emits model updates for a checkbox', async () => {
    const wrapper = mount(NbCheckbox, { props: { modelValue: false, label: 'Agree' } })
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })
})
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `npm test -- --run tests/components/forms.test.ts`

Expected: FAIL because form components do not exist.

- [ ] **Step 3: Implement shared field IDs and native form semantics**

Generate stable IDs for label, hint, and error elements. Use `aria-describedby` only for rendered descriptions, set `aria-invalid` only when an error exists, and preserve native input/select/textarea behavior.

- [ ] **Step 4: Run tests and type-check**

Run: `npm test -- --run tests/components/forms.test.ts && npm run typecheck`

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: Commit the form components**

```bash
git add src/components src/index.ts tests/components/forms.test.ts
git commit -m "feat: add accessible form components"
```

### Task 5: Build overlay and navigation primitives

**Files:**
- Create: `src/components/NbAlert/NbAlert.vue`
- Create: `src/components/NbAlert/index.ts`
- Create: `src/components/NbDialog/NbDialog.vue`
- Create: `src/components/NbDialog/index.ts`
- Create: `src/components/NbTabs/NbTabs.vue`
- Create: `src/components/NbTabs/index.ts`
- Create: `src/components/NbTooltip/NbTooltip.vue`
- Create: `src/components/NbTooltip/index.ts`
- Create: `tests/components/overlays.test.ts`
- Create: `tests/components/navigation.test.ts`
- Modify: `src/index.ts`

**Interfaces:**
- `NbAlert` accepts `tone`, optional `title`, and a dismiss event.
- `NbDialog` accepts `open`/`update:open`, `title`, and slots for content/footer.
- `NbTabs` accepts `modelValue`/`update:modelValue` and tab configuration slots.
- `NbTooltip` accepts text content and a trigger slot.

- [ ] **Step 1: Write failing ARIA and keyboard tests**

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbDialog, NbTabs } from '../../src'

describe('overlay and navigation primitives', () => {
  it('renders a labelled modal dialog', () => {
    const wrapper = mount(NbDialog, { props: { open: true, title: 'Confirm' } })
    expect(wrapper.get('[role="dialog"]').attributes('aria-modal')).toBe('true')
    expect(wrapper.get('[role="dialog"]').attributes('aria-labelledby')).toBeTruthy()
  })

  it('moves tabs with ArrowRight', async () => {
    const wrapper = mount(NbTabs, {
      props: { modelValue: 'one' },
      slots: { default: '<button role="tab" data-value="one">One</button><button role="tab" data-value="two">Two</button>' },
    })
    await wrapper.get('[role="tab"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run: `npm test -- --run tests/components/overlays.test.ts tests/components/navigation.test.ts`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement the primitives with the ARIA design patterns**

Use native `dialog` behavior where practical, otherwise implement `role="dialog"` with focus containment, Escape-to-close, and focus return. Implement `tablist`/`tab`/`tabpanel` relationships and Arrow/Home/End navigation. Connect tooltip content with `aria-describedby` and support focus and touch-triggered visibility.

- [ ] **Step 4: Run focused tests and type-check**

Run: `npm test -- --run tests/components/overlays.test.ts tests/components/navigation.test.ts && npm run typecheck`

Expected: PASS with no TypeScript errors.

- [ ] **Step 5: Commit the interactive primitives**

```bash
git add src/components src/index.ts tests/components/overlays.test.ts tests/components/navigation.test.ts
git commit -m "feat: add accessible interactive primitives"
```

### Task 6: Add playground, accessibility checks, documentation, and release verification

**Files:**
- Create: `playground/index.html`
- Create: `playground/main.ts`
- Create: `playground/App.vue`
- Create: `playground/style.css`
- Create: `README.md`
- Create: `tests/accessibility.test.ts`
- Modify: `package.json`
- Modify: `vite.config.ts`

**Interfaces:**
- Playground renders every component, light/dark surfaces, theme overrides, focus states, reduced motion, and responsive layouts.
- README documents package installation, CSS import, named imports, plugin use, token overrides, and accessibility expectations.

- [ ] **Step 1: Add the accessibility test harness**

Install `vitest-axe` and add a test that mounts representative button, form, dialog, tabs, and tooltip states, then asserts that the axe result has no violations.

- [ ] **Step 2: Run the accessibility test and verify the expected initial failures**

Run: `npm test -- --run tests/accessibility.test.ts`

Expected: FAIL only for any actual missing labels, roles, or relationships discovered by axe; fix those before proceeding.

- [ ] **Step 3: Build the playground and documentation**

Show the component variants and a token override example. Document:

```ts
import '@neobrut-vue/core/style.css'
import { NbButton } from '@neobrut-vue/core'
```

Document the plugin only as an optional alternative:

```ts
import { createApp } from 'vue'
import { NeoBrutalVue } from '@neobrut-vue/core'
import App from './App.vue'

createApp(App).use(NeoBrutalVue).mount('#app')
```

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test -- --run && npm run typecheck && npm run build`

Expected: all tests pass, type declarations are emitted, CSS is present in the package output, and Vite completes the library build.

- [ ] **Step 5: Review the package contents and commit the first release candidate**

Run: `npm pack --dry-run`

Expected: the tarball contains the ESM entry, declarations, CSS, README, and package metadata without playground source files.

```bash
git add playground README.md tests/accessibility.test.ts package.json vite.config.ts
git commit -m "feat: release neobrut-vue core candidate"
```
