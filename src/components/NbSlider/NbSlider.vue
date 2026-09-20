<script setup lang="ts">
import { computed } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: number
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  min?: number
  max?: number
  step?: number
  showValue?: boolean
}>(), {
  modelValue: 0,
  disabled: false,
  required: false,
  min: 0,
  max: 100,
  step: 1,
  showValue: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const ids = createFieldIds('slider', props.id)
const labelId = `${ids.inputId}-label`
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))

function updateValue(values: number[] | undefined) {
  if (values?.[0] !== undefined) emit('update:modelValue', values[0])
}

function commitValue(values: number[]) {
  if (values[0] !== undefined) emit('change', values[0])
}
</script>

<template>
  <div class="nb-root nb-field">
    <div v-if="label || showValue" class="nb-slider__header">
      <span v-if="label" :id="labelId" class="nb-field__label">{{ label }}</span>
      <output v-if="showValue" class="nb-slider__value">{{ modelValue }}</output>
    </div>
    <SliderRoot
      class="nb-slider"
      :model-value="[modelValue]"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :required="required"
      :name="name"
      @update:model-value="updateValue"
      @value-commit="commitValue"
    >
      <SliderTrack class="nb-slider__track">
        <SliderRange class="nb-slider__range" />
      </SliderTrack>
      <SliderThumb
        v-bind="$attrs"
        :id="ids.inputId"
        class="nb-slider__thumb"
        :aria-labelledby="label ? labelId : undefined"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedById"
      />
    </SliderRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
