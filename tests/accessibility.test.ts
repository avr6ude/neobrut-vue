import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { axe } from 'vitest-axe'
import {
  NbAccordion,
  NbAccordionItem,
  NbAlertDialog,
  NbAspectRatio,
  NbAvatar,
  NbButton,
  NbButtonGroup,
  NbBreadcrumbs,
  NbCombobox,
  NbCommand,
  NbContextMenu,
  NbContextMenuItem,
  NbDialog,
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbEmptyState,
  NbFieldset,
  NbHoverCard,
  NbInput,
  NbInputGroup,
  NbKbd,
  NbLink,
  NbMarker,
  NbNavigationMenu,
  NbNumberInput,
  NbPagination,
  NbPopover,
  NbProgress,
  NbRadioGroup,
  NbScrollArea,
  NbSheet,
  NbSlider,
  NbSpinner,
  NbSkeleton,
  NbSwitch,
  NbTable,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbToast,
  NbToggle,
  NbToggleGroup,
  NbToggleGroupItem,
} from '../src'

describe('accessible component states', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('has no axe violations in representative states', async () => {
    const button = mount(NbButton, { slots: { default: 'Save' } })
    const input = mount(NbInput, { props: { label: 'Name', hint: 'Your display name' } })
    const dialog = mount(NbDialog, { props: { open: true, title: 'Confirm action' } })
    const tabs = mount({
      components: { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger },
      template: `
        <NbTabs default-value="one">
          <NbTabsList><NbTabsTrigger value="one">One</NbTabsTrigger></NbTabsList>
          <NbTabsContent value="one">Panel content</NbTabsContent>
        </NbTabs>
      `,
    })
    const radioGroup = mount(NbRadioGroup, {
      props: {
        label: 'Density',
        options: [{ value: 'compact', label: 'Compact' }],
      },
    })
    const switchControl = mount(NbSwitch, {
      props: { label: 'Airplane mode', description: 'Disable all connections' },
    })
    const fieldset = mount(NbFieldset, {
      props: { legend: 'Profile', description: 'Public information' },
      slots: { default: '<input aria-label="Display name">' },
    })
    const inputGroup = mount(NbInputGroup, {
      slots: { start: '@', default: '<input aria-label="Username">' },
    })
    const numberInput = mount(NbNumberInput, {
      props: { modelValue: 3, label: 'Seats', min: 1, max: 8 },
    })
    const slider = mount(NbSlider, {
      props: { modelValue: 60, label: 'Volume' },
    })
    const combobox = mount(NbCombobox, {
      props: {
        label: 'Framework',
        options: [{ value: 'vue', label: 'Vue' }],
      },
    })
    const toggleGroup = mount({
      components: { NbToggleGroup, NbToggleGroupItem },
      template: `
        <NbToggleGroup label="Alignment" model-value="left">
          <NbToggleGroupItem value="left">Left</NbToggleGroupItem>
          <NbToggleGroupItem value="right">Right</NbToggleGroupItem>
        </NbToggleGroup>
      `,
    })

    for (const element of [
      button.element,
      input.element,
      dialog.element,
      tabs.element,
      radioGroup.element,
      switchControl.element,
      fieldset.element,
      inputGroup.element,
      numberInput.element,
      slider.element,
      combobox.element,
      toggleGroup.element,
    ]) {
      const results = await axe(element, {
        rules: {
          // Standalone component roots do not own the application's landmark structure or rendered CSS.
          region: { enabled: false },
          'color-contrast': { enabled: false },
        },
      })
      expect(results.violations).toEqual([])
    }
  })

  it('has no axe violations in open overlay states', async () => {
    mount(NbPopover, {
      attachTo: document.body,
      props: { defaultOpen: true, title: 'Quick actions' },
      slots: { trigger: 'Open actions', default: 'Popover content' },
    })
    mount({
      components: { NbDropdownMenu, NbDropdownMenuItem },
      template: `
        <NbDropdownMenu default-open label="Open actions">
          <template #trigger>Actions</template>
          <NbDropdownMenuItem>Duplicate</NbDropdownMenuItem>
        </NbDropdownMenu>
      `,
    }, { attachTo: document.body })
    mount(NbToast, {
      attachTo: document.body,
      props: { open: true, title: 'Saved', description: 'Your changes are live.' },
    })
    await nextTick()

    const results = await axe(document.body, {
      rules: {
        region: { enabled: false },
        'color-contrast': { enabled: false },
      },
    })
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in data display states', async () => {
    const wrapper = mount({
      components: { NbAccordion, NbAccordionItem, NbAvatar, NbBreadcrumbs, NbPagination, NbProgress, NbSkeleton },
      data: () => ({ crumbs: [{ label: 'Home', href: '/' }, { label: 'Library' }] }),
      template: `
        <div>
          <NbBreadcrumbs :items="crumbs" />
          <NbAvatar name="Ada Lovelace" />
          <NbProgress :value="45" label="Upload progress" />
          <NbSkeleton />
          <NbAccordion default-value="one">
            <NbAccordionItem value="one" title="Details">Content</NbAccordionItem>
          </NbAccordion>
          <NbPagination :total="30" :items-per-page="10" />
        </div>
      `,
    })

    const results = await axe(wrapper.element, {
      rules: {
        region: { enabled: false },
        'color-contrast': { enabled: false },
      },
    })
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in content and layout states', async () => {
    const wrapper = mount({
      components: { NbAspectRatio, NbEmptyState, NbScrollArea, NbSpinner, NbTable },
      template: `
        <div>
          <NbTable caption="Team"><thead><tr><th>Name</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody></NbTable>
          <NbEmptyState title="Nothing here" description="Try another filter." />
          <NbSpinner label="Loading results" />
          <NbAspectRatio :ratio="16 / 9"><div>Preview</div></NbAspectRatio>
          <NbScrollArea label="Release notes"><p>Scrollable content</p></NbScrollArea>
        </div>
      `,
    })

    const results = await axe(wrapper.element, {
      rules: {
        region: { enabled: false },
        'color-contrast': { enabled: false },
      },
    })
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in inline action states', async () => {
    const wrapper = mount({
      components: { NbButton, NbButtonGroup, NbKbd, NbLink, NbMarker, NbToggle },
      template: `
        <div>
          <NbLink href="/docs">Read the docs</NbLink>
          <NbMarker>New</NbMarker>
          <NbKbd>Enter</NbKbd>
          <NbToggle label="Pin project">Pin</NbToggle>
          <NbButtonGroup label="Document actions">
            <NbButton>Save</NbButton>
            <NbButton variant="secondary">Share</NbButton>
          </NbButtonGroup>
        </div>
      `,
    })

    const results = await axe(wrapper.element, {
      rules: {
        region: { enabled: false },
        'color-contrast': { enabled: false },
      },
    })
    expect(results.violations).toEqual([])
  })

  it('has no axe violations in advanced interaction states', async () => {
    const fixtures = [
      () => mount(NbSheet, {
        attachTo: document.body,
        props: { defaultOpen: true, title: 'Edit profile', description: 'Update your public details.' },
        slots: { trigger: 'Open profile', default: 'Profile fields' },
      }),
      () => mount(NbAlertDialog, {
        attachTo: document.body,
        props: { defaultOpen: true, title: 'Delete project?', description: 'This cannot be undone.' },
        slots: { trigger: 'Delete project' },
      }),
      () => mount(NbCommand, {
        attachTo: document.body,
        props: { dialog: true, defaultOpen: true, label: 'Quick actions', options: [{ value: 'new', label: 'New project' }] },
        slots: { trigger: 'Open commands' },
      }),
      () => mount(NbHoverCard, {
        attachTo: document.body,
        props: { defaultOpen: true },
        slots: { trigger: '<a href="/ada">Ada Lovelace</a>', default: 'First computer programmer' },
      }),
      () => mount({
        components: { NbContextMenu, NbContextMenuItem },
        template: '<NbContextMenu default-open><template #trigger><div>Canvas</div></template><NbContextMenuItem>Duplicate</NbContextMenuItem></NbContextMenu>',
      }, { attachTo: document.body }),
      () => mount(NbNavigationMenu, {
        attachTo: document.body,
        props: { label: 'Main navigation', items: [{ label: 'Docs', href: '/docs' }] },
      }),
    ]

    for (const render of fixtures) {
      const wrapper = render()
      await nextTick()
      const results = await axe(document.body, {
        rules: {
          region: { enabled: false },
          'color-contrast': { enabled: false },
        },
      })
      expect(results.violations).toEqual([])
      wrapper.unmount()
      document.body.innerHTML = ''
    }
  })
})
