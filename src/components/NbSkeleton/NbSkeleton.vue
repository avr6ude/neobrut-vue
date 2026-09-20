<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  width?: string
  height?: string
  rounded?: boolean
}>(), {
  width: '100%',
  height: '1rem',
  rounded: false,
})

const dimensions = computed(() => ({ width: props.width, height: props.height }))
</script>

<template>
  <div
    class="nb-root nb-skeleton"
    :class="{ 'nb-skeleton--rounded': rounded }"
    :style="dimensions"
    aria-hidden="true"
  />
</template>
