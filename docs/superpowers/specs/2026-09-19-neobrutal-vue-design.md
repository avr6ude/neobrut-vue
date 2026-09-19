# NeoBrutal Vue Design Specification

## Goal

Create a standalone Vue 3 component library for colorful neo-brutalist interfaces, with an opinionated visual system, accessible interaction primitives, and enough components to dogfood on `avrdu.de` later.

## Product direction

The library should feel tactile, loud, playful, and intentionally imperfect without sacrificing usability. Its visual signature is thick ink-colored borders, hard offset shadows, high-saturation surfaces, compact radii, expressive typography, and interaction states that visibly compress or shift the component.

It should not depend on daisyUI, Nuxt UI, PrimeVue, Tailwind, or another visual component library. The library owns its tokens and component CSS so the design language stays coherent.

## Architecture

- Vue 3 library built with Vite and TypeScript.
- Components use the Composition API with `<script setup lang="ts">`; props, emits, slots, and models are explicitly typed.
- Named exports are the default consumption pattern; the optional plugin is only for consumers who want global registration.
- Components forward native attributes and events to the underlying semantic element wherever possible.
- CSS custom properties provide the theme contract; component styles consume semantic tokens rather than hard-coded colors.
- Components are individually importable and also expose a plugin for global registration.
- No runtime SSR assumptions; components must work in a normal Vue + Vite application.
- A small playground app lives beside the library for visual verification and manual interaction checks.

## Theme contract

The default theme defines semantic tokens for:

- `--nb-color-ink`, `--nb-color-paper`, and `--nb-color-muted`
- `--nb-color-primary`, `--nb-color-secondary`, `--nb-color-accent`, and `--nb-color-danger`
- `--nb-border-width`, `--nb-radius`, `--nb-shadow-x`, `--nb-shadow-y`, and `--nb-shadow-color`
- `--nb-font-display`, `--nb-font-body`, and `--nb-font-mono`

Consumers can override tokens at `:root`, a wrapper element, or a component scope. The default theme must work on both light paper and dark ink surfaces.

## Initial component set

The first release includes:

- `NbButton`: `variant`, `size`, `loading`, `disabled`, and native button attributes.
- `NbCard`: `tone`, `interactive`, and default/header/footer slots.
- `NbBadge`: `tone`, `size`, and default slot.
- `NbInput`: label, hint, error, disabled, and v-model-compatible input behavior.
- `NbTextarea`: the same field states as `NbInput`.
- `NbSelect`: label, hint, error, disabled, and native select behavior.
- `NbCheckbox`: checked v-model, label, disabled, and keyboard behavior.
- `NbAlert`: `tone`, optional title, and dismiss action.
- `NbDialog`: controlled open state, title, close action, Escape handling, and focus return.
- `NbTabs`: controlled or v-model-compatible active tab state with keyboard navigation.
- `NbTooltip`: hover and focus trigger with accessible relationship to its content.

### Initial-release expansion

The initial release also includes the common controls needed to build a realistic form without another component package:

- `NbTabs`, `NbTabsList`, `NbTabsTrigger`, and `NbTabsContent` form a composable tabs API. The root supports controlled and uncontrolled values plus horizontal and vertical orientation. Triggers support arbitrary slot content, disabled state, roving focus, and automatic activation.
- `NbRadioGroup` renders a labelled native radio group from a small options array and exposes a string `v-model`.
- `NbSwitch` uses a native checkbox while presenting a switch appearance and exposing its checked state with native semantics.
- `NbFieldset` groups related controls with an optional legend and description using native `fieldset` and `legend` elements.
- `NbInputGroup` visually joins an input or textarea with slotted leading or trailing text/actions without replacing the native control.

Existing input, textarea, and select components continue to own their label, hint, and error relationships. Required, disabled, invalid, and file-input examples are documented in the playground rather than introducing a form-validation framework.

The playground follows the visual proportions of `neobrutalism.dev`: flat segmented tab lists, an inset saturated active tab, separate bordered content surfaces, compact labels, hard shadows, and high-contrast form states. It does not copy the React/Base UI implementation or add a runtime dependency.

## Interaction rules

- Every interactive component has a visible `:focus-visible` state.
- Button press shifts the surface toward its hard shadow and removes the apparent offset.
- Hover effects must not be the sole way to understand state.
- Motion is disabled or reduced under `prefers-reduced-motion: reduce`.
- Dialog and tooltip behavior must be keyboard usable and screen-reader labelled.
- Form controls expose real labels and error descriptions through generated IDs.

## Accessibility and ARIA

- Prefer native HTML semantics before adding ARIA roles or states.
- Every ARIA attribute must describe a real interaction or relationship; no decorative ARIA is added.
- Form controls connect labels, hints, and errors with `for`/`id` and `aria-describedby`; invalid fields expose `aria-invalid`.
- `NbDialog` uses `role="dialog"`, `aria-modal="true"`, an accessible name, focus containment, Escape-to-close, and focus return.
- `NbTabs` follows the tabs pattern with `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, and arrow/Home/End keyboard navigation.
- Horizontal tabs use Left/Right and vertical tabs use Up/Down; Home and End work in both orientations. Disabled triggers are skipped.
- Radio groups and fieldsets use native grouping and naming semantics. The switch retains a real checkbox input and an accessible label.
- `NbTooltip` exposes its content through `aria-describedby` and remains available to keyboard and touch users.
- Automated accessibility checks are part of playground verification for the interactive component set.

## Distribution

- Package name: `@neobrut-vue/core`.
- ESM build with generated type declarations.
- CSS is importable from the package root and included in the documented setup.
- Components use named exports; the plugin is exported as `NeoBrutalVue`.

## Verification

- Unit tests cover prop-to-class mapping, v-model behavior, disabled behavior, and keyboard interaction where applicable.
- The playground provides visual checks for all components, theme overrides, dark surfaces, responsive layout, and reduced motion.
- The package must build cleanly and type-check before it is used by another project.
