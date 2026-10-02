<script setup lang="ts">
import { MenubarContent, MenubarMenu, MenubarPortal, MenubarTrigger } from 'reka-ui'

defineProps<{ label: string }>()
</script>

<template>
  <MenubarMenu>
    <MenubarTrigger class="nb-menubar__trigger">{{ label }}</MenubarTrigger>
    <MenubarPortal>
      <MenubarContent class="nb-root nb-menubar__content" :side-offset="6"><slot /></MenubarContent>
    </MenubarPortal>
  </MenubarMenu>
</template>
