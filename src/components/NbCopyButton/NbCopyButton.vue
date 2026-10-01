<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import NbButton from '../NbButton/NbButton.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  text: string
  label?: string
  copiedLabel?: string
  errorLabel?: string
  disabled?: boolean
}>(), { label: 'Copy', copiedLabel: 'Copied', errorLabel: 'Copy failed', disabled: false })

const emit = defineEmits<{ copied: [text: string]; error: [error: unknown] }>()
const status = ref<'idle' | 'copied' | 'error'>('idle')
const busy = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined
let disposed = false

watch(() => props.text, () => {
  clearTimeout(resetTimer)
  status.value = 'idle'
})
onBeforeUnmount(() => {
  disposed = true
  clearTimeout(resetTimer)
})

function showStatus(value: 'copied' | 'error') {
  status.value = value
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => { status.value = 'idle' }, 2000)
}

async function copy() {
  if (busy.value || props.disabled) return
  busy.value = true
  const text = props.text
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard is unavailable')
    await navigator.clipboard.writeText(text)
    if (disposed) return
    emit('copied', text)
    if (props.text === text) showStatus('copied')
  } catch (error) {
    if (disposed) return
    emit('error', error)
    if (props.text === text) showStatus('error')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <NbButton v-bind="$attrs" variant="secondary" type="button" :disabled="disabled || busy" @click="copy">
    <span role="status" aria-live="polite">{{ status === 'copied' ? copiedLabel : status === 'error' ? errorLabel : label }}</span>
  </NbButton>
</template>
