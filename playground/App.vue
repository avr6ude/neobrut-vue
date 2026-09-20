<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import {
  NbAccordion,
  NbAccordionItem,
  NbAlert,
  NbAvatar,
  NbBadge,
  NbBreadcrumbs,
  NbButton,
  NbCard,
  NbCheckbox,
  NbCombobox,
  NbDialog,
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbDropdownMenuSeparator,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbNumberInput,
  NbPagination,
  NbPopover,
  NbProgress,
  NbRadioGroup,
  NbSelect,
  NbSelectItem,
  NbSkeleton,
  NbSlider,
  NbSwitch,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbTextarea,
  NbToast,
  NbToggleGroup,
  NbToggleGroupItem,
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
const framework = ref('vue')
const seats = ref(3)
const volume = ref(65)
const alignment = ref('center')
const validationMessage = ref('')
const toastOpen = ref(false)
const menuAction = ref('Nothing selected yet.')
const currentPage = ref(3)

const plans = [
  { value: 'free', label: 'Free', description: 'For small experiments and wonderfully bad ideas.' },
  { value: 'pro', label: 'Pro', description: 'For shipping loud interfaces with a team.' },
  { value: 'studio', label: 'Studio', description: 'For agencies juggling several colorful products.' },
]

const frameworks = [
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
]

const { defineField, errors, handleSubmit } = useForm({
  initialValues: { workspace: '' },
  validationSchema: {
    workspace: (value: string) => value.trim().length >= 3 || 'Use at least three characters.',
  },
})
const [workspace, workspaceAttrs] = defineField('workspace')
const validateWorkspace = handleSubmit(({ workspace }) => {
  validationMessage.value = `Saved “${workspace}”.`
})
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
        <NbTabsTrigger value="overlays"><span aria-hidden="true">◆</span> Overlays</NbTabsTrigger>
        <NbTabsTrigger value="data"><span aria-hidden="true">●</span> Data</NbTabsTrigger>
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

          <NbFieldset legend="Power controls" description="Search, step, slide, and choose without losing native form behavior.">
            <div class="form-grid form-grid--advanced">
              <NbCombobox
                v-model="framework"
                label="Framework"
                hint="Type to filter the list."
                name="framework"
                :options="frameworks"
              />
              <NbNumberInput
                v-model="seats"
                label="Team seats"
                hint="Arrow keys work too."
                name="seats"
                :min="1"
                :max="12"
              />
              <NbSlider
                v-model="volume"
                label="Launch volume"
                hint="Keyboard and pointer friendly."
                name="volume"
                :step="5"
              />
              <NbToggleGroup v-model="alignment" label="Alignment" hint="A composable single-choice group." name="alignment">
                <NbToggleGroupItem value="left">Left</NbToggleGroupItem>
                <NbToggleGroupItem value="center">Center</NbToggleGroupItem>
                <NbToggleGroupItem value="right">Right</NbToggleGroupItem>
              </NbToggleGroup>
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

          <NbFieldset legend="VeeValidate" description="The core stays form-library agnostic; standard bindings do the work.">
            <form class="validation-demo" @submit="validateWorkspace">
              <NbInput
                v-model="workspace"
                v-bind="workspaceAttrs"
                name="workspace"
                label="Workspace name"
                placeholder="loud-studio"
                :error="errors.workspace"
              />
              <NbButton type="submit" variant="accent">Validate</NbButton>
              <p class="validation-demo__status" role="status">{{ validationMessage }}</p>
            </form>
          </NbFieldset>
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

      <NbTabsContent value="overlays">
        <div class="overlay-grid">
          <section class="overlay-demo overlay-demo--yellow">
            <div>
              <NbBadge tone="accent">Popover</NbBadge>
              <h2>Extra context, zero drama.</h2>
              <p>Useful for compact actions and small bits of supporting content.</p>
            </div>
            <NbPopover title="Quick note" align="start">
              <template #trigger>Open popover</template>
              <p class="overlay-copy">This stays lightweight, closes on Escape, and returns focus.</p>
            </NbPopover>
          </section>

          <section class="overlay-demo overlay-demo--mint">
            <div>
              <NbBadge tone="primary">Menu</NbBadge>
              <h2>Actions with proper keys.</h2>
              <p>{{ menuAction }}</p>
            </div>
            <NbDropdownMenu label="Open project actions">
              <template #trigger>Project actions</template>
              <NbDropdownMenuItem @select="menuAction = 'Duplicated the project.'">Duplicate</NbDropdownMenuItem>
              <NbDropdownMenuItem @select="menuAction = 'Copied a share link.'">Copy link</NbDropdownMenuItem>
              <NbDropdownMenuSeparator />
              <NbDropdownMenuItem destructive @select="menuAction = 'Delete selected.'">Delete</NbDropdownMenuItem>
            </NbDropdownMenu>
          </section>

          <section class="overlay-demo overlay-demo--pink">
            <div>
              <NbBadge tone="secondary">Feedback</NbBadge>
              <h2>Say it, then get out.</h2>
              <p>Toasts announce short-lived results without blocking the page.</p>
            </div>
            <div class="sample-row">
              <NbButton variant="accent" @click="toastOpen = true">Show toast</NbButton>
              <NbTooltip content="Keyboard focus reveals this too.">
                <NbButton variant="ghost">Tooltip</NbButton>
              </NbTooltip>
            </div>
          </section>
        </div>
      </NbTabsContent>

      <NbTabsContent value="data">
        <div class="data-stack">
          <NbBreadcrumbs :items="[
            { label: 'Home', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Data display' },
          ]" />

          <div class="data-grid">
            <section class="data-panel data-panel--yellow">
              <h2>People</h2>
              <div class="avatar-row">
                <NbAvatar name="Ada Lovelace" size="lg" />
                <NbAvatar name="Grace Hopper" tone="secondary" />
                <NbAvatar name="Linus Torvalds" size="sm" tone="accent" />
              </div>
            </section>

            <section class="data-panel data-panel--pink">
              <h2>Build status</h2>
              <NbProgress :value="72" label="Package build" show-value />
              <NbProgress :value="null" label="Waiting for checks" />
            </section>

            <section class="data-panel data-panel--mint">
              <h2>Loading card</h2>
              <div class="skeleton-demo">
                <NbSkeleton width="3rem" height="3rem" rounded />
                <div>
                  <NbSkeleton width="9rem" />
                  <NbSkeleton width="13rem" height="0.75rem" />
                </div>
              </div>
            </section>

            <section class="data-panel data-panel--wide">
              <h2>Frequently yelled questions</h2>
              <NbAccordion default-value="why">
                <NbAccordionItem value="why" title="Why is it so loud?">Because quiet interfaces already have enough libraries.</NbAccordionItem>
                <NbAccordionItem value="keyboard" title="Does the keyboard work?">Yes. Focus, arrows, Enter, Space, and ARIA are part of the component.</NbAccordionItem>
                <NbAccordionItem value="theme" title="Can I change the colors?">Every core color and shadow is a CSS custom property.</NbAccordionItem>
              </NbAccordion>
            </section>

            <section class="data-panel data-panel--wide data-panel--paper">
              <h2>Pages of components</h2>
              <NbPagination v-model:page="currentPage" :total="120" :items-per-page="10" />
            </section>
          </div>
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

    <NbToast
      v-model:open="toastOpen"
      tone="success"
      title="Nice. That worked."
      description="The toast will dismiss itself in a few seconds."
    />
  </main>
</template>
