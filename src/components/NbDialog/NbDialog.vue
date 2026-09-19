<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useStableId } from '../../lib/ids'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  open: boolean
  title: string
  closeOnBackdrop?: boolean
}>(), {
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  close: []
}>()

const dialogId = useStableId('dialog')
const titleId = `${dialogId}-title`
const dialogRef = ref<HTMLElement | null>(null)
const previousActive = ref<HTMLElement | null>(null)

function close() {
  emit('update:open', false)
  emit('close')
}

function focusables() {
  return Array.from(dialogRef.value?.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ) ?? [])
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  if (event.key !== 'Tab') return

  const items = focusables()
  if (!items.length) return
  const first = items[0]
  const last = items[items.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function onOpen() {
  previousActive.value = document.activeElement instanceof HTMLElement ? document.activeElement : null
  document.addEventListener('keydown', onKeydown)
  void nextTick(() => (focusables()[0] ?? dialogRef.value)?.focus())
}

function onClose() {
  document.removeEventListener('keydown', onKeydown)
  previousActive.value?.focus()
  previousActive.value = null
}

watch(() => props.open, (open) => {
  if (open) onOpen()
  else onClose()
}, { immediate: true })

onBeforeUnmount(onClose)
</script>

<template>
  <div v-if="open" class="nb-root nb-dialog-layer" @mousedown.self="closeOnBackdrop && close()">
    <section
      v-bind="$attrs"
      ref="dialogRef"
      class="nb-dialog"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="titleId"
      tabindex="-1"
    >
      <header class="nb-dialog__header">
        <h2 :id="titleId">{{ title }}</h2>
        <button class="nb-dialog__close" type="button" aria-label="Close dialog" @click="close">×</button>
      </header>
      <div class="nb-dialog__body"><slot /></div>
      <footer v-if="$slots.footer" class="nb-dialog__footer"><slot name="footer" /></footer>
    </section>
  </div>
</template>
