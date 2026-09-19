<script setup lang="ts">
import { createFieldIds } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: boolean
  label: string
  disabled?: boolean
  id?: string
}>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const ids = createFieldIds('checkbox', props.id)
</script>

<template>
  <label class="nb-root nb-checkbox" :for="ids.inputId">
    <input
      v-bind="$attrs"
      :id="ids.inputId"
      class="nb-checkbox__input"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <span class="nb-checkbox__box" aria-hidden="true">✓</span>
    <span class="nb-checkbox__label">{{ label }}</span>
  </label>
</template>
