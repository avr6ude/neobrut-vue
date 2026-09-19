<script setup lang="ts">
import { computed } from 'vue'
import { cx } from '../../lib/variants'

type BadgeTone = 'paper' | 'primary' | 'secondary' | 'accent' | 'danger' | 'ink'
type BadgeSize = 'sm' | 'md'

const props = withDefaults(defineProps<{
  tone?: BadgeTone
  size?: BadgeSize
}>(), {
  tone: 'primary',
  size: 'md',
})

const classes = computed(() => cx(`nb-badge--${props.tone}`, `nb-badge--${props.size}`))
</script>

<template>
  <span class="nb-root nb-badge" :class="classes"><slot /></span>
</template>

<style>
.nb-badge {
  display: inline-flex;
  align-items: center;
  border: 2px solid var(--nb-color-ink);
  border-radius: 999px;
  color: var(--nb-color-ink);
  font-family: var(--nb-font-mono);
  font-weight: 700;
  line-height: 1;
}

.nb-badge--sm { padding: 0.25rem 0.5rem; font-size: 0.7rem; }
.nb-badge--md { padding: 0.35rem 0.65rem; font-size: 0.8rem; }
.nb-badge--paper { background: var(--nb-color-paper); }
.nb-badge--primary { background: var(--nb-color-primary); }
.nb-badge--secondary { background: var(--nb-color-secondary); }
.nb-badge--accent { background: var(--nb-color-accent); }
.nb-badge--danger { background: var(--nb-color-danger); }
.nb-badge--ink { background: var(--nb-color-ink); color: var(--nb-color-paper); }
</style>
