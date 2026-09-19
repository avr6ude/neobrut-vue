<script setup lang="ts">
import { computed } from 'vue'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  id?: string
}>(), {
  modelValue: '',
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const ids = createFieldIds('select', props.id)
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))
</script>

<template>
  <div class="nb-root nb-field">
    <label v-if="label" class="nb-field__label" :for="ids.inputId">{{ label }}</label>
    <select
      v-bind="$attrs"
      :id="ids.inputId"
      class="nb-field__control"
      :value="modelValue"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedById"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <slot />
    </select>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
