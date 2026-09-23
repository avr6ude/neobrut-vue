<script setup lang="ts">
import { ContextMenuItem } from 'reka-ui'

withDefaults(defineProps<{ disabled?: boolean; destructive?: boolean }>(), {
  disabled: false,
  destructive: false,
})

const emit = defineEmits<{ select: [event: Event] }>()
</script>

<template>
  <ContextMenuItem
    class="nb-context-menu__item"
    :class="{ 'nb-context-menu__item--destructive': destructive }"
    :disabled="disabled"
    @select="emit('select', $event)"
  >
    <slot />
  </ContextMenuItem>
</template>
