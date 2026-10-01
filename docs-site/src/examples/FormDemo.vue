<script setup lang="ts">
import { ref } from 'vue'
import { NbButton, NbCheckbox, NbInput, NbSelect, NbSelectItem, NbSwitch } from '@neobrut-vue/core'

const name = ref('')
const color = ref('yellow')
const updates = ref(true)
const accepted = ref(false)
const submitted = ref(false)

function submit() {
  submitted.value = true
}
</script>

<template>
  <form class="demo-form" @submit.prevent="submit">
    <NbInput v-model="name" label="Name" required placeholder="Ada Lovelace" />
    <NbSelect v-model="color" label="Favorite color">
      <NbSelectItem value="yellow">Sunshine yellow</NbSelectItem>
      <NbSelectItem value="mint">Mint green</NbSelectItem>
      <NbSelectItem value="coral">Coral pink</NbSelectItem>
    </NbSelect>
    <NbSwitch v-model="updates" label="Send me updates" />
    <NbCheckbox v-model="accepted" label="I agree to continue" />
    <NbButton type="submit" :disabled="!accepted">Save form</NbButton>
    <p v-if="submitted" role="status">Saved for {{ name }}. Color: {{ color }}. Updates: {{ updates ? 'on' : 'off' }}.</p>
  </form>
</template>

<style scoped>
.demo-form { display: grid; gap: 1.25rem; max-width: 27rem; }
.demo-form p { margin: 0; font-weight: 700; }
</style>
