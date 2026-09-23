# @neobrut-vue/core

[![npm](https://img.shields.io/npm/v/%40neobrut-vue%2Fcore)](https://www.npmjs.com/package/@neobrut-vue/core)
[![CI](https://github.com/avr6ude/neobrut-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/avr6ude/neobrut-vue/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/%40neobrut-vue%2Fcore)](https://github.com/avr6ude/neobrut-vue/blob/main/LICENSE)

Colorful and accessible neo-brutalist components for Vue 3.

[npm](https://www.npmjs.com/package/@neobrut-vue/core) · [GitHub](https://github.com/avr6ude/neobrut-vue) · [Issues](https://github.com/avr6ude/neobrut-vue/issues)

## Requirements

- Vue 3.5 or newer
- A client-side Vue application

## Install

```bash
npm install @neobrut-vue/core
```

Import the stylesheet once in your application entry:

```ts
import { createApp } from 'vue'
import '@neobrut-vue/core/style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

Components are available as named imports:

```vue
<script setup lang="ts">
import { NbBadge, NbButton, NbCard } from '@neobrut-vue/core'
</script>

<template>
  <NbCard tone="primary" interactive>
    <template #header><NbBadge tone="accent">New</NbBadge></template>
    <h2>Make it loud.</h2>
    <template #footer><NbButton variant="accent">Launch</NbButton></template>
  </NbCard>
</template>
```

## Components

| Group | Components |
| --- | --- |
| Actions and surfaces | `NbButton`, `NbButtonGroup`, `NbToggle`, `NbCard`, `NbAlert`, `NbBadge` |
| Forms | `NbCheckbox`, `NbCombobox`, `NbFieldset`, `NbInput`, `NbInputGroup`, `NbNumberInput`, `NbRadioGroup`, `NbSelect`, `NbSelectItem`, `NbSlider`, `NbSwitch`, `NbTextarea`, `NbToggleGroup`, `NbToggleGroupItem` |
| Navigation | `NbBreadcrumbs`, `NbNavigationMenu`, `NbPagination`, `NbTabs`, `NbTabsList`, `NbTabsTrigger`, `NbTabsContent` |
| Overlays | `NbAlertDialog`, `NbCommand`, `NbContextMenu`, `NbDialog`, `NbDropdownMenu`, `NbHoverCard`, `NbPopover`, `NbSheet`, `NbToast`, `NbTooltip` |
| Data display | `NbAccordion`, `NbAccordionItem`, `NbAvatar`, `NbEmptyState`, `NbProgress`, `NbSkeleton`, `NbSpinner`, `NbTable` |
| Inline and layout | `NbLink`, `NbKbd`, `NbMarker`, `NbAspectRatio`, `NbScrollArea`, `NbSeparator` |

## Links and actions

`NbLink` forwards native anchor attributes and can render a router component through `as`. Related actions stay semantic and keyboard accessible:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbButton, NbButtonGroup, NbKbd, NbLink, NbMarker, NbToggle } from '@neobrut-vue/core'

const pinned = ref(false)
</script>

<template>
  <p>
    <NbLink href="/docs" tone="accent">Read the docs</NbLink>
    and build something <NbMarker>loud</NbMarker>.
  </p>

  <NbButtonGroup label="Document actions">
    <NbButton>Save</NbButton>
    <NbButton variant="secondary">Share</NbButton>
  </NbButtonGroup>

  <NbToggle v-model="pinned" label="Pin project">Pin</NbToggle>
  <span>Search with <NbKbd>⌘ K</NbKbd></span>
</template>
```

## Forms

Form components use `v-model`, forward native input attributes, and expose labels, hints, and errors through the relevant ARIA relationships.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  NbCheckbox,
  NbInput,
  NbSelect,
  NbSelectItem,
  NbSwitch,
  NbTextarea,
} from '@neobrut-vue/core'

const name = ref('')
const tone = ref('primary')
const note = ref('')
const alerts = ref(true)
const accepted = ref(false)
</script>

<template>
  <form>
    <NbInput v-model="name" label="Name" required placeholder="Ada Lovelace" />

    <NbSelect v-model="tone" label="Favorite tone">
      <NbSelectItem value="primary">Electric blue</NbSelectItem>
      <NbSelectItem value="accent">Bubblegum pink</NbSelectItem>
    </NbSelect>

    <NbTextarea v-model="note" label="Note" hint="Keep it short and loud." />
    <NbSwitch v-model="alerts" label="Launch alerts" description="Notify me when it ships." />
    <NbCheckbox v-model="accepted" label="I accept the chaos" />
  </form>
</template>
```

Searchable, numeric, range, and segmented controls share the same field contract:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  NbCombobox,
  NbNumberInput,
  NbSlider,
  NbToggleGroup,
  NbToggleGroupItem,
  type NbComboboxOption,
} from '@neobrut-vue/core'

const frameworks: NbComboboxOption[] = [
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
]
const framework = ref('vue')
const seats = ref(3)
const volume = ref(65)
const alignment = ref('center')
</script>

<template>
  <NbCombobox v-model="framework" label="Framework" :options="frameworks" />
  <NbNumberInput v-model="seats" label="Seats" :min="1" :max="12" />
  <NbSlider v-model="volume" label="Volume" :step="5" show-value />
  <NbToggleGroup v-model="alignment" label="Alignment">
    <NbToggleGroupItem value="left">Left</NbToggleGroupItem>
    <NbToggleGroupItem value="center">Center</NbToggleGroupItem>
    <NbToggleGroupItem value="right">Right</NbToggleGroupItem>
  </NbToggleGroup>
</template>
```

`NbInputGroup` attaches prefixes, suffixes, or small actions to a native input. Give the input its normal label or accessible name:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbInputGroup } from '@neobrut-vue/core'

const handle = ref('')
</script>

<template>
  <label for="handle">Profile handle</label>
  <NbInputGroup>
    <template #start>@</template>
    <input id="handle" v-model="handle" autocomplete="username">
    <template #end>.dev</template>
  </NbInputGroup>
</template>
```

## Navigation and disclosure

Tabs support controlled and uncontrolled state plus horizontal or vertical keyboard navigation:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger } from '@neobrut-vue/core'

const activeTab = ref('account')
</script>

<template>
  <NbTabs v-model="activeTab">
    <NbTabsList>
      <NbTabsTrigger value="account">Account</NbTabsTrigger>
      <NbTabsTrigger value="billing">Billing</NbTabsTrigger>
    </NbTabsList>
    <NbTabsContent value="account">Account settings</NbTabsContent>
    <NbTabsContent value="billing">Billing settings</NbTabsContent>
  </NbTabs>
</template>
```

Use `default-value` instead of `v-model` for uncontrolled tabs. Accordions follow the same pattern:

```vue
<script setup lang="ts">
import { NbAccordion, NbAccordionItem } from '@neobrut-vue/core'
</script>

<template>
  <NbAccordion default-value="shipping">
    <NbAccordionItem value="shipping" title="How fast is shipping?">
      Loudly fast.
    </NbAccordionItem>
    <NbAccordionItem value="returns" title="Can I return it?">
      Absolutely.
    </NbAccordionItem>
  </NbAccordion>
</template>
```

## Dialogs and menus

`NbDialog` traps focus, closes on Escape, and restores focus to its trigger:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbButton, NbDialog } from '@neobrut-vue/core'

const open = ref(false)
</script>

<template>
  <NbButton @click="open = true">Open dialog</NbButton>
  <NbDialog v-model:open="open" title="Confirm launch">
    This action is delightfully irreversible.
    <template #footer>
      <NbButton variant="ghost" @click="open = false">Cancel</NbButton>
      <NbButton variant="accent" @click="open = false">Launch</NbButton>
    </template>
  </NbDialog>
</template>
```

Dropdown menus provide styled keyboard navigation through Reka UI:

```vue
<script setup lang="ts">
import {
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbDropdownMenuSeparator,
} from '@neobrut-vue/core'
</script>

<template>
  <NbDropdownMenu label="Project actions">
    <template #trigger>Actions</template>
    <NbDropdownMenuItem>Duplicate</NbDropdownMenuItem>
    <NbDropdownMenuSeparator />
    <NbDropdownMenuItem destructive>Delete</NbDropdownMenuItem>
  </NbDropdownMenu>
</template>
```

Sheets, alert dialogs, and command menus use the same controlled or uncontrolled open-state pattern:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbAlertDialog, NbCommand, NbSheet, type NbCommandOption } from '@neobrut-vue/core'

const selected = ref('')
const commands: NbCommandOption[] = [
  { value: 'new', label: 'New component', group: 'Project', shortcut: '⌘N' },
  { value: 'publish', label: 'Publish package', group: 'Project', keywords: ['release'] },
]
</script>

<template>
  <NbSheet title="Edit component" side="right">
    <template #trigger>Edit</template>
    Sheet content
  </NbSheet>

  <NbAlertDialog
    title="Delete component?"
    description="This action cannot be undone."
    action-label="Delete"
    destructive
  >
    <template #trigger>Delete</template>
  </NbAlertDialog>

  <NbCommand v-model="selected" :options="commands" label="Project commands" />
</template>
```

`NbContextMenu` includes item, checkbox, radio, submenu, label, separator, and shortcut primitives. `NbHoverCard` preserves the semantics of its slotted trigger, while `NbNavigationMenu` accepts a small data-driven link tree.

## Data display

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbAvatar, NbPagination, NbProgress, NbTable } from '@neobrut-vue/core'

const page = ref(1)
</script>

<template>
  <NbAvatar name="Ada Lovelace" size="lg" />
  <NbProgress :value="72" label="Package build" show-value />
  <NbPagination v-model:page="page" :total="120" :items-per-page="10" />

  <NbTable caption="Release status">
    <thead><tr><th>Package</th><th>Status</th></tr></thead>
    <tbody><tr><td>Core</td><td>Ready</td></tr></tbody>
  </NbTable>
</template>
```

## VeeValidate

VeeValidate is optional. Standard model and attribute bindings work without an adapter:

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { NbInput } from '@neobrut-vue/core'

const { defineField, errors } = useForm({
  validationSchema: {
    email: (value: string) => value ? true : 'Email is required',
  },
})
const [email, emailAttrs] = defineField('email')
</script>

<template>
  <NbInput
    v-model="email"
    v-bind="emailAttrs"
    name="email"
    label="Email"
    :error="errors.email"
  />
</template>
```

## Global registration

Named imports are preferred. For templates that need every component globally, install the optional plugin:

```ts
import { createApp } from 'vue'
import { NeoBrutalVue } from '@neobrut-vue/core'
import '@neobrut-vue/core/style.css'
import App from './App.vue'

createApp(App).use(NeoBrutalVue).mount('#app')
```

## Theming

Override CSS custom properties on `:root` or any wrapper. Components inherit the nearest values.

```css
:root {
  --nb-color-paper: #fff8e7;
  --nb-color-ink: #171717;
  --nb-color-primary: #ffdf3f;
  --nb-color-secondary: #72ddc3;
  --nb-color-accent: #ff7b71;
  --nb-color-danger: #ff4d5a;
  --nb-border-width: 3px;
  --nb-shadow-x: 7px;
  --nb-shadow-y: 7px;
}
```

## Accessibility

The components prefer native elements and established ARIA patterns. Labels, hints, errors, invalid states, dialog focus management, menu navigation, tabs, accordions, progress, pagination, toasts, and tooltips are covered by automated axe tests and browser checks.

Consumers are still responsible for meaningful labels, sensible content, heading order, and sufficient contrast after overriding theme tokens.

## Development

```bash
bun install
bun run dev:playground
bun run check
```

`bun run check` runs the tests, TypeScript validation, and production build. `npm pack --dry-run` runs the same checks and prints the exact files that would be published.

## License

MIT
