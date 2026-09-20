# @neobrut-vue/core

Opinionated Vue 3 components for colorful neo-brutalist interfaces.

## Install

```bash
bun add @neobrut-vue/core
```

Import the CSS once, then use named components:

```ts
import '@neobrut-vue/core/style.css'
import { NbButton } from '@neobrut-vue/core'
```

```vue
<NbButton variant="accent">Launch</NbButton>
```

Available components:

`NbAccordion`, `NbAccordionItem`, `NbAlert`, `NbAvatar`, `NbBadge`, `NbBreadcrumbs`, `NbButton`, `NbCard`, `NbCheckbox`, `NbCombobox`, `NbDialog`, `NbDropdownMenu`, `NbDropdownMenuItem`, `NbDropdownMenuSeparator`, `NbFieldset`, `NbInput`, `NbInputGroup`, `NbNumberInput`, `NbPagination`, `NbPopover`, `NbProgress`, `NbRadioGroup`, `NbSelect`, `NbSelectItem`, `NbSkeleton`, `NbSlider`, `NbSwitch`, `NbTabs`, `NbTabsList`, `NbTabsTrigger`, `NbTabsContent`, `NbTextarea`, `NbToast`, `NbToggleGroup`, `NbToggleGroupItem`, and `NbTooltip`.

## Tabs

Tabs use composable pieces so labels can contain icons, badges, or any other content:

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
      <NbTabsTrigger value="password">Password</NbTabsTrigger>
    </NbTabsList>
    <NbTabsContent value="account">Account settings</NbTabsContent>
    <NbTabsContent value="password">Password settings</NbTabsContent>
  </NbTabs>
</template>
```

Use `default-value` instead of `v-model` for uncontrolled tabs. Set `orientation="vertical"` for vertical keyboard and visual behavior.

## Form primitives

The form components stay native: radio groups render radio inputs, switches retain a checkbox, and fieldsets use `fieldset`/`legend`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NbFieldset, NbRadioGroup, NbSwitch } from '@neobrut-vue/core'

const plan = ref('pro')
const alerts = ref(true)
const plans = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro', description: 'For teams shipping regularly.' },
]
</script>

<template>
  <NbFieldset legend="Preferences" description="Change these whenever you like.">
    <NbRadioGroup v-model="plan" label="Plan" :options="plans" />
    <NbSwitch v-model="alerts" label="Launch alerts" />
  </NbFieldset>
</template>
```

`NbInputGroup` keeps prefixes, suffixes, or small actions attached to a native input. Give the input its normal label or accessible name:

```vue
<label for="handle">Handle</label>
<NbInputGroup>
  <template #start>@</template>
  <input id="handle">
  <template #end>.dev</template>
</NbInputGroup>
```

Searchable, numeric, range, and segmented controls use the same field contract:

```vue
<NbCombobox v-model="framework" label="Framework" name="framework" :options="frameworks" />
<NbNumberInput v-model="seats" label="Seats" name="seats" :min="1" :max="12" />
<NbSlider v-model="volume" label="Volume" name="volume" :step="5" />
<NbToggleGroup v-model="alignment" label="Alignment" name="alignment">
  <NbToggleGroupItem value="left">Left</NbToggleGroupItem>
  <NbToggleGroupItem value="center">Center</NbToggleGroupItem>
  <NbToggleGroupItem value="right">Right</NbToggleGroupItem>
</NbToggleGroup>
```

## VeeValidate

VeeValidate is optional. Bind its field model and attributes directly; `@neobrut-vue/core` does not depend on it:

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

## Optional plugin

Named imports are preferred. If global registration is useful, install the plugin:

```ts
import { createApp } from 'vue'
import { NeoBrutalVue } from '@neobrut-vue/core'
import App from './App.vue'

createApp(App).use(NeoBrutalVue).mount('#app')
```

## Theming

Override the CSS custom properties on `:root` or a wrapper:

```css
:root {
  --nb-color-primary: #ffdf3f;
  --nb-color-accent: #ff7b71;
  --nb-border-width: 4px;
  --nb-shadow-x: 8px;
  --nb-shadow-y: 8px;
}
```

## Accessibility

Components prefer native HTML semantics. Form controls connect labels, hints, and errors with IDs and `aria-describedby`; invalid fields expose `aria-invalid`. Interactive and status components implement their relevant keyboard and ARIA patterns, including accordions, dialogs, menus, pagination, progress, popovers, tabs, toasts, and tooltips. Consumers should still provide meaningful labels and content.

## Local playground

```bash
bun run dev:playground
```
