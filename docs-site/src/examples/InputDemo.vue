<script setup lang="ts">
import { ref } from 'vue'
import { NbInput } from '@neobrut-vue/core'

const name = ref('')
</script>

<template>
  <div class="demo-stack">
    <NbInput v-model="name" label="Your name" placeholder="Type something" hint="This updates as you type." />
    <p aria-live="polite">{{ name ? `Hello, ${name}!` : 'Your name appears here.' }}</p>
  </div>
</template>

<style scoped>
.demo-stack { display: grid; gap: 1rem; max-width: 26rem; }
.demo-stack p { margin: 0; font-weight: 700; }
</style>
