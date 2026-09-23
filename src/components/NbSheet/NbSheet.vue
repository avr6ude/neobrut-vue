<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'

export type NbSheetSide = 'top' | 'right' | 'bottom' | 'left'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  title: string
  description?: string
  side?: NbSheetSide
}>(), {
  open: undefined,
  defaultOpen: false,
  side: 'right',
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
  <DialogRoot :open="currentOpen" @update:open="updateOpen">
    <DialogTrigger class="nb-root nb-overlay-trigger">
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="nb-root nb-sheet__overlay" />
      <DialogContent
        v-bind="description ? {} : { 'aria-describedby': undefined }"
        class="nb-root nb-sheet"
        :class="`nb-sheet--${side}`"
      >
        <header class="nb-sheet__header">
          <div>
            <DialogTitle class="nb-sheet__title">{{ title }}</DialogTitle>
            <DialogDescription v-if="description" class="nb-sheet__description">
              {{ description }}
            </DialogDescription>
          </div>
          <DialogClose class="nb-overlay-close" aria-label="Close sheet">×</DialogClose>
        </header>
        <div class="nb-sheet__body"><slot /></div>
        <footer v-if="$slots.footer" class="nb-sheet__footer"><slot name="footer" /></footer>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
