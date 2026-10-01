<script setup lang="ts">
import { NbAccordion, NbAccordionItem } from '@neobrut-vue/core'
</script>

<template>
  <div class="demo-stack">
    <NbAccordion default-value="first">
      <NbAccordionItem value="first" title="Can I use this in Vue 3?">
        Yes. Install the core package and import the stylesheet once.
      </NbAccordionItem>
      <NbAccordionItem value="second" title="Does it work without SSR?">
        Yes. The components run in a client-side Vue app.
      </NbAccordionItem>
      <NbAccordionItem value="third" title="Can I use the keyboard?">
        Yes. Press Tab to focus a heading, then Enter or Space to toggle it.
      </NbAccordionItem>
    </NbAccordion>
  </div>
</template>

<style scoped>
.demo-stack { max-width: 36rem; }
</style>
