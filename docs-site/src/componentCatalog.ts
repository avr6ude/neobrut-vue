export interface ComponentPage {
  id: string
  label: string
  description: string
  example: string
  setup?: string
}

export const componentGroups: { label: string; items: ComponentPage[] }[] = [
  { label: 'Actions', items: [
    { id: 'button', label: 'Button', description: 'Colorful actions with loading, size, and disabled states.', example: '<NbButton>Save changes</NbButton>' },
    { id: 'button-group', label: 'Button Group', description: 'Keep related actions together.', example: '<NbButtonGroup label="Document actions">\n  <NbButton>Save</NbButton>\n  <NbButton variant="secondary">Share</NbButton>\n</NbButtonGroup>' },
    { id: 'toggle', label: 'Toggle', description: 'A pressable on/off action.', example: '<NbToggle v-model="pressed" label="Pin item">{{ pressed ? "Pinned" : "Pin item" }}</NbToggle>', setup: 'const pressed = ref(false)' },
    { id: 'toggle-group', label: 'Toggle Group', description: 'Choose one option from a group of toggle buttons.', example: '<NbToggleGroup v-model="align" label="Alignment">\n  <NbToggleGroupItem value="left">Left</NbToggleGroupItem>\n  <NbToggleGroupItem value="center">Center</NbToggleGroupItem>\n</NbToggleGroup>', setup: "const align = ref('left')" },
    { id: 'copy-button', label: 'Copy Button', description: 'Copy text with built-in feedback.', example: '<NbCopyButton text="npm install @neobrut-vue/core" label="Copy install command" />' },
    { id: 'link', label: 'Link', description: 'A styled, semantic link for navigation.', example: '<NbLink href="/docs/">Read the docs</NbLink>' },
    { id: 'kbd', label: 'Kbd', description: 'Display a keyboard shortcut.', example: '<p>Open search <NbKbd>⌘</NbKbd> <NbKbd>K</NbKbd></p>' },
    { id: 'badge', label: 'Badge', description: 'Small labels for status and categories.', example: '<NbBadge tone="secondary">Ready</NbBadge>' },
    { id: 'marker', label: 'Marker', description: 'Highlight a few important words.', example: '<p>Make it <NbMarker tone="primary">stand out</NbMarker>.</p>' },
  ] },
  { label: 'Forms', items: [
    { id: 'input', label: 'Input', description: 'Labeled native inputs with hints and error states.', example: '<NbInput v-model="name" label="Name" placeholder="Ada Lovelace" />', setup: "const name = ref('')" },
    { id: 'input-group', label: 'Input Group', description: 'Attach a prefix or suffix to an input.', example: '<NbInputGroup>\n  <template #start>@</template>\n  <input aria-label="Handle" placeholder="your-handle" />\n  <template #end>.dev</template>\n</NbInputGroup>' },
    { id: 'textarea', label: 'Textarea', description: 'A multiline field with label and feedback.', example: '<NbTextarea v-model="note" label="Note" placeholder="Tell us more" />', setup: "const note = ref('')" },
    { id: 'select', label: 'Select', description: 'A styled listbox for choosing an option.', example: '<NbSelect v-model="choice" label="Color"><NbSelectItem value="blue">Blue</NbSelectItem></NbSelect>', setup: "const choice = ref('blue')" },
    { id: 'checkbox', label: 'Checkbox', description: 'A native checkbox with a visible label.', example: '<NbCheckbox v-model="accepted" label="I agree" />', setup: 'const accepted = ref(false)' },
    { id: 'switch', label: 'Switch', description: 'A binary setting with keyboard support.', example: '<NbSwitch v-model="enabled" label="Notifications" />', setup: 'const enabled = ref(false)' },
    { id: 'radio-group', label: 'Radio Group', description: 'One choice from a set of radio cards.', example: '<NbRadioGroup v-model="plan" label="Plan" :options="[{ label: \u0027Starter\u0027, value: \u0027starter\u0027 }, { label: \u0027Pro\u0027, value: \u0027pro\u0027 }]" />', setup: "const plan = ref('starter')" },
    { id: 'combobox', label: 'Combobox', description: 'Filter and select from a searchable list.', example: '<NbCombobox v-model="framework" label="Framework" :options="[{ label: \u0027Vue\u0027, value: \u0027vue\u0027 }, { label: \u0027React\u0027, value: \u0027react\u0027 }]" />', setup: "const framework = ref('')" },
    { id: 'number-input', label: 'Number Input', description: 'A number field with step controls.', example: '<NbNumberInput v-model="count" label="Seats" :min="1" :max="12" />', setup: 'const count = ref(2)' },
    { id: 'pin-input', label: 'Pin Input', description: 'An accessible segmented verification code.', example: '<NbPinInput v-model="code" label="Verification code" :length="6" otp />', setup: "const code = ref('')" },
    { id: 'tags-input', label: 'Tags Input', description: 'Create and remove tags with the keyboard.', example: '<NbTagsInput v-model="tags" label="Skills" placeholder="Add a skill" />', setup: "const tags = ref(['Vue'])" },
    { id: 'slider', label: 'Slider', description: 'Choose a numeric value by pointer or keyboard.', example: '<NbSlider v-model="volume" label="Volume" :step="5" />', setup: 'const volume = ref(45)' },
    { id: 'rating', label: 'Rating', description: 'A keyboard-accessible star rating.', example: '<NbRating v-model="score" label="Your rating" />', setup: 'const score = ref(3)' },
    { id: 'fieldset', label: 'Fieldset', description: 'Group related form controls under a legend.', example: '<NbFieldset legend="Contact" description="How can we reach you?">\n  <NbInput label="Email" type="email" placeholder="you@example.com" />\n</NbFieldset>' },
  ] },
  { label: 'Overlays', items: [
    { id: 'dialog', label: 'Dialog', description: 'An accessible modal for focused tasks.', example: '<NbDialog v-model:open="open" title="Edit project">Content</NbDialog>', setup: 'const open = ref(false)' },
    { id: 'alert-dialog', label: 'Alert Dialog', description: 'Ask for confirmation before a consequential action.', example: '<NbAlertDialog title="Delete item?" description="This cannot be undone." action-label="Delete" destructive>\n  <template #trigger>Delete item</template>\n</NbAlertDialog>' },
    { id: 'sheet', label: 'Sheet', description: 'Slide in a panel without losing page context.', example: '<NbSheet title="Edit project" description="Make a quick change.">\n  <template #trigger>Open sheet</template>\n  <NbInput label="Project name" />\n</NbSheet>' },
    { id: 'popover', label: 'Popover', description: 'Compact interactive content near its trigger.', example: '<NbPopover title="Quick note">\n  <template #trigger>Open popover</template>\n  <p>Extra context goes here.</p>\n</NbPopover>' },
    { id: 'hover-card', label: 'Hover Card', description: 'Extra detail on hover or focus.', example: '<NbHoverCard><template #trigger><NbLink href="#person">Ada Lovelace</NbLink></template>Mathematician and writer.</NbHoverCard>' },
    { id: 'tooltip', label: 'Tooltip', description: 'A short hint for pointer and keyboard users.', example: '<NbTooltip content="Keyboard focus reveals this too."><NbButton>Hover me</NbButton></NbTooltip>' },
    { id: 'dropdown-menu', label: 'Dropdown Menu', description: 'A keyboard-driven menu of actions.', example: '<NbDropdownMenu label="Project actions">\n  <template #trigger>Project actions</template>\n  <NbDropdownMenuItem>Duplicate</NbDropdownMenuItem>\n  <NbDropdownMenuSeparator />\n  <NbDropdownMenuItem destructive>Delete</NbDropdownMenuItem>\n</NbDropdownMenu>' },
    { id: 'context-menu', label: 'Context Menu', description: 'Actions available by right-click or keyboard.', example: '<NbContextMenu>\n  <template #trigger><div tabindex="0">Right-click here</div></template>\n  <NbContextMenuLabel>Canvas</NbContextMenuLabel>\n  <NbContextMenuItem>Duplicate</NbContextMenuItem>\n</NbContextMenu>' },
    { id: 'command', label: 'Command', description: 'Search and run actions from one compact list.', example: '<NbCommand v-model="action" label="Actions" :options="[{ label: \u0027Publish\u0027, value: \u0027publish\u0027 }, { label: \u0027Preview\u0027, value: \u0027preview\u0027 }]" />', setup: "const action = ref('')" },
    { id: 'toast', label: 'Toast', description: 'Announce a short-lived result without blocking.', example: '<NbButton @click="open = true">Show toast</NbButton>\n<NbToast v-model:open="open" tone="success" title="Saved!" description="Your changes are ready." />', setup: 'const open = ref(false)' },
  ] },
  { label: 'Display', items: [
    { id: 'alert', label: 'Alert', description: 'An inline message with tone and optional dismissal.', example: '<NbAlert tone="success" title="All set" dismissible>Your changes are saved.</NbAlert>' },
    { id: 'avatar', label: 'Avatar', description: 'A person image or name-based fallback.', example: '<NbAvatar name="Ada Lovelace" size="lg" />' },
    { id: 'card', label: 'Card', description: 'A bold surface for grouped content.', example: '<NbCard tone="primary"><h3>Ship it</h3><p>Strong surfaces, clear content.</p></NbCard>' },
    { id: 'empty-state', label: 'Empty State', description: 'A useful starting point when there is no data.', example: '<NbEmptyState title="Nothing here yet" description="Create your first item."><template #icon>✦</template><NbButton>Create item</NbButton></NbEmptyState>' },
    { id: 'skeleton', label: 'Skeleton', description: 'A placeholder while content is loading.', example: '<NbSkeleton width="70%" /><NbSkeleton width="100%" height="0.75rem" />' },
    { id: 'spinner', label: 'Spinner', description: 'Show an indeterminate loading state.', example: '<NbSpinner label="Loading" />' },
    { id: 'progress', label: 'Progress', description: 'Show how far a task has advanced.', example: '<NbProgress :value="72" label="Package build" show-value />' },
    { id: 'meter', label: 'Meter', description: 'Show a measurement within a known range.', example: '<NbMeter :value="72" label="Storage used" show-value />' },
    { id: 'table', label: 'Table', description: 'Present tabular data with strong borders.', example: '<NbTable caption="Component readiness"><thead><tr><th scope="col">Name</th><th scope="col">State</th></tr></thead><tbody><tr><td>Button</td><td>Ready</td></tr></tbody></NbTable>' },
    { id: 'timeline', label: 'Timeline', description: 'A sequence of dated events.', example: '<NbTimeline label="Release history"><NbTimelineItem title="Version 0.5" date="Oct 1">More components.</NbTimelineItem></NbTimeline>' },
    { id: 'stepper', label: 'Stepper', description: 'Show progress through a numbered workflow.', example: '<NbStepper v-model="step" label="Release workflow"><NbStepperItem :step="1" title="Build" /><NbStepperItem :step="2" title="Publish" /></NbStepper>', setup: 'const step = ref(1)' },
  ] },
  { label: 'Navigation & layout', items: [
    { id: 'accordion', label: 'Accordion', description: 'Expandable sections with keyboard navigation.', example: '<NbAccordion><NbAccordionItem value="one" title="Question">Answer</NbAccordionItem></NbAccordion>' },
    { id: 'collapsible', label: 'Collapsible', description: 'Reveal one section on demand.', example: '<NbCollapsible title="More details">Here are the details.</NbCollapsible>' },
    { id: 'tabs', label: 'Tabs', description: 'Switch between related panels.', example: '<NbTabs><NbTabsList><NbTabsTrigger value="one">One</NbTabsTrigger></NbTabsList><NbTabsContent value="one">Panel</NbTabsContent></NbTabs>' },
    { id: 'breadcrumbs', label: 'Breadcrumbs', description: 'Show the current page in a hierarchy.', example: '<NbBreadcrumbs :items="[{ label: \u0027Home\u0027, href: \u0027/\u0027 }, { label: \u0027Components\u0027 }]" />' },
    { id: 'navigation-menu', label: 'Navigation Menu', description: 'A structured menu for site navigation.', example: '<NbNavigationMenu label="Site" :items="[{ label: \u0027Docs\u0027, href: \u0027/docs/\u0027 }]" />' },
    { id: 'pagination', label: 'Pagination', description: 'Navigate a long list one page at a time.', example: '<NbPagination v-model:page="page" :total="120" :items-per-page="10" />', setup: 'const page = ref(1)' },
    { id: 'scroll-area', label: 'Scroll Area', description: 'A bounded, accessible region for overflow.', example: '<NbScrollArea label="Updates" height="8rem" type="always"><p>First update</p><p>Second update</p><p>Third update</p></NbScrollArea>' },
    { id: 'aspect-ratio', label: 'Aspect Ratio', description: 'Keep media at a consistent proportion.', example: '<NbAspectRatio :ratio="16 / 9"><div style="height:100%;background:#648ff5;display:grid;place-items:center">16:9</div></NbAspectRatio>' },
    { id: 'separator', label: 'Separator', description: 'Divide related sections of content.', example: '<p>Before</p><NbSeparator /><p>After</p>' },
  ] },
]

export const components = componentGroups.flatMap(group => group.items)

export function componentSource(component: ComponentPage) {
  const names = [...new Set(component.example.match(/\bNb[A-Z][A-Za-z]+/g) ?? [])].sort()
  const script = `<script setup>\n${component.setup ? "import { ref } from 'vue'\n" : ''}import { ${names.join(', ')} } from '@neobrut-vue/core'\n${component.setup ? `\n${component.setup}\n` : ''}</script>`
  return `${script}\n\n<template>\n${component.example.split('\n').map(line => `  ${line}`).join('\n')}\n</template>`
}
