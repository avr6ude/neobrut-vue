<script setup lang="ts">
import { ContextMenuItemIndicator, ContextMenuRadioItem } from 'reka-ui'

withDefaults(defineProps<{ value: string; disabled?: boolean }>(), { disabled: false })
</script>

<template>
  <ContextMenuRadioItem class="nb-context-menu__item nb-context-menu__item--choice" :value="value" :disabled="disabled">
    <ContextMenuItemIndicator class="nb-context-menu__indicator" aria-hidden="true">●</ContextMenuItemIndicator>
    <slot />
  </ContextMenuRadioItem>
</template>
