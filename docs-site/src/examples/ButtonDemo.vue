<script setup lang="ts">
import { ref } from 'vue'
import { NbButton } from '@neobrut-vue/core'

const loading = ref(false)
function simulateSave() {
  loading.value = true
  window.setTimeout(() => { loading.value = false }, 900)
}
</script>

<template>
  <div class="demo-row">
    <NbButton @click="simulateSave" :loading="loading">Save changes</NbButton>
    <NbButton variant="secondary">Secondary</NbButton>
    <NbButton variant="accent">Accent</NbButton>
    <NbButton variant="ghost">Ghost</NbButton>
  </div>
</template>

<style scoped>
.demo-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; }
</style>
