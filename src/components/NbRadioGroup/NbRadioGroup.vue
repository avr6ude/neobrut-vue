<script setup lang="ts">
import { useStableId } from '../../lib/ids'

export interface NbRadioOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string
  name?: string
  label?: string
  hint?: string
  disabled?: boolean
  options: NbRadioOption[]
}>(), {
  modelValue: '',
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const groupId = useStableId('radio-group')
const groupName = props.name ?? groupId
const hintId = `${groupId}-hint`
</script>

<template>
  <fieldset
    class="nb-root nb-radio-group"
    :disabled="disabled"
    :aria-describedby="hint ? hintId : undefined"
  >
    <legend v-if="label" class="nb-radio-group__legend">{{ label }}</legend>
    <p v-if="hint" :id="hintId" class="nb-field__hint nb-radio-group__hint">{{ hint }}</p>
    <div class="nb-radio-group__options">
      <label
        v-for="(option, index) in options"
        :key="option.value"
        class="nb-radio"
        :class="{ 'is-checked': modelValue === option.value }"
        :for="`${groupId}-${index}`"
      >
        <input
          :id="`${groupId}-${index}`"
          class="nb-radio__input"
          type="radio"
          :name="groupName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          @change="emit('update:modelValue', option.value)"
        >
        <span class="nb-radio__mark" aria-hidden="true" />
        <span class="nb-radio__content">
          <span class="nb-radio__label">{{ option.label }}</span>
          <span v-if="option.description" class="nb-radio__description">{{ option.description }}</span>
        </span>
      </label>
    </div>
  </fieldset>
</template>
