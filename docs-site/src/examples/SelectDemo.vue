<script setup lang="ts">
import { ref } from 'vue'
import { NbSelect, NbSelectItem } from '@neobrut-vue/core'

const color = ref('')
</script>

<template>
  <div class="demo-stack">
    <NbSelect v-model="color" label="Pick a color" placeholder="Choose one">
      <NbSelectItem value="yellow">Sunshine yellow</NbSelectItem>
      <NbSelectItem value="mint">Mint green</NbSelectItem>
      <NbSelectItem value="coral">Coral pink</NbSelectItem>
    </NbSelect>
    <p aria-live="polite">{{ color ? `Selected: ${color}` : 'Nothing selected yet.' }}</p>
  </div>
</template>

<style scoped>
.demo-stack { display: grid; gap: 1rem; max-width: 26rem; }
.demo-stack p { margin: 0; font-weight: 700; }
</style>
