<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  label: 'Loading',
  size: 'md',
})
</script>

<template>
  <span class="nb-root nb-spinner-wrap" role="status" :aria-label="label">
    <span class="nb-spinner" :class="`nb-spinner--${size}`" aria-hidden="true" />
  </span>
</template>
