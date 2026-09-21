<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md'
}>(), {
  size: 'md',
})
</script>

<template>
  <kbd class="nb-root nb-kbd" :class="`nb-kbd--${size}`"><slot /></kbd>
</template>

<style>
.nb-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--nb-color-ink);
  border-radius: 0.25rem;
  box-shadow: 2px 2px 0 var(--nb-shadow-color);
  background: var(--nb-color-paper);
  color: var(--nb-color-ink);
  font-family: var(--nb-font-mono);
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
}

.nb-kbd--sm { min-width: 1.35rem; min-height: 1.35rem; padding: 0.2rem 0.3rem; font-size: 0.7rem; }
.nb-kbd--md { min-width: 1.7rem; min-height: 1.7rem; padding: 0.3rem 0.45rem; font-size: 0.8rem; }
</style>
