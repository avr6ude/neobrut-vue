<script setup lang="ts">
import { computed } from 'vue'
import { PinInputInput, PinInputRoot } from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: number[]
  length?: number
  label?: string
  hint?: string
  error?: string
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  mask?: boolean
  otp?: boolean
}>(), { modelValue: () => [], length: 6, disabled: false, required: false, mask: false, otp: false })

const emit = defineEmits<{
  'update:modelValue': [value: number[]]
  complete: [value: number[]]
}>()
const ids = createFieldIds('pin-input', props.id)
const labelId = `${ids.inputId}-label`
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))
</script>

<template>
  <div class="nb-root nb-field">
    <span v-if="label" :id="labelId" class="nb-field__label">{{ label }}</span>
    <PinInputRoot
      v-bind="$attrs"
      class="nb-pin-input"
      role="group"
      :id="ids.inputId"
      :model-value="modelValue"
      :name="name"
      type="number"
      :disabled="disabled"
      :mask="mask"
      :otp="otp"
      :aria-label="label ? undefined : 'PIN input'"
      :aria-labelledby="label ? labelId : undefined"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedById"
      @update:model-value="emit('update:modelValue', $event)"
      @complete="emit('complete', $event)"
    >
      <PinInputInput v-for="index in length" :key="index" class="nb-pin-input__digit" :index="index - 1" :required="required" />
    </PinInputRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
