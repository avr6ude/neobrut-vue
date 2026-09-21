<script setup lang="ts">
import { computed } from 'vue'
import { Toggle } from 'reka-ui'
import { cx } from '../../lib/variants'

defineOptions({ inheritAttrs: false })

export type NbToggleTone = 'primary' | 'secondary' | 'accent' | 'danger'
export type NbToggleSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  modelValue?: boolean
  defaultValue?: boolean
  disabled?: boolean
  label?: string
  tone?: NbToggleTone
  size?: NbToggleSize
}>(), {
  disabled: false,
  tone: 'primary',
  size: 'md',
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()
const classes = computed(() => cx(`nb-toggle--${props.tone}`, `nb-toggle--${props.size}`))
</script>

<template>
  <Toggle
    v-bind="$attrs"
    class="nb-root nb-toggle"
    :class="classes"
    :model-value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :aria-label="label"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot />
  </Toggle>
</template>

<style>
.nb-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: var(--nb-border-width) solid var(--nb-color-ink);
  border-radius: var(--nb-radius-sm);
  box-shadow: 4px 4px 0 var(--nb-shadow-color);
  color: var(--nb-color-ink);
  cursor: pointer;
  font-family: var(--nb-font-display);
  font-weight: 800;
  line-height: 1;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.nb-toggle:hover:not(:disabled) { transform: translate(1px, 1px); box-shadow: 3px 3px 0 var(--nb-shadow-color); }
.nb-toggle[data-state='on'] { transform: translate(4px, 4px); box-shadow: none; }
.nb-toggle:disabled { cursor: not-allowed; opacity: 0.55; }
.nb-toggle--sm { min-height: 2rem; padding: 0.45rem 0.65rem; font-size: 0.8rem; }
.nb-toggle--md { min-height: 2.75rem; padding: 0.65rem 0.9rem; font-size: 0.95rem; }
.nb-toggle--lg { min-height: 3.25rem; padding: 0.8rem 1.1rem; font-size: 1.05rem; }
.nb-toggle--primary { background: var(--nb-color-primary); }
.nb-toggle--secondary { background: var(--nb-color-secondary); }
.nb-toggle--accent { background: var(--nb-color-accent); }
.nb-toggle--danger { background: var(--nb-color-danger); }
</style>
