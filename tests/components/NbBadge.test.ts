import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbBadge } from '../../src'

describe('NbBadge', () => {
  it('renders a compact semantic label', () => {
    const wrapper = mount(NbBadge, { props: { tone: 'accent' }, slots: { default: 'New' } })

    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes()).toContain('nb-badge--accent')
  })
})
