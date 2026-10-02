<script setup lang="ts">
import { MenubarItem } from 'reka-ui'

withDefaults(defineProps<{ disabled?: boolean; destructive?: boolean }>(), { disabled: false, destructive: false })
const emit = defineEmits<{ select: [event: Event] }>()
</script>

<template>
  <MenubarItem class="nb-menubar__item" :class="{ 'nb-menubar__item--destructive': destructive }" :disabled="disabled" @select="emit('select', $event)"><slot /></MenubarItem>
</template>
