<script setup lang="ts">
import { ContextMenuCheckboxItem, ContextMenuItemIndicator } from 'reka-ui'

withDefaults(defineProps<{ modelValue?: boolean; disabled?: boolean }>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<template>
  <ContextMenuCheckboxItem
    class="nb-context-menu__item nb-context-menu__item--choice"
    :model-value="modelValue"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <ContextMenuItemIndicator class="nb-context-menu__indicator" aria-hidden="true">✓</ContextMenuItemIndicator>
    <slot />
  </ContextMenuCheckboxItem>
</template>
