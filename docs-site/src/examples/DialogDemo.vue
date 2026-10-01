<script setup lang="ts">
import { ref } from 'vue'
import { NbButton, NbDialog } from '@neobrut-vue/core'

const open = ref(false)
</script>

<template>
  <div>
    <NbButton @click="open = true">Open dialog</NbButton>
    <NbDialog v-model:open="open" title="Ready to go?">
      <p>The dialog traps focus and closes with Escape.</p>
      <template #footer>
        <NbButton variant="accent" @click="open = false">Got it</NbButton>
      </template>
    </NbDialog>
  </div>
</template>
