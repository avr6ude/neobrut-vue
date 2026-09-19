<script setup lang="ts">
import { computed } from 'vue'
import { cx } from '../../lib/variants'

defineOptions({ inheritAttrs: false })

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
})

const classes = computed(() => cx(
  `nb-button--${props.variant}`,
  `nb-button--${props.size}`,
  props.loading && 'is-loading',
))
</script>

<template>
  <button
    v-bind="$attrs"
    class="nb-root nb-button"
    :class="classes"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="nb-button__loader" aria-hidden="true">✦</span>
    <span><slot /></span>
  </button>
</template>

<style>
.nb-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: var(--nb-border-width) solid var(--nb-color-ink);
  border-radius: var(--nb-radius-sm);
  box-shadow: var(--nb-shadow-x) var(--nb-shadow-y) 0 var(--nb-shadow-color);
  color: var(--nb-color-ink);
  cursor: pointer;
  font-family: var(--nb-font-display);
  font-weight: 800;
  line-height: 1;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.nb-button:hover:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 4px 4px 0 var(--nb-shadow-color);
}

.nb-button:active:not(:disabled) {
  transform: translate(var(--nb-shadow-x), var(--nb-shadow-y));
  box-shadow: 0 0 0 var(--nb-shadow-color);
}

.nb-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.nb-button--sm { min-height: 2rem; padding: 0.5rem 0.75rem; font-size: 0.8rem; }
.nb-button--md { min-height: 2.75rem; padding: 0.75rem 1rem; font-size: 0.95rem; }
.nb-button--lg { min-height: 3.25rem; padding: 0.9rem 1.25rem; font-size: 1.05rem; }
.nb-button--primary { background: var(--nb-color-primary); }
.nb-button--secondary { background: var(--nb-color-secondary); }
.nb-button--accent { background: var(--nb-color-accent); }
.nb-button--danger { background: var(--nb-color-danger); }
.nb-button--ghost { background: transparent; }
.nb-button__loader { animation: nb-spin 700ms linear infinite; }

@keyframes nb-spin { to { transform: rotate(360deg); } }
</style>
