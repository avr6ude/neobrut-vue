<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'

withDefaults(defineProps<{
  disabled?: boolean
  destructive?: boolean
}>(), {
  disabled: false,
  destructive: false,
})

const emit = defineEmits<{ select: [event: Event] }>()
</script>

<template>
  <DropdownMenuItem
    class="nb-dropdown-menu__item"
    :class="{ 'nb-dropdown-menu__item--destructive': destructive }"
    :disabled="disabled"
    @select="emit('select', $event)"
  >
    <slot />
  </DropdownMenuItem>
</template>
