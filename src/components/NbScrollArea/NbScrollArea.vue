<script setup lang="ts">
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'reka-ui'

withDefaults(defineProps<{
  label?: string
  height?: string
  type?: 'auto' | 'always' | 'scroll' | 'hover'
}>(), {
  label: 'Scrollable content',
  height: '16rem',
  type: 'hover',
})
</script>

<template>
  <ScrollAreaRoot class="nb-root nb-scroll-area" :type="type" :style="{ height }">
    <ScrollAreaViewport class="nb-scroll-area__viewport" :aria-label="label">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar class="nb-scroll-area__scrollbar" orientation="vertical">
      <ScrollAreaThumb class="nb-scroll-area__thumb" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
