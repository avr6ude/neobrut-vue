<script setup lang="ts">
import { ref } from 'vue'
import { NbSwitch } from '@neobrut-vue/core'

const enabled = ref(true)
</script>

<template>
  <div class="demo-stack">
    <NbSwitch v-model="enabled" label="Launch alerts" />
    <p aria-live="polite">Alerts are {{ enabled ? 'on' : 'off' }}.</p>
  </div>
</template>

<style scoped>
.demo-stack { display: grid; gap: 1rem; justify-items: start; }
.demo-stack p { margin: 0; font-weight: 700; }
</style>
