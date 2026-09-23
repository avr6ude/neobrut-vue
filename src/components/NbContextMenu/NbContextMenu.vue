<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ContextMenuContent, ContextMenuPortal, ContextMenuRoot, ContextMenuTrigger } from 'reka-ui'

const props = withDefaults(defineProps<{
  open?: boolean
  defaultOpen?: boolean
}>(), {
  open: undefined,
  defaultOpen: false,
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
  <ContextMenuRoot :open="currentOpen" @update:open="updateOpen">
    <ContextMenuTrigger as-child><slot name="trigger" /></ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent class="nb-root nb-context-menu" :side-offset="6">
        <slot />
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
