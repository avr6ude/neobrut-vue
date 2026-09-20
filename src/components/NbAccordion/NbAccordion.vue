<script setup lang="ts">
import { AccordionRoot } from 'reka-ui'

withDefaults(defineProps<{
  modelValue?: string
  defaultValue?: string
  collapsible?: boolean
  disabled?: boolean
}>(), {
  collapsible: true,
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | undefined] }>()
</script>

<template>
  <AccordionRoot
    class="nb-root nb-accordion"
    type="single"
    :model-value="modelValue"
    :default-value="defaultValue"
    :collapsible="collapsible"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event as string | undefined)"
  >
    <slot />
  </AccordionRoot>
</template>
