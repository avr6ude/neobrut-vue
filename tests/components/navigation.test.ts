import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbTabs } from '../../src'

describe('NbTabs', () => {
  const tabs = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' },
  ]

  it('renders the active tab relationship', () => {
    const wrapper = mount(NbTabs, {
      props: { tabs, modelValue: 'one' },
      slots: { 'panel-one': 'First panel' },
    })

    expect(wrapper.get('[role="tab"]').attributes('aria-selected')).toBe('true')
    expect(wrapper.get('[role="tabpanel"]').text()).toBe('First panel')
  })

  it('moves tabs with ArrowRight', async () => {
    const wrapper = mount(NbTabs, { props: { tabs, modelValue: 'one' } })

    await wrapper.get('[role="tab"]').trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.emitted('update:modelValue')).toEqual([['two']])
  })
})
