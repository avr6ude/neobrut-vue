<script setup lang="ts">
import { computed, type Component } from 'vue'
import { cx } from '../../lib/variants'

defineOptions({ inheritAttrs: false })

export type NbLinkTone = 'ink' | 'primary' | 'secondary' | 'accent' | 'danger'

const props = withDefaults(defineProps<{
  as?: string | Component
  tone?: NbLinkTone
}>(), {
  as: 'a',
  tone: 'primary',
})

const classes = computed(() => cx(`nb-link--${props.tone}`))
</script>

<template>
  <component
    :is="as"
    v-bind="$attrs"
    class="nb-root nb-link"
    :class="classes"
  >
    <slot />
  </component>
</template>

<style>
.nb-link {
  --nb-link-color: var(--nb-color-primary);
  color: var(--nb-color-ink);
  font-family: var(--nb-font-display);
  font-weight: 850;
  text-decoration-color: var(--nb-link-color);
  text-decoration-line: underline;
  text-decoration-thickness: 0.22em;
  text-underline-offset: 0.16em;
  transition: background-size 140ms ease, color 140ms ease;
  background-image: linear-gradient(var(--nb-link-color), var(--nb-link-color));
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 0;
}

.nb-link:hover { background-size: 100% 0.72em; }
.nb-link:focus-visible { outline: 3px solid var(--nb-color-accent); outline-offset: 3px; }
.nb-link--ink { --nb-link-color: var(--nb-color-muted); }
.nb-link--primary { --nb-link-color: var(--nb-color-primary); }
.nb-link--secondary { --nb-link-color: var(--nb-color-secondary); }
.nb-link--accent { --nb-link-color: var(--nb-color-accent); }
.nb-link--danger { --nb-link-color: var(--nb-color-danger); }
</style>
