<script setup lang="ts">
import { createFieldIds } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: boolean
  label: string
  description?: string
  disabled?: boolean
  id?: string
}>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const ids = createFieldIds('switch', props.id)
</script>

<template>
  <label class="nb-root nb-switch" :class="{ 'is-disabled': disabled }" :for="ids.inputId">
    <input
      v-bind="$attrs"
      :id="ids.inputId"
      class="nb-switch__input"
      type="checkbox"
      role="switch"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue ? 'true' : 'false'"
      :aria-describedby="description ? ids.hintId : undefined"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <span class="nb-switch__track" aria-hidden="true"><span class="nb-switch__thumb" /></span>
    <span class="nb-switch__content">
      <span class="nb-switch__label">{{ label }}</span>
      <span v-if="description" :id="ids.hintId" class="nb-switch__description">{{ description }}</span>
    </span>
  </label>
</template>
