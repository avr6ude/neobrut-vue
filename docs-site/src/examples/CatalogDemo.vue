<script setup lang="ts">
import { ref } from 'vue'
import {
  NbAlert, NbAlertDialog, NbAspectRatio, NbAvatar, NbBadge, NbBreadcrumbs,
  NbButton, NbButtonGroup, NbCarousel, NbCarouselSlide, NbCard, NbCheckbox, NbCollapsible, NbCombobox,
  NbCommand, NbContextMenu, NbContextMenuItem, NbContextMenuLabel,
  NbCopyButton, NbDrawer, NbDropdownMenu, NbDropdownMenuItem, NbDropdownMenuSeparator,
  NbEmptyState, NbField, NbFieldset, NbHoverCard, NbInput, NbInputGroup, NbKbd,
  NbLabel, NbLink, NbMarker, NbMenubar, NbMenubarItem, NbMenubarMenu, NbMenubarSeparator,
  NbMeter, NbNativeSelect, NbNavigationMenu, NbNumberInput, NbPagination,
  NbPinInput, NbPopover, NbProgress, NbRadioGroup, NbRating, NbScrollArea,
  NbSeparator, NbSheet, NbSkeleton, NbSlider, NbSpinner, NbStepper,
  NbStepperItem, NbTable, NbTagsInput, NbTextarea, NbTimeline, NbTimelineItem,
  NbToast, NbToggle, NbToggleGroup, NbToggleGroupItem, NbTooltip,
} from '@neobrut-vue/core'

defineProps<{ kind: string }>()
const pressed = ref(false)
const align = ref('left')
const accepted = ref(false)
const note = ref('')
const plan = ref('starter')
const framework = ref('')
const count = ref(2)
const code = ref('')
const tags = ref(['Vue'])
const volume = ref(45)
const score = ref(3)
const action = ref('')
const toastOpen = ref(false)
const step = ref(1)
const page = ref(1)
const fruit = ref('apple')
</script>

