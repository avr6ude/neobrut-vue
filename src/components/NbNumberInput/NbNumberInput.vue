<script setup lang="ts">
import { computed } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: number | null
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  name?: string
  id?: string
  min?: number
  max?: number
  step?: number
}>(), {
  modelValue: null,
  disabled: false,
  readonly: false,
  required: false,
  step: 1,
})

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const ids = createFieldIds('number-input', props.id)
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))
const accessibleLabel = computed(() => props.label ?? 'value')
</script>

<template>
  <div class="nb-root nb-field">
    <label v-if="label" class="nb-field__label" :for="ids.inputId">{{ label }}</label>
    <NumberFieldRoot
      class="nb-number-input"
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :name="name"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <NumberFieldDecrement class="nb-number-input__button" :aria-label="`Decrease ${accessibleLabel}`">−</NumberFieldDecrement>
      <NumberFieldInput
        v-bind="$attrs"
        :id="ids.inputId"
        class="nb-number-input__input"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedById"
      />
      <NumberFieldIncrement class="nb-number-input__button" :aria-label="`Increase ${accessibleLabel}`">+</NumberFieldIncrement>
    </NumberFieldRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
