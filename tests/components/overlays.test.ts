import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbAlert, NbDialog, NbTooltip } from '../../src'

describe('overlay primitives', () => {
  it('renders a labelled modal dialog', () => {
    const wrapper = mount(NbDialog, { props: { open: true, title: 'Confirm' } })
    const dialog = wrapper.get('[role="dialog"]')

    expect(dialog.attributes('aria-modal')).toBe('true')
    expect(dialog.attributes('aria-labelledby')).toBeTruthy()
  })

  it('renders dismissible alert semantics', async () => {
    const wrapper = mount(NbAlert, { props: { title: 'Saved', dismissible: true }, slots: { default: 'Done' } })

    expect(wrapper.get('[role="alert"]').text()).toContain('Done')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('describes a focusable tooltip trigger', () => {
    const wrapper = mount(NbTooltip, { props: { content: 'More info' }, slots: { default: 'Help' } })

    expect(wrapper.get('.nb-tooltip__trigger').attributes('aria-describedby')).toBeTruthy()
    expect(wrapper.get('[role="tooltip"]').text()).toBe('More info')
  })
})