<template>
  <div class="catalog-demo">
    <NbButtonGroup v-if="kind === 'button-group'" label="Document actions"><NbButton>Save</NbButton><NbButton variant="secondary">Share</NbButton></NbButtonGroup>
    <NbToggle v-else-if="kind === 'toggle'" v-model="pressed" label="Pin item">{{ pressed ? 'Pinned' : 'Pin item' }}</NbToggle>
    <NbToggleGroup v-else-if="kind === 'toggle-group'" v-model="align" label="Alignment"><NbToggleGroupItem value="left">Left</NbToggleGroupItem><NbToggleGroupItem value="center">Center</NbToggleGroupItem></NbToggleGroup>
    <NbCopyButton v-else-if="kind === 'copy-button'" text="npm install @neobrut-vue/core" label="Copy install command" />
    <NbLink v-else-if="kind === 'link'" href="/docs/">Read the docs</NbLink>
    <p v-else-if="kind === 'kbd'">Open search <NbKbd>⌘</NbKbd> <NbKbd>K</NbKbd></p>
    <NbBadge v-else-if="kind === 'badge'" tone="secondary">Ready</NbBadge>
    <p v-else-if="kind === 'marker'">Make it <NbMarker tone="primary">stand out</NbMarker>.</p>

    <NbInputGroup v-else-if="kind === 'input-group'"><template #start>@</template><input aria-label="Handle" placeholder="your-handle"><template #end>.dev</template></NbInputGroup>
    <template v-else-if="kind === 'label'"><NbLabel for="demo-handle">Handle</NbLabel><input id="demo-handle" class="nb-field__control" placeholder="your-handle"></template>
    <NbField v-else-if="kind === 'field'" label="Handle" hint="Letters and numbers only" v-slot="{ inputId, describedBy, invalid }"><NbInputGroup><template #start>@</template><input :id="inputId" :aria-describedby="describedBy" :aria-invalid="invalid || undefined" placeholder="your-handle"></NbInputGroup></NbField>
    <NbTextarea v-else-if="kind === 'textarea'" v-model="note" label="Note" placeholder="Tell us more" />
    <NbCheckbox v-else-if="kind === 'checkbox'" v-model="accepted" label="I agree" />
    <NbNativeSelect v-else-if="kind === 'native-select'" v-model="fruit" label="Favorite fruit" hint="Use arrow keys to choose"><option value="apple">Apple</option><option value="pear">Pear</option></NbNativeSelect>
    <NbRadioGroup v-else-if="kind === 'radio-group'" v-model="plan" label="Plan" :options="[{ label: 'Starter', value: 'starter' }, { label: 'Pro', value: 'pro' }]" />
    <NbCombobox v-else-if="kind === 'combobox'" v-model="framework" label="Framework" :options="[{ label: 'Vue', value: 'vue' }, { label: 'React', value: 'react' }]" />
    <NbNumberInput v-else-if="kind === 'number-input'" v-model="count" label="Seats" :min="1" :max="12" />
    <NbPinInput v-else-if="kind === 'pin-input'" v-model="code" label="Verification code" :length="6" otp />
    <NbTagsInput v-else-if="kind === 'tags-input'" v-model="tags" label="Skills" placeholder="Add a skill" />
    <NbSlider v-else-if="kind === 'slider'" v-model="volume" label="Volume" :step="5" />
    <NbRating v-else-if="kind === 'rating'" v-model="score" label="Your rating" />
    <NbFieldset v-else-if="kind === 'fieldset'" legend="Contact" description="How can we reach you?"><NbInput label="Email" type="email" placeholder="you@example.com" /></NbFieldset>

    <NbAlertDialog v-else-if="kind === 'alert-dialog'" title="Delete item?" description="This cannot be undone." action-label="Delete" destructive><template #trigger>Delete item</template></NbAlertDialog>
    <NbSheet v-else-if="kind === 'sheet'" title="Edit project" description="Make a quick change."><template #trigger>Open sheet</template><NbInput label="Project name" /></NbSheet>
    <NbDrawer v-else-if="kind === 'drawer'" title="Quick edit" description="Swipe down or press Escape to close."><template #trigger>Open drawer</template><NbInput label="Project name" /></NbDrawer>
    <NbPopover v-else-if="kind === 'popover'" title="Quick note"><template #trigger>Open popover</template><p>Extra context goes here.</p></NbPopover>
    <NbHoverCard v-else-if="kind === 'hover-card'"><template #trigger><NbLink href="#person">Ada Lovelace</NbLink></template>Mathematician and writer.</NbHoverCard>
    <NbTooltip v-else-if="kind === 'tooltip'" content="Keyboard focus reveals this too."><NbButton>Hover me</NbButton></NbTooltip>
    <NbDropdownMenu v-else-if="kind === 'dropdown-menu'" label="Project actions"><template #trigger>Project actions</template><NbDropdownMenuItem>Duplicate</NbDropdownMenuItem><NbDropdownMenuSeparator /><NbDropdownMenuItem destructive>Delete</NbDropdownMenuItem></NbDropdownMenu>
    <NbMenubar v-else-if="kind === 'menubar'" label="Editor actions"><NbMenubarMenu label="File"><NbMenubarItem>New file</NbMenubarItem><NbMenubarSeparator /><NbMenubarItem>Export</NbMenubarItem></NbMenubarMenu><NbMenubarMenu label="Edit"><NbMenubarItem>Duplicate</NbMenubarItem></NbMenubarMenu></NbMenubar>
    <NbContextMenu v-else-if="kind === 'context-menu'"><template #trigger><div class="catalog-demo__context" tabindex="0">Right-click here</div></template><NbContextMenuLabel>Canvas</NbContextMenuLabel><NbContextMenuItem>Duplicate</NbContextMenuItem></NbContextMenu>
    <NbCommand v-else-if="kind === 'command'" v-model="action" label="Actions" :options="[{ label: 'Publish', value: 'publish' }, { label: 'Preview', value: 'preview' }]" />
    <template v-else-if="kind === 'toast'"><NbButton @click="toastOpen = true">Show toast</NbButton><NbToast v-model:open="toastOpen" tone="success" title="Saved!" description="Your changes are ready." /></template>

    <NbAlert v-else-if="kind === 'alert'" tone="success" title="All set" dismissible>Your changes are saved.</NbAlert>
    <NbAvatar v-else-if="kind === 'avatar'" name="Ada Lovelace" size="lg" />
    <NbCard v-else-if="kind === 'card'" tone="primary"><h3>Ship it</h3><p>Strong surfaces, clear content.</p></NbCard>
    <NbCarousel v-else-if="kind === 'carousel'" label="Color samples"><NbCarouselSlide label="Yellow sample"><h3>Electric yellow</h3><p>Start loud.</p></NbCarouselSlide><NbCarouselSlide label="Mint sample"><h3>Fresh mint</h3><p>Keep moving.</p></NbCarouselSlide></NbCarousel>
    <NbEmptyState v-else-if="kind === 'empty-state'" title="Nothing here yet" description="Create your first item."><template #icon>✦</template><NbButton>Create item</NbButton></NbEmptyState>
    <template v-else-if="kind === 'skeleton'"><NbSkeleton width="70%" /><NbSkeleton width="100%" height="0.75rem" /></template>
    <NbSpinner v-else-if="kind === 'spinner'" label="Loading" />
    <NbProgress v-else-if="kind === 'progress'" :value="72" label="Package build" show-value />
    <NbMeter v-else-if="kind === 'meter'" :value="72" label="Storage used" show-value />
    <NbTable v-else-if="kind === 'table'" caption="Component readiness"><thead><tr><th scope="col">Name</th><th scope="col">State</th></tr></thead><tbody><tr><td>Button</td><td>Ready</td></tr></tbody></NbTable>
    <NbTimeline v-else-if="kind === 'timeline'" label="Release history"><NbTimelineItem title="Version 0.5" date="Oct 1">More components.</NbTimelineItem></NbTimeline>
    <NbStepper v-else-if="kind === 'stepper'" v-model="step" label="Release workflow"><NbStepperItem :step="1" title="Build" /><NbStepperItem :step="2" title="Publish" /></NbStepper>

    <NbCollapsible v-else-if="kind === 'collapsible'" title="More details">Here are the details.</NbCollapsible>
    <NbBreadcrumbs v-else-if="kind === 'breadcrumbs'" :items="[{ label: 'Home', href: '/' }, { label: 'Components' }]" />
    <NbNavigationMenu v-else-if="kind === 'navigation-menu'" label="Site" :items="[{ label: 'Docs', href: '/docs/' }]" />
    <NbPagination v-else-if="kind === 'pagination'" v-model:page="page" :total="120" :items-per-page="10" />
    <NbScrollArea v-else-if="kind === 'scroll-area'" label="Updates" height="8rem" type="always"><p>First update</p><p>Second update</p><p>Third update</p></NbScrollArea>
    <NbAspectRatio v-else-if="kind === 'aspect-ratio'" :ratio="16 / 9"><div class="catalog-demo__ratio">16:9</div></NbAspectRatio>
    <template v-else-if="kind === 'separator'"><p>Before</p><NbSeparator /><p>After</p></template>
  </div>
</template>

<style scoped>
.catalog-demo { width: min(100%, 32rem); }
.catalog-demo > * + * { margin-top: .75rem; }
.catalog-demo__context { border: 2px solid #151515; padding: 1.5rem; background: #ffe443; font-weight: 800; text-align: center; }
.catalog-demo__ratio { display: grid; height: 100%; place-items: center; background: #648ff5; font-weight: 900; }
</style>
