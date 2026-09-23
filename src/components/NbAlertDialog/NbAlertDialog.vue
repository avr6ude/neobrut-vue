<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  title: string
  description: string
  actionLabel?: string
  cancelLabel?: string
  destructive?: boolean
}>(), {
  open: undefined,
  defaultOpen: false,
  actionLabel: 'Continue',
  cancelLabel: 'Cancel',
  destructive: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  action: []
  cancel: []
}>()
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
  <AlertDialogRoot :open="currentOpen" @update:open="updateOpen">
    <AlertDialogTrigger class="nb-root nb-overlay-trigger">
      <slot name="trigger" />
    </AlertDialogTrigger>

    <AlertDialogPortal>
      <AlertDialogOverlay class="nb-root nb-alert-dialog__overlay" />
      <AlertDialogContent class="nb-root nb-alert-dialog">
        <AlertDialogTitle class="nb-alert-dialog__title">{{ title }}</AlertDialogTitle>
        <AlertDialogDescription class="nb-alert-dialog__description">
          {{ description }}
        </AlertDialogDescription>
        <div class="nb-alert-dialog__actions">
          <AlertDialogCancel class="nb-alert-dialog__button nb-alert-dialog__button--cancel" @click="emit('cancel')">
            {{ cancelLabel }}
          </AlertDialogCancel>
          <AlertDialogAction
            class="nb-alert-dialog__button"
            :class="{ 'nb-alert-dialog__button--destructive': destructive }"
            @click="emit('action')"
          >
            {{ actionLabel }}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
