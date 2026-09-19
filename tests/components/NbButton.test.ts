import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbButton } from '../../src'

describe('NbButton', () => {
  it('renders its label and variant class', () => {
    const wrapper = mount(NbButton, { props: { variant: 'accent' }, slots: { default: 'Launch' } })

    expect(wrapper.text()).toBe('Launch')
    expect(wrapper.classes()).toContain('nb-button--accent')
  })

  it('sets aria-busy while loading and disables interaction', () => {
    const wrapper = mount(NbButton, { props: { loading: true }, slots: { default: 'Save' } })

    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
