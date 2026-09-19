import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import { NbButton, NbDialog, NbInput, NbTabs } from '../src'

describe('accessible component states', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('has no axe violations in representative states', async () => {
    const button = mount(NbButton, { slots: { default: 'Save' } })
    const input = mount(NbInput, { props: { label: 'Name', hint: 'Your display name' } })
    const dialog = mount(NbDialog, { props: { open: true, title: 'Confirm action' } })
    const tabs = mount(NbTabs, {
      props: { tabs: [{ value: 'one', label: 'One' }], modelValue: 'one' },
      slots: { 'panel-one': 'Panel content' },
    })

    for (const element of [button.element, input.element, dialog.element, tabs.element]) {
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
