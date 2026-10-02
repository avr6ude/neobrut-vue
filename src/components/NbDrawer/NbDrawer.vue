<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  DrawerClose, DrawerContent, DrawerDescription, DrawerHandle, DrawerOverlay,
  DrawerPortal, DrawerRoot, DrawerTitle, DrawerTrigger,
} from 'reka-ui'

export type NbDrawerSide = 'bottom' | 'top' | 'left' | 'right'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  title: string
  description?: string
  side?: NbDrawerSide
}>(), {
  open: undefined,
  defaultOpen: false,
  side: 'bottom',
})

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const internalOpen = ref(props.open ?? props.defaultOpen)
const currentOpen = computed(() => props.open ?? internalOpen.value)
const swipeDirection = computed(() => ({ bottom: 'down', top: 'up', left: 'left', right: 'right' } as const)[props.side])

watch(() => props.open, value => {
  if (value !== undefined) internalOpen.value = value
})

function updateOpen(value: boolean) {
  internalOpen.value = value
  emit('update:open', value)
}
</script>

<template>
  <DrawerRoot :open="currentOpen" :swipe-direction="swipeDirection" @update:open="updateOpen">
    <DrawerTrigger class="nb-root nb-overlay-trigger"><slot name="trigger" /></DrawerTrigger>
    <DrawerPortal>
      <DrawerOverlay class="nb-root nb-drawer__overlay" />
      <DrawerContent
        v-bind="description ? {} : { 'aria-describedby': undefined }"
        class="nb-root nb-drawer"
        :class="`nb-drawer--${side}`"
      >
        <DrawerHandle class="nb-drawer__handle" aria-hidden="true" />
        <header class="nb-drawer__header">
          <div>
            <DrawerTitle class="nb-drawer__title">{{ title }}</DrawerTitle>
            <DrawerDescription v-if="description" class="nb-drawer__description">{{ description }}</DrawerDescription>
          </div>
          <DrawerClose class="nb-overlay-close" aria-label="Close drawer">×</DrawerClose>
        </header>
        <div class="nb-drawer__body"><slot /></div>
        <footer v-if="$slots.footer" class="nb-drawer__footer"><slot name="footer" /></footer>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>
</template>
