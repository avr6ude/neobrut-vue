<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'

withDefaults(defineProps<{
  title: string
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
}>(), { open: undefined, defaultOpen: false, disabled: false })

const emit = defineEmits<{ 'update:open': [value: boolean] }>()
</script>

<template>
  <CollapsibleRoot
    class="nb-root nb-collapsible"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    @update:open="emit('update:open', $event)"
  >
    <CollapsibleTrigger class="nb-collapsible__trigger">
      <span>{{ title }}</span>
      <svg class="nb-collapsible__icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 6 5 5 5-5" /></svg>
    </CollapsibleTrigger>
    <CollapsibleContent class="nb-collapsible__content">
      <div class="nb-collapsible__body"><slot /></div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
