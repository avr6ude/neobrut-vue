<script setup lang="ts">
import { AspectRatio } from 'reka-ui'

withDefaults(defineProps<{
  ratio?: number
}>(), {
  ratio: 1,
})
</script>

<template>
  <AspectRatio class="nb-root nb-aspect-ratio" :ratio="ratio">
    <slot />
  </AspectRatio>
</template>
