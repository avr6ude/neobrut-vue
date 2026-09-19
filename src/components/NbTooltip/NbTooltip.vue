<script setup lang="ts">
import { ref } from 'vue'
import { useStableId } from '../../lib/ids'

const props = defineProps<{ content: string }>()
const visible = ref(false)
const tooltipId = useStableId('tooltip')

function show() { visible.value = true }
function hide() { visible.value = false }
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') hide()
}
</script>

<template>
  <span class="nb-root nb-tooltip" @mouseenter="show" @mouseleave="hide">
    <span
      class="nb-tooltip__trigger"
      tabindex="0"
      :aria-describedby="tooltipId"
      @focus="show"
      @blur="hide"
      @keydown="onKeydown"
    >
      <slot />
    </span>
    <span :id="tooltipId" class="nb-tooltip__content" role="tooltip" :hidden="!visible">
      <slot name="content">{{ props.content }}</slot>
    </span>
  </span>
</template>
