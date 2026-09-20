<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui'
import { useStableId } from '../../lib/ids'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
  title?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  disabled?: boolean
}>(), {
  open: undefined,
  defaultOpen: false,
  align: 'center',
  side: 'bottom',
  disabled: false,
})

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const titleId = useStableId('popover-title')
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
  <PopoverRoot
    :open="currentOpen"
    :default-open="defaultOpen"
    @update:open="updateOpen"
  >
    <PopoverTrigger class="nb-root nb-overlay-trigger" :disabled="disabled">
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        class="nb-root nb-popover"
        :align="align"
        :side="side"
        :side-offset="8"
        :aria-labelledby="title ? titleId : undefined"
      >
        <header v-if="title" class="nb-popover__header">
          <h2 :id="titleId">{{ title }}</h2>
          <PopoverClose class="nb-overlay-close" aria-label="Close popover">×</PopoverClose>
        </header>
        <div class="nb-popover__body"><slot /></div>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
