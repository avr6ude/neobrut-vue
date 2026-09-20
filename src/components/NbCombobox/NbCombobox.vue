<script setup lang="ts">
import { computed } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

export interface NbComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string
  options: NbComboboxOption[]
  label?: string
  placeholder?: string
  emptyText?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}>(), {
  modelValue: '',
  placeholder: 'Search options',
  emptyText: 'No options found',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const ids = createFieldIds('combobox', props.id)
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))

function displayLabel(value: unknown) {
  return props.options.find(option => option.value === value)?.label ?? ''
}

function updateValue(value: unknown) {
  if (typeof value === 'string') emit('update:modelValue', value)
}
</script>

<template>
  <div class="nb-root nb-field">
    <label v-if="label" class="nb-field__label" :for="ids.inputId">{{ label }}</label>
    <ComboboxRoot
      :model-value="modelValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      open-on-click
      @update:model-value="updateValue"
    >
      <ComboboxAnchor class="nb-combobox__anchor">
        <ComboboxInput
          v-bind="$attrs"
          :id="ids.inputId"
          class="nb-combobox__input"
          :display-value="displayLabel"
          :placeholder="placeholder"
          :aria-invalid="error ? 'true' : undefined"
          :aria-describedby="describedById"
        />
        <ComboboxTrigger class="nb-combobox__trigger" aria-label="Show options">
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 6 5 5 5-5" /></svg>
        </ComboboxTrigger>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent class="nb-root nb-combobox__content" position="popper" align="start" :side-offset="5">
          <ComboboxViewport class="nb-combobox__viewport">
            <ComboboxEmpty class="nb-combobox__empty">{{ emptyText }}</ComboboxEmpty>
            <ComboboxItem
              v-for="option in options"
              :key="option.value"
              class="nb-combobox__item"
              :value="option.value"
              :text-value="option.label"
              :disabled="option.disabled"
              :data-value="option.value"
            >
              <span>{{ option.label }}</span>
              <ComboboxItemIndicator class="nb-combobox__indicator" aria-hidden="true">
                <svg viewBox="0 0 16 16" focusable="false"><path d="m3 8 3 3 7-7" /></svg>
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
