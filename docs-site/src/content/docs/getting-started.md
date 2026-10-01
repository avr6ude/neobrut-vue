---
title: Getting started
description: Install Neobrut Vue and render your first component.
---

Neobrut Vue requires Vue 3.5 or newer and a client-side Vue application.

## Install

```sh
npm install @neobrut-vue/core
```

Import the stylesheet once in your app entry, then import components where you use them:

```ts
import { createApp } from 'vue'
import '@neobrut-vue/core/style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { NbBadge, NbButton, NbCard } from '@neobrut-vue/core'
</script>

<template>
  <NbCard tone="primary">
    <template #header><NbBadge tone="accent">New</NbBadge></template>
    <h2>Make it loud.</h2>
    <template #footer><NbButton variant="accent">Launch</NbButton></template>
  </NbCard>
</template>
```

You can also register all components with `app.use(NeoBrutalVue)`; named imports keep each usage explicit. See the [component catalog](/docs/components/) or [try them live](https://neobrut.avrdu.de/#gallery).
