<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import NbCommandPanel from './NbCommandPanel.vue'
import type { NbCommandOption } from './types'

const props = withDefaults(defineProps<{
  modelValue?: string
  options: NbCommandOption[]
  label?: string
  placeholder?: string
  emptyText?: string
  dialog?: boolean
  open?: boolean
  defaultOpen?: boolean
}>(), {
  modelValue: '',
  label: 'Command menu',
  placeholder: 'Type a command or search…',
  emptyText: 'No commands found',
  dialog: false,
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:open': [value: boolean]
  select: [option: NbCommandOption]
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

function selectOption(option: NbCommandOption) {
  emit('select', option)
  if (props.dialog) updateOpen(false)
}
</script>

<template>
  <DialogRoot v-if="dialog" :open="currentOpen" @update:open="updateOpen">
    <DialogTrigger class="nb-root nb-overlay-trigger"><slot name="trigger" /></DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="nb-root nb-command-dialog__overlay" />
      <DialogContent :aria-describedby="undefined" class="nb-root nb-command-dialog">
        <header class="nb-command-dialog__header">
          <DialogTitle class="nb-command-dialog__title">{{ label }}</DialogTitle>
          <DialogClose class="nb-overlay-close" aria-label="Close command menu">×</DialogClose>
        </header>
        <NbCommandPanel
          :model-value="modelValue"
          :options="options"
          :label="label"
          :placeholder="placeholder"
          :empty-text="emptyText"
          @update:model-value="emit('update:modelValue', $event)"
          @select="selectOption"
        />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>

  <NbCommandPanel
    v-else
    class="nb-root"
    :model-value="modelValue"
    :options="options"
    :label="label"
    :placeholder="placeholder"
    :empty-text="emptyText"
    @update:model-value="emit('update:modelValue', $event)"
    @select="selectOption"
  />
</template>
