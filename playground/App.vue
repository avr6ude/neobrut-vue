<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import {
  NbAccordion,
  NbAccordionItem,
  NbAlert,
  NbAlertDialog,
  NbAspectRatio,
  NbAvatar,
  NbBadge,
  NbBreadcrumbs,
  NbButton,
  NbButtonGroup,
  NbCarousel,
  NbCarouselSlide,
  NbCard,
  NbCheckbox,
  NbCollapsible,
  NbCombobox,
  NbCommand,
  NbCopyButton,
  NbContextMenu,
  NbContextMenuCheckboxItem,
  NbContextMenuItem,
  NbContextMenuLabel,
  NbContextMenuSeparator,
  NbContextMenuShortcut,
  NbDialog,
  NbDrawer,
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbDropdownMenuSeparator,
  NbEmptyState,
  NbField,
  NbFieldset,
  NbHoverCard,
  NbInput,
  NbInputGroup,
  NbKbd,
  NbLabel,
  NbLink,
  NbMarker,
  NbMenubar,
  NbMenubarMenu,
  NbMenubarItem,
  NbMenubarSeparator,
  NbMeter,
  NbNativeSelect,
  NbNavigationMenu,
  NbNumberInput,
  NbPagination,
  NbPinInput,
  NbPopover,
  NbProgress,
  NbRadioGroup,
  NbRating,
  NbScrollArea,
  NbSelect,
  NbSelectItem,
  NbSeparator,
  NbSheet,
  NbSkeleton,
  NbSlider,
  NbSpinner,
  NbStepper,
  NbStepperItem,
  NbSwitch,
  NbTagsInput,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbTextarea,
  NbTable,
  NbTimeline,
  NbTimelineItem,
  NbToast,
  NbToggle,
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
const pinned = ref(false)
const gridVisible = ref(true)
const commandValue = ref('')
const skills = ref(['Vue', 'TypeScript'])
const verificationCode = ref<number[]>([])
const experienceRating = ref(3)
const releaseStep = ref(2)
const fruit = ref('apple')
const previewName = ref('Alex')
const previewAlerts = ref(true)
const previewSaved = ref(false)

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

const commands = [
  { value: 'new', label: 'New component', group: 'Project', shortcut: '⌘N' },
  { value: 'publish', label: 'Publish package', group: 'Project', shortcut: '⌘P', keywords: ['release', 'npm'] },
  { value: 'theme', label: 'Change theme', group: 'Settings' },
]

const navigationItems = [
  { label: 'Docs', href: '/docs/' },
  {
    label: 'Components',
    children: [
      { label: 'Actions', href: '#actions', description: 'Buttons, toggles, and links.' },
      { label: 'Forms', href: '#forms', description: 'Inputs without the beige.' },
      { label: 'Overlays', href: '#overlays', description: 'Focused layers with proper focus.' },
    ],
  },
  { label: 'GitHub', href: 'https://github.com/avr6ude/neobrut-vue' },
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
    <nav class="site-nav" aria-label="Main navigation">
      <a class="site-mark" href="#top" aria-label="Neobrut Vue home"><span aria-hidden="true">N.</span><span>neobrut<span class="site-mark__quiet">/vue</span></span></a>
      <div class="site-nav__links">
        <a href="#gallery">Components</a>
        <a href="/docs/">Docs</a>
        <a href="https://github.com/avr6ude/neobrut-vue">GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </nav>

    <header class="hero">
      <div id="top" class="hero__copy">
        <h1>UI with<br><span>an attitude.</span></h1>
        <p>Colorful, accessible Vue components that feel as good to use as they look.</p>
        <div class="hero__actions">
          <a class="hero__primary" href="/docs/getting-started/">Get started <span aria-hidden="true">↗</span></a>
          <a class="hero__secondary" href="#gallery">Explore components <span aria-hidden="true">↓</span></a>
        </div>
        <div class="install-command">
          <code><span>npm install</span> <span>@neobrut-vue/core</span></code>
          <NbCopyButton text="npm install @neobrut-vue/core" label="Copy" copied-label="Copied" aria-label="Copy install command" size="sm" />
        </div>
        <p class="hero__meta">Vue 3.5+ <span aria-hidden="true">·</span> MIT licensed <span aria-hidden="true">·</span> v0.6.0</p>
      </div>

      <div class="hero__preview" aria-label="Interactive component preview">
        <div class="preview__top"><span class="preview__dots" aria-hidden="true"><i></i><i></i><i></i></span><span>live preview.vue</span><NbBadge tone="secondary" size="sm">INTERACTIVE</NbBadge></div>
        <div class="preview__body">
          <div class="preview__heading"><NbBadge tone="accent">YOUR CANVAS</NbBadge><span aria-hidden="true">✳</span></div>
          <h2>Make something<br>unmistakable.</h2>
          <p>Start with a name. The rest is yours.</p>
          <NbInput v-model="previewName" label="Project name" placeholder="Your next big thing" @update:model-value="previewSaved = false" />
          <NbSwitch v-model="previewAlerts" label="Launch alerts" description="Let the team know when it's ready." @update:model-value="previewSaved = false" />
          <div class="preview__footer">
            <NbButton variant="primary" @click="previewSaved = true">Save project</NbButton>
            <span role="status">{{ previewSaved ? `${previewName || 'Untitled'} saved!` : previewAlerts ? 'Alerts are on' : 'Alerts are off' }}</span>
          </div>
        </div>
      </div>
    </header>

    <section id="gallery" class="gallery-intro" aria-labelledby="gallery-title">
      <div><h2 id="gallery-title">Take the whole kit for a spin.</h2><p>Buttons, forms, overlays, navigation and more. Click around—this is the real library.</p></div>
      <a href="/docs/components/">Browse the docs <span aria-hidden="true">↗</span></a>
    </section>

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
        <NbTabsTrigger value="layout"><span aria-hidden="true">▦</span> Layout</NbTabsTrigger>
      </NbTabsList>

      <NbTabsContent value="buttons">
        <div class="action-grid">
          <section class="action-panel action-panel--yellow">
            <h2>Buttons</h2>
            <div class="sample-row">
              <NbButton variant="primary">Primary</NbButton>
              <NbButton variant="secondary">Secondary</NbButton>
              <NbButton variant="accent">Accent</NbButton>
              <NbButton variant="danger">Danger</NbButton>
              <NbButton variant="ghost">Ghost</NbButton>
            </div>
          </section>

          <section class="action-panel action-panel--mint">
            <h2>Actions that belong together</h2>
            <NbButtonGroup label="Document actions">
              <NbButton>Save</NbButton>
              <NbButton variant="secondary">Share</NbButton>
              <NbButton variant="accent">Export</NbButton>
            </NbButtonGroup>
            <NbToggle v-model="pinned" label="Pin component" tone="accent">
              {{ pinned ? 'Pinned!' : 'Pin component' }}
            </NbToggle>
            <NbCopyButton text="npm install @neobrut-vue/core" label="Copy install command" />
          </section>

          <section class="action-panel action-panel--pink">
            <h2>Links and inline details</h2>
            <p>
              <NbLink href="/docs/">Read the docs</NbLink>
              and ship something <NbMarker tone="primary">unmistakable</NbMarker>.
            </p>
            <p class="shortcut-row">Open search <NbKbd>⌘</NbKbd><NbKbd>K</NbKbd></p>
          </section>
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
              <NbNativeSelect v-model="fruit" label="Favorite fruit" hint="A native browser menu, with our field styling.">
                <option value="apple">Apple</option>
                <option value="pear">Pear</option>
                <option value="peach">Peach</option>
              </NbNativeSelect>
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
              <NbField label="Profile handle" hint="Input groups keep useful context attached." v-slot="{ inputId, describedBy }">
                <NbInputGroup>
                  <template #start>@</template>
                  <input :id="inputId" v-model="handle" :aria-describedby="describedBy" autocomplete="username">
                  <template #end>.dev</template>
                </NbInputGroup>
              </NbField>
              <div class="demo-field">
                <NbLabel for="native-title">Native label</NbLabel>
                <input id="native-title" class="nb-field__control" placeholder="A title of your own">
              </div>
              <NbSwitch v-model="notifications" label="Launch alerts" description="Send one cheerful ping when the build ships." />
              <NbCheckbox v-model="accepted" label="I accept the chaos" />
              <NbInput disabled label="Disabled field" model-value="No touching" />
            </div>
          </div>

          <NbFieldset legend="Small but mighty" description="Tags, codes, and ratings with proper keyboard controls.">
            <div class="form-grid">
              <NbTagsInput v-model="skills" label="Skills" hint="Type a skill and press Enter." placeholder="Add a skill" name="skills" />
              <NbPinInput v-model="verificationCode" label="Verification code" hint="Try typing or pasting six digits." :length="6" otp name="code" />
              <NbRating v-model="experienceRating" label="How fun is this?" hint="Pick one to five stars." name="rating" />
            </div>
          </NbFieldset>

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
        <NbNavigationMenu class="overlay-navigation" label="Component demo navigation" :items="navigationItems" />
        <NbMenubar label="Editor actions" class="overlay-navigation">
          <NbMenubarMenu label="File">
            <NbMenubarItem @select="menuAction = 'New file selected.'">New file</NbMenubarItem>
            <NbMenubarSeparator />
            <NbMenubarItem @select="menuAction = 'Export selected.'">Export</NbMenubarItem>
          </NbMenubarMenu>
          <NbMenubarMenu label="Edit"><NbMenubarItem @select="menuAction = 'Duplicate selected.'">Duplicate</NbMenubarItem></NbMenubarMenu>
        </NbMenubar>
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

          <section class="overlay-demo overlay-demo--wide overlay-demo--yellow">
            <div>
              <NbBadge tone="accent">Command</NbBadge>
              <h2>Find the action. Run the action.</h2>
              <p>{{ commandValue ? `Selected: ${commandValue}` : 'Type “publish” or use the arrow keys.' }}</p>
            </div>
            <NbCommand v-model="commandValue" :options="commands" label="Demo commands" />
          </section>

          <section class="overlay-demo overlay-demo--mint">
            <div>
              <NbBadge tone="primary">Panels</NbBadge>
              <h2>Big decisions, clear exits.</h2>
              <p>Sheets keep context. Alert dialogs demand a real answer.</p>
            </div>
            <div class="sample-row">
              <NbButton variant="primary" @click="dialogOpen = true">Open dialog</NbButton>
              <NbSheet title="Edit component" description="Make the loud thing even louder.">
                <template #trigger>Open sheet</template>
                <NbInput label="Component name" model-value="ExplosiveButton" />
                <template #footer><NbButton variant="accent">Save changes</NbButton></template>
              </NbSheet>
              <NbDrawer title="Quick edit" description="Swipe down or press Escape to close.">
                <template #trigger>Open drawer</template>
                <NbInput label="Project name" placeholder="A loud idea" />
              </NbDrawer>
              <NbAlertDialog
                title="Delete component?"
                description="This removes it from the demo immediately."
                action-label="Delete"
                destructive
              >
                <template #trigger>Delete…</template>
              </NbAlertDialog>
            </div>
          </section>

          <section class="overlay-demo overlay-demo--full overlay-demo--pink">
            <div>
              <NbBadge tone="secondary">Context</NbBadge>
              <h2>More where you expect it.</h2>
              <p>
                Meet <NbHoverCard :open-delay="250"><template #trigger><NbLink href="#ada">Ada Lovelace</NbLink></template>Mathematician, writer, and very early programmer.</NbHoverCard>
              </p>
            </div>
            <NbContextMenu>
              <template #trigger><div class="context-target" tabindex="0">Right-click this card</div></template>
              <NbContextMenuLabel>Canvas</NbContextMenuLabel>
              <NbContextMenuItem>Duplicate <NbContextMenuShortcut>⌘D</NbContextMenuShortcut></NbContextMenuItem>
              <NbContextMenuCheckboxItem v-model="gridVisible">Show grid</NbContextMenuCheckboxItem>
              <NbContextMenuSeparator />
              <NbContextMenuItem destructive>Delete</NbContextMenuItem>
            </NbContextMenu>
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
              <NbMeter :value="72" label="Storage used" show-value />
            </section>

            <section class="data-panel data-panel--mint">
              <h2>Loading card</h2>
              <div class="skeleton-demo">
                <NbSkeleton width="3rem" height="3rem" rounded />
                <div>
                  <NbSkeleton width="70%" />
                  <NbSkeleton width="100%" height="0.75rem" />
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
              <h2>One more detail</h2>
              <NbCollapsible title="What is a collapsible?">A single section you can reveal without opening a whole accordion.</NbCollapsible>
            </section>

            <section class="data-panel data-panel--wide data-panel--paper">
              <h2>Color in motion</h2>
              <NbCarousel label="Component colors">
                <NbCarouselSlide label="Yellow"><div class="color-slide color-slide--yellow">Electric yellow</div></NbCarouselSlide>
                <NbCarouselSlide label="Mint"><div class="color-slide color-slide--mint">Fresh mint</div></NbCarouselSlide>
                <NbCarouselSlide label="Coral"><div class="color-slide color-slide--coral">Bold coral</div></NbCarouselSlide>
              </NbCarousel>
            </section>

            <section class="data-panel data-panel--wide data-panel--paper">
              <h2>Pages of components</h2>
              <NbPagination v-model:page="currentPage" :total="120" :items-per-page="10" />
            </section>

            <section class="data-panel data-panel--wide data-panel--yellow">
              <h2>Release steps</h2>
              <NbStepper v-model="releaseStep" label="Release workflow">
                <NbStepperItem :step="1" title="Build" description="Make the components" />
                <NbStepperItem :step="2" title="Review" description="Catch the rough edges" />
                <NbStepperItem :step="3" title="Publish" description="Ship the package" />
              </NbStepper>
            </section>

            <section class="data-panel data-panel--wide data-panel--paper">
              <h2>Release history</h2>
              <NbTimeline label="Release history">
                <NbTimelineItem title="Version 0.5.0" date="Oct 1" datetime="2026-10-01">More useful primitives, same loud personality.</NbTimelineItem>
                <NbTimelineItem title="Version 0.4.0" date="Sep 30" datetime="2026-09-30">Tags, PINs, ratings, and collapsibles.</NbTimelineItem>
              </NbTimeline>
            </section>
          </div>
        </div>
      </NbTabsContent>

      <NbTabsContent value="layout">
        <div class="layout-grid">
          <section class="layout-panel layout-panel--wide">
            <NbTable caption="Component readiness">
              <thead>
                <tr><th scope="col">Component</th><th scope="col">State</th><th scope="col">Keyboard</th></tr>
              </thead>
              <tbody>
                <tr><td>Dialog</td><td><NbBadge tone="secondary" size="sm">Ready</NbBadge></td><td>Escape + trap</td></tr>
                <tr><td>Combobox</td><td><NbBadge tone="secondary" size="sm">Ready</NbBadge></td><td>Arrows + Enter</td></tr>
                <tr><td>Pagination</td><td><NbBadge tone="secondary" size="sm">Ready</NbBadge></td><td>Native buttons</td></tr>
              </tbody>
            </NbTable>
          </section>

          <section class="layout-panel layout-panel--yellow">
            <h2>Aspect ratio</h2>
            <NbAspectRatio :ratio="16 / 9">
              <div class="ratio-art"><span>16:9</span></div>
            </NbAspectRatio>
          </section>

          <section class="layout-panel layout-panel--mint">
            <h2>Scroll area</h2>
            <NbScrollArea label="Release notes" height="13rem" type="always">
              <div class="release-list">
                <article><strong>Forms</strong><span>Inputs, selects, validation.</span></article>
                <NbSeparator />
                <article><strong>Overlays</strong><span>Dialogs, menus, feedback.</span></article>
                <NbSeparator />
                <article><strong>Data</strong><span>Navigation and loading states.</span></article>
                <NbSeparator />
                <article><strong>Layout</strong><span>The final component batch.</span></article>
              </div>
            </NbScrollArea>
          </section>

          <section class="layout-panel layout-panel--pink">
            <h2>Loading</h2>
            <div class="spinner-row">
              <NbSpinner size="sm" label="Small loader" />
              <NbSpinner label="Medium loader" />
              <NbSpinner size="lg" label="Large loader" />
              <NbSeparator orientation="vertical" />
              <span>Still working</span>
            </div>
          </section>

          <NbEmptyState class="layout-panel--wide" title="No boring screens" description="Empty states can still have some personality.">
            <template #icon>✦</template>
            <NbButton variant="accent">Make something</NbButton>
          </NbEmptyState>
        </div>
      </NbTabsContent>
    </NbTabs>

    <footer class="site-footer">
      <div><h2>Build loud.<br>Ship kind.</h2><p>Start with the kit. Make the rest yours.</p></div>
      <div class="site-footer__links"><a href="/docs/getting-started/">Get started <span aria-hidden="true">↗</span></a><a href="https://www.npmjs.com/package/@neobrut-vue/core">View on npm <span aria-hidden="true">↗</span></a></div>
    </footer>

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
