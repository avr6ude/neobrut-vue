<script setup lang="ts">
import { ref } from 'vue'
import {
  NbAlert,
  NbBadge,
  NbButton,
  NbCard,
  NbCheckbox,
  NbDialog,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbRadioGroup,
  NbSelect,
  NbSelectItem,
  NbSwitch,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbTextarea,
  NbTooltip,
} from '../src'

const name = ref('')
const email = ref('not-an-email')
const handle = ref('loud-ui')
const note = ref('')
const tone = ref('primary')
const plan = ref('pro')
const accepted = ref(false)
const notifications = ref(true)
const dialogOpen = ref(false)
const activeTab = ref('buttons')

const plans = [
  { value: 'free', label: 'Free', description: 'For small experiments and wonderfully bad ideas.' },
  { value: 'pro', label: 'Pro', description: 'For shipping loud interfaces with a team.' },
  { value: 'studio', label: 'Studio', description: 'For agencies juggling several colorful products.' },
]
</script>

<template>
  <main class="playground nb-root">
    <header class="hero">
      <NbBadge tone="accent">@neobrut-vue/core</NbBadge>
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

    <NbTabs v-model="activeTab">
      <NbTabsList>
        <NbTabsTrigger value="buttons"><span aria-hidden="true">✦</span> Buttons</NbTabsTrigger>
        <NbTabsTrigger value="forms"><span aria-hidden="true">✎</span> Forms</NbTabsTrigger>
        <NbTabsTrigger value="cards"><span aria-hidden="true">▰</span> Surfaces</NbTabsTrigger>
        <NbTabsTrigger value="soon" disabled>More soon</NbTabsTrigger>
      </NbTabsList>

      <NbTabsContent value="buttons">
        <div class="sample-row">
          <NbButton variant="primary">Primary</NbButton>
          <NbButton variant="secondary">Secondary</NbButton>
          <NbButton variant="accent">Accent</NbButton>
          <NbButton variant="danger">Danger</NbButton>
          <NbButton variant="ghost">Ghost</NbButton>
        </div>
      </NbTabsContent>

      <NbTabsContent value="forms">
        <div class="form-stack">
          <NbFieldset legend="Contact card" description="Labels, help text, errors, native inputs—the whole useful mess.">
            <div class="form-grid">
              <NbInput v-model="name" required label="Name" hint="Required field" placeholder="Ada Lovelace" />
              <NbInput v-model="email" type="email" label="Email" error="That email is intentionally suspicious." />
              <NbSelect v-model="tone" label="Favorite tone">
                <NbSelectItem value="primary">Electric blue</NbSelectItem>
                <NbSelectItem value="secondary">Bubblegum pink</NbSelectItem>
                <NbSelectItem value="accent">Safety yellow</NbSelectItem>
              </NbSelect>
              <NbInput type="file" label="Avatar" accept="image/*" hint="Native file input, same field rhythm." />
              <NbTextarea v-model="note" class="form-grid__wide" label="Note" placeholder="Say something loud." />
            </div>
          </NbFieldset>

          <div class="form-grid form-grid--extras">
            <NbRadioGroup v-model="plan" label="Pick a plan" hint="The whole card is clickable." :options="plans" />
            <div class="form-stack form-stack--compact">
              <div class="demo-field">
                <label class="demo-label" for="handle">Profile handle</label>
                <NbInputGroup>
                  <template #start>@</template>
                  <input id="handle" v-model="handle" autocomplete="username">
                  <template #end>.dev</template>
                </NbInputGroup>
                <small>Input groups keep useful context attached.</small>
              </div>
              <NbSwitch v-model="notifications" label="Launch alerts" description="Send one cheerful ping when the build ships." />
              <NbCheckbox v-model="accepted" label="I accept the chaos" />
              <NbInput disabled label="Disabled field" model-value="No touching" />
            </div>
          </div>
        </div>
      </NbTabsContent>

      <NbTabsContent value="cards">
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
      </NbTabsContent>
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
