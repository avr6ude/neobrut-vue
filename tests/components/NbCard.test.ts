import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbCard } from '../../src'

describe('NbCard', () => {
  it('renders content and tone classes', () => {
    const wrapper = mount(NbCard, { props: { tone: 'secondary' }, slots: { default: 'Hello' } })

    expect(wrapper.element.tagName).toBe('ARTICLE')
    expect(wrapper.text()).toBe('Hello')
    expect(wrapper.classes()).toContain('nb-card--secondary')
  })
})
