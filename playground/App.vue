<script setup lang="ts">
import { ref } from 'vue'
import {
  NbAlert,
  NbBadge,
  NbButton,
  NbCard,
  NbCheckbox,
  NbDialog,
  NbInput,
  NbSelect,
  NbTabs,
  NbTextarea,
  NbTooltip,
} from '../src'

const name = ref('')
const note = ref('')
const tone = ref('primary')
const accepted = ref(false)
const dialogOpen = ref(false)
const activeTab = ref('buttons')
</script>

<template>
  <main class="playground nb-root">
    <header class="hero">
      <NbBadge tone="accent">Vue 3 component lab</NbBadge>
      <h1>Make it loud.</h1>
      <p>Colorful, tactile UI primitives for interfaces with a pulse.</p>
      <div class="hero__actions">
        <NbButton variant="primary" size="lg" @click="dialogOpen = true">Open dialog</NbButton>
        <NbTooltip content="This tooltip works with focus too.">
          <NbButton variant="ghost" size="lg">Hover me</NbButton>
        </NbTooltip>
      </div>
    </header>

    <NbAlert tone="success" title="Everything is intentional" dismissible>
      Hard borders, loud colors, sensible semantics.
    </NbAlert>

    <NbTabs v-model="activeTab" :tabs="[
      { value: 'buttons', label: 'Buttons' },
      { value: 'forms', label: 'Forms' },
      { value: 'cards', label: 'Cards' },
    ]">
      <template #panel-buttons>
        <div class="sample-row">
          <NbButton variant="primary">Primary</NbButton>
          <NbButton variant="secondary">Secondary</NbButton>
          <NbButton variant="accent">Accent</NbButton>
          <NbButton variant="danger">Danger</NbButton>
          <NbButton variant="ghost">Ghost</NbButton>
        </div>
      </template>
      <template #panel-forms>
        <div class="form-grid">
          <NbInput v-model="name" label="Name" hint="Try the focus state." placeholder="Ada Lovelace" />
          <NbSelect v-model="tone" label="Tone">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="accent">Accent</option>
          </NbSelect>
          <NbTextarea v-model="note" label="Note" placeholder="Say something loud." />
          <NbCheckbox v-model="accepted" label="I accept the chaos" />
        </div>
      </template>
      <template #panel-cards>
        <div class="card-grid">
          <NbCard tone="primary" interactive>
            <h2>Ship it</h2>
            <p>Strong surfaces and tiny feedback loops.</p>
          </NbCard>
          <NbCard tone="secondary" interactive>
            <h2>Keep it kind</h2>
            <p>Accessibility is part of the visual system.</p>
          </NbCard>
        </div>
      </template>
    </NbTabs>

    <NbDialog v-model:open="dialogOpen" title="A little confirmation">
      <p>This dialog traps focus, supports Escape, and returns focus when it closes.</p>
      <template #footer>
        <NbButton variant="ghost" @click="dialogOpen = false">Cancel</NbButton>
        <NbButton variant="accent" @click="dialogOpen = false">Looks good</NbButton>
      </template>
    </NbDialog>
  </main>
</template>
