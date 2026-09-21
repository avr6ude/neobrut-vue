<script setup lang="ts">
export type NbMarkerTone = 'primary' | 'secondary' | 'accent' | 'danger'

withDefaults(defineProps<{
  tone?: NbMarkerTone
}>(), {
  tone: 'primary',
})
</script>

<template>
  <mark class="nb-root nb-marker" :class="`nb-marker--${tone}`"><slot /></mark>
</template>

<style>
.nb-marker {
  margin-inline: 0.08em;
  padding: 0.05em 0.22em;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  color: var(--nb-color-ink);
  font-weight: 750;
}

.nb-marker--primary { background: var(--nb-color-primary); }
.nb-marker--secondary { background: var(--nb-color-secondary); }
.nb-marker--accent { background: var(--nb-color-accent); }
.nb-marker--danger { background: var(--nb-color-danger); }
</style>
