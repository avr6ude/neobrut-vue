<script setup lang="ts">
import { computed } from 'vue'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: number
  length?: number
  label?: string
  hint?: string
  error?: string
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
}>(), { length: 5, disabled: false, required: false })

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
const ids = createFieldIds('rating', props.id)
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))
</script>

<template>
  <fieldset
    v-bind="$attrs"
    :id="ids.inputId"
    class="nb-root nb-field nb-rating"
    :disabled="disabled"
    :aria-label="label ? undefined : 'Rating'"
    :aria-invalid="error ? 'true' : undefined"
    :aria-describedby="describedById"
  >
    <legend v-if="label" class="nb-field__label">{{ label }}</legend>
    <div class="nb-rating__options">
      <label v-for="item in length" :key="item" class="nb-rating__option" :class="{ 'is-active': modelValue !== undefined && item <= modelValue }">
        <input
          class="nb-rating__input"
          type="radio"
          :name="name ?? ids.inputId"
          :value="item"
          :checked="modelValue === item"
          :required="required"
          :aria-label="`${item} of ${length}`"
          @change="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
        >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m12 2 2.9 6.1 6.7 1-4.8 4.7 1.1 6.7-5.9-3.1-5.9 3.1 1.1-6.7-4.8-4.7 6.7-1z" /></svg>
      </label>
    </div>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </fieldset>
</template>
