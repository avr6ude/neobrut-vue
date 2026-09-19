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

`NbAlert`, `NbBadge`, `NbButton`, `NbCard`, `NbCheckbox`, `NbDialog`, `NbInput`, `NbSelect`, `NbTabs`, `NbTextarea`, and `NbTooltip`.

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

Components prefer native HTML semantics. Form controls connect labels, hints, and errors with IDs and `aria-describedby`; invalid fields expose `aria-invalid`. Dialogs, tabs, and tooltips implement their relevant keyboard and ARIA patterns. Consumers should still provide meaningful labels and content.

## Local playground

```bash
bun run dev:playground
```
