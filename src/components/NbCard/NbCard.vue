<script setup lang="ts">
import { computed } from 'vue'
import { cx } from '../../lib/variants'

defineOptions({ inheritAttrs: false })

type CardTone = 'paper' | 'primary' | 'secondary' | 'ink'

const props = withDefaults(defineProps<{
  tone?: CardTone
  interactive?: boolean
}>(), {
  tone: 'paper',
  interactive: false,
})

const classes = computed(() => cx(
  `nb-card--${props.tone}`,
  props.interactive && 'nb-card--interactive',
))
</script>

<template>
  <article v-bind="$attrs" class="nb-root nb-card" :class="classes">
    <header v-if="$slots.header" class="nb-card__header"><slot name="header" /></header>
    <div class="nb-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="nb-card__footer"><slot name="footer" /></footer>
  </article>
</template>

<style>
.nb-card {
  border: var(--nb-border-width) solid var(--nb-color-ink);
  border-radius: var(--nb-radius);
  box-shadow: var(--nb-shadow-x) var(--nb-shadow-y) 0 var(--nb-shadow-color);
  overflow: hidden;
}

.nb-card--paper { background: var(--nb-color-paper); }
.nb-card--primary { background: var(--nb-color-primary); }
.nb-card--secondary { background: var(--nb-color-secondary); }
.nb-card--ink { background: var(--nb-color-ink); color: var(--nb-color-paper); }
.nb-card--interactive { transition: transform 120ms ease, box-shadow 120ms ease; }
.nb-card--interactive:hover { transform: translate(2px, 2px); box-shadow: 4px 4px 0 var(--nb-shadow-color); }
.nb-card__header, .nb-card__footer { padding: 0.9rem 1rem; border-bottom: var(--nb-border-width) solid currentColor; }
.nb-card__footer { border-bottom: 0; border-top: var(--nb-border-width) solid currentColor; }
.nb-card__body { padding: 1rem; }
</style>
