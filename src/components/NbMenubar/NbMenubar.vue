<script setup lang="ts">
import { MenubarRoot } from 'reka-ui'

withDefaults(defineProps<{ label?: string }>(), { label: 'Actions' })
</script>

<template>
  <MenubarRoot class="nb-root nb-menubar" :aria-label="label"><slot /></MenubarRoot>
</template>
