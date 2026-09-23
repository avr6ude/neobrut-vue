<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  openDelay?: number
  closeDelay?: number
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
}>(), {
  open: undefined,
  defaultOpen: false,
  openDelay: 300,
  closeDelay: 150,
  align: 'center',
  side: 'bottom',
})

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const internalOpen = ref(props.open ?? props.defaultOpen)
const currentOpen = computed(() => props.open ?? internalOpen.value)

watch(() => props.open, (value) => {
  if (value !== undefined) internalOpen.value = value
})

function updateOpen(value: boolean) {
  internalOpen.value = value
  emit('update:open', value)
}
</script>

<template>
  <HoverCardRoot
    :open="currentOpen"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    @update:open="updateOpen"
  >
    <HoverCardTrigger as-child><slot name="trigger" /></HoverCardTrigger>
    <HoverCardPortal>
      <HoverCardContent
        class="nb-root nb-hover-card"
        :align="align"
        :side="side"
        :side-offset="8"
      >
        <slot />
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
