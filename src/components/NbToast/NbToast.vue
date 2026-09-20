<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from 'reka-ui'

type ToastTone = 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  title: string
  description?: string
  tone?: ToastTone
  duration?: number
}>(), {
  open: undefined,
  defaultOpen: false,
  tone: 'info',
  duration: 5000,
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
  <ToastProvider label="Notification" :duration="duration">
    <ToastRoot
      class="nb-root nb-toast"
      :class="`nb-toast--${tone}`"
      :open="currentOpen"
      :default-open="defaultOpen"
      type="foreground"
      role="status"
      @update:open="updateOpen"
    >
      <div class="nb-toast__content">
        <ToastTitle class="nb-toast__title">{{ title }}</ToastTitle>
        <ToastDescription v-if="description" class="nb-toast__description">
          {{ description }}
        </ToastDescription>
        <slot />
      </div>
      <ToastClose class="nb-overlay-close" aria-label="Dismiss notification">×</ToastClose>
    </ToastRoot>
    <ToastViewport class="nb-root nb-toast-viewport" />
  </ToastProvider>
</template>
