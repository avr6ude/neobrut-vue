<script setup lang="ts">
import { ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from 'reka-ui'

withDefaults(defineProps<{ label: string; disabled?: boolean }>(), { disabled: false })
</script>

<template>
  <ContextMenuSub>
    <ContextMenuSubTrigger class="nb-context-menu__item" :disabled="disabled">
      {{ label }}
      <span class="nb-context-menu__shortcut" aria-hidden="true">›</span>
    </ContextMenuSubTrigger>
    <ContextMenuSubContent class="nb-root nb-context-menu" :side-offset="6">
      <slot />
    </ContextMenuSubContent>
  </ContextMenuSub>
</template>
