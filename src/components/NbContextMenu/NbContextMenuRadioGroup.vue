<script setup lang="ts">
import { ContextMenuRadioGroup } from 'reka-ui'

defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function updateValue(value: unknown) {
  if (typeof value === 'string') emit('update:modelValue', value)
}
</script>

<template>
  <ContextMenuRadioGroup :model-value="modelValue" @update:model-value="updateValue">
    <slot />
  </ContextMenuRadioGroup>
</template>
