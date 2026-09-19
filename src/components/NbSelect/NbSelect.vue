<script setup lang="ts">
import { computed } from 'vue'
import {
  SelectContent,
  SelectIcon,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  error?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
}>(), {
  modelValue: '',
  placeholder: 'Select an option',
  disabled: false,
  required: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const ids = createFieldIds('select', props.id)
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))

function updateValue(value: unknown) {
  if (typeof value === 'string') emit('update:modelValue', value)
}
</script>

<template>
  <div class="nb-root nb-field">
    <label v-if="label" class="nb-field__label" :for="ids.inputId">{{ label }}</label>
    <SelectRoot
      :model-value="modelValue"
      :disabled="disabled"
      :required="required"
      :name="name"
      @update:model-value="updateValue"
    >
      <SelectTrigger
        v-bind="$attrs"
        :id="ids.inputId"
        class="nb-select__trigger"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedById"
      >
        <SelectValue :placeholder="placeholder" />
        <SelectIcon class="nb-select__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" focusable="false">
            <path d="m3 6 5 5 5-5" />
          </svg>
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent class="nb-root nb-select__content" position="popper" :side-offset="5">
          <SelectScrollUpButton class="nb-select__scroll-button" aria-label="Scroll up">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 10 5-5 5 5" /></svg>
          </SelectScrollUpButton>
          <SelectViewport class="nb-select__viewport">
            <slot />
          </SelectViewport>
          <SelectScrollDownButton class="nb-select__scroll-button" aria-label="Scroll down">
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 6 5 5 5-5" /></svg>
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
