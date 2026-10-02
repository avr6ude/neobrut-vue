<script setup lang="ts">
import { NbField } from '../NbField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: string
  label?: string
  hint?: string
  error?: string
  id?: string
  name?: string
  required?: boolean
  disabled?: boolean
}>(), {
  modelValue: '',
  required: false,
  disabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <NbField :id="props.id" :label="label" :hint="hint" :error="error" v-slot="{ inputId, describedBy, invalid }">
    <span class="nb-native-select">
      <select
        v-bind="$attrs"
        :id="inputId"
        class="nb-field__control nb-native-select__control"
        :name="name"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedBy"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      ><slot /></select>
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 6 5 5 5-5" /></svg>
    </span>
  </NbField>
</template>
