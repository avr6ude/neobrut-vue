<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'reka-ui'

withDefaults(defineProps<{
  value: string
  title: string
  disabled?: boolean
}>(), {
  disabled: false,
})
</script>

<template>
  <AccordionItem class="nb-accordion__item" :value="value" :disabled="disabled">
    <AccordionHeader class="nb-accordion__header">
      <AccordionTrigger class="nb-accordion__trigger">
        <span>{{ title }}</span>
        <svg class="nb-accordion__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent class="nb-accordion__content">
      <div class="nb-accordion__body"><slot /></div>
    </AccordionContent>
  </AccordionItem>
</template>
