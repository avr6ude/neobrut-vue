<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui'

withDefaults(defineProps<{
  value: string
  disabled?: boolean
}>(), {
  disabled: false,
})
</script>

<template>
  <SelectItem class="nb-select__item" :value="value" :disabled="disabled" :data-value="value">
    <SelectItemText><slot /></SelectItemText>
    <SelectItemIndicator class="nb-select__indicator" aria-hidden="true">
      <svg viewBox="0 0 16 16" focusable="false"><path d="m2.5 8.5 3.5 3.5 7.5-8" /></svg>
    </SelectItemIndicator>
  </SelectItem>
</template>
