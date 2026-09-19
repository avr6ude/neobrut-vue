import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import {
  NbButton,
  NbDialog,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbRadioGroup,
  NbSwitch,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
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

    for (const element of [
      button.element,
      input.element,
      dialog.element,
      tabs.element,
      radioGroup.element,
      switchControl.element,
      fieldset.element,
      inputGroup.element,
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
})
