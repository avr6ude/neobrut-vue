<script setup lang="ts">
withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  label?: string
}>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <div
    class="nb-root nb-button-group"
    role="group"
    :aria-label="label"
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>

<style>
.nb-button-group {
  display: inline-flex;
  width: fit-content;
  border-radius: var(--nb-radius-sm);
  box-shadow: var(--nb-shadow-x) var(--nb-shadow-y) 0 var(--nb-shadow-color);
}

.nb-button-group[data-orientation='vertical'] { flex-direction: column; }
.nb-button-group > .nb-button { position: relative; box-shadow: none; border-radius: 0; }
.nb-button-group[data-orientation='horizontal'] > .nb-button + .nb-button { margin-left: calc(var(--nb-border-width) * -1); }
.nb-button-group[data-orientation='vertical'] > .nb-button + .nb-button { margin-top: calc(var(--nb-border-width) * -1); }
.nb-button-group[data-orientation='horizontal'] > .nb-button:first-child { border-radius: var(--nb-radius-sm) 0 0 var(--nb-radius-sm); }
.nb-button-group[data-orientation='horizontal'] > .nb-button:last-child { border-radius: 0 var(--nb-radius-sm) var(--nb-radius-sm) 0; }
.nb-button-group[data-orientation='vertical'] > .nb-button:first-child { border-radius: var(--nb-radius-sm) var(--nb-radius-sm) 0 0; }
.nb-button-group[data-orientation='vertical'] > .nb-button:last-child { border-radius: 0 0 var(--nb-radius-sm) var(--nb-radius-sm); }
.nb-button-group > .nb-button:hover:not(:disabled),
.nb-button-group > .nb-button:active:not(:disabled) { z-index: 1; transform: none; box-shadow: inset 3px 3px 0 color-mix(in srgb, var(--nb-color-ink) 18%, transparent); }
.nb-button-group > .nb-button:focus-visible { z-index: 2; }
</style>
