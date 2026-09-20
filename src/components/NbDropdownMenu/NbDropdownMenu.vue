<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from 'reka-ui'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  label?: string
  align?: 'start' | 'center' | 'end'
  disabled?: boolean
}>(), {
  open: undefined,
  defaultOpen: false,
  label: 'Open menu',
  align: 'start',
  disabled: false,
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
  <DropdownMenuRoot
    :open="currentOpen"
    :default-open="defaultOpen"
    @update:open="updateOpen"
  >
    <DropdownMenuTrigger class="nb-root nb-overlay-trigger" :aria-label="label" :disabled="disabled">
      <slot name="trigger" />
      <svg class="nb-overlay-trigger__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="m3 6 5 5 5-5" />
      </svg>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        class="nb-root nb-dropdown-menu"
        :align="align"
        :side-offset="8"
      >
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
