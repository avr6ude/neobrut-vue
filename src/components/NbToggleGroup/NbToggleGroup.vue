<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroupRoot } from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

export type NbToggleGroupType = 'single' | 'multiple'
export type NbToggleGroupOrientation = 'horizontal' | 'vertical'

const props = withDefaults(defineProps<{
  modelValue?: string | string[]
  type?: NbToggleGroupType
  orientation?: NbToggleGroupOrientation
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}>(), {
  type: 'single',
  orientation: 'horizontal',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>()
const ids = createFieldIds('toggle-group', props.id)
const labelId = `${ids.inputId}-label`
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))

function updateValue(value: unknown) {
  if (typeof value === 'string' || (Array.isArray(value) && value.every(item => typeof item === 'string'))) {
    emit('update:modelValue', value)
  }
}
</script>

<template>
  <div class="nb-root nb-field">
    <span v-if="label" :id="labelId" class="nb-field__label">{{ label }}</span>
    <ToggleGroupRoot
      v-bind="$attrs"
      :id="ids.inputId"
      class="nb-toggle-group"
      :model-value="modelValue"
      :type="type"
      :orientation="orientation"
      :disabled="disabled"
      :required="required"
      :name="name"
      :data-orientation="orientation"
      :aria-labelledby="label ? labelId : undefined"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedById"
      @update:model-value="updateValue"
    >
      <slot />
    </ToggleGroupRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
