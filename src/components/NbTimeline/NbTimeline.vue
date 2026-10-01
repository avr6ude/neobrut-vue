<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <ol class="nb-root nb-timeline" :aria-label="label"><slot /></ol>
</template>

<style>
.nb-timeline { display: grid; gap: 0; margin: 0; padding: 0; list-style: none; }
.nb-timeline__item { position: relative; margin: 0 0 0 1rem; border-left: 3px solid var(--nb-color-ink); padding: 0 0 1.5rem 1.5rem; }
.nb-timeline__item:last-child { border-left-color: transparent; padding-bottom: 0; }
.nb-timeline__item::before { position: absolute; top: 0.15rem; left: -0.65rem; width: 1.1rem; height: 1.1rem; border: 2px solid var(--nb-color-ink); border-radius: 50%; background: var(--nb-color-accent); content: ''; }
.nb-timeline__item:nth-child(3n+2)::before { background: var(--nb-color-secondary); }
.nb-timeline__item:nth-child(3n)::before { background: var(--nb-color-primary); }
.nb-timeline__card { border: 2px solid var(--nb-color-ink); border-radius: var(--nb-radius-sm); box-shadow: 3px 3px 0 var(--nb-shadow-color); background: var(--nb-color-paper); padding: 0.75rem 1rem; }
.nb-timeline__heading { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.25rem 1rem; }
.nb-timeline__heading strong { font-family: var(--nb-font-display); font-weight: 900; }
.nb-timeline__heading time { font-size: 0.8rem; font-weight: 700; }
.nb-timeline__body { margin-top: 0.35rem; }
</style>
