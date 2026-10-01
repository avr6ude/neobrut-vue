<script setup lang="ts">
import { StepperRoot } from 'reka-ui'

withDefaults(defineProps<{
  modelValue?: number
  defaultValue?: number
  label?: string
  orientation?: 'horizontal' | 'vertical'
  linear?: boolean
}>(), { defaultValue: 1, label: 'Progress', orientation: 'horizontal', linear: true })

const emit = defineEmits<{ 'update:modelValue': [value: number] }>()
function onUpdate(value: number | undefined) {
  if (value !== undefined) emit('update:modelValue', value)
}
</script>

<template>
  <StepperRoot
    class="nb-root nb-stepper"
    :model-value="modelValue"
    :default-value="defaultValue"
    :aria-label="label"
    :orientation="orientation"
    :linear="linear"
    @update:model-value="onUpdate"
  >
    <slot />
  </StepperRoot>
</template>

<style>
.nb-stepper { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 0.75rem; }
.nb-stepper[data-orientation='vertical'] { flex-direction: column; }
.nb-stepper__item { min-width: 0; flex: 1 1 9rem; }
.nb-stepper[data-orientation='vertical'] .nb-stepper__item { width: 100%; }
.nb-stepper__trigger { display: flex; width: 100%; min-height: 4.5rem; align-items: center; gap: 0.7rem; border: var(--nb-border-width) solid var(--nb-color-ink); border-radius: var(--nb-radius-sm); box-shadow: 4px 4px 0 var(--nb-shadow-color); background: var(--nb-color-paper); color: var(--nb-color-ink); cursor: pointer; padding: 0.65rem 0.8rem; text-align: left; }
.nb-stepper__trigger[data-state='active'] { background: var(--nb-color-primary); }
.nb-stepper__trigger[data-state='completed'] { background: var(--nb-color-secondary); }
.nb-stepper__trigger:disabled { cursor: not-allowed; opacity: 0.5; }
.nb-stepper__indicator { display: grid; width: 2.1rem; height: 2.1rem; flex: 0 0 auto; place-items: center; border: 2px solid var(--nb-color-ink); border-radius: 50%; background: var(--nb-color-accent); font-family: var(--nb-font-display); font-weight: 900; }
.nb-stepper__copy { display: grid; gap: 0.1rem; min-width: 0; }
.nb-stepper__title { font-family: var(--nb-font-display); font-weight: 900; }
.nb-stepper__description { font-size: 0.8rem; line-height: 1.25; }
@media (max-width: 520px) {
  .nb-stepper:not([data-orientation='vertical']) { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 0.5rem; }
  .nb-stepper:not([data-orientation='vertical']) .nb-stepper__item { flex: 0 0 9rem; }
}
</style>
