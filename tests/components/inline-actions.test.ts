import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  NbButton,
  NbButtonGroup,
  NbKbd,
  NbLink,
  NbMarker,
  NbToggle,
} from '../../src'

describe('inline and action primitives', () => {
  it('renders a styled native link and forwards anchor attributes', () => {
    const wrapper = mount(NbLink, {
      props: { tone: 'accent' },
      attrs: { href: '/docs', target: '_blank', rel: 'noreferrer' },
      slots: { default: 'Read the docs' },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/docs')
    expect(wrapper.attributes('target')).toBe('_blank')
    expect(wrapper.classes()).toContain('nb-link--accent')
  })

  it('labels and orients a button group', () => {
    const wrapper = mount({
      components: { NbButton, NbButtonGroup },
      template: `
        <NbButtonGroup label="Editor actions" orientation="vertical">
          <NbButton>Save</NbButton>
          <NbButton variant="secondary">Share</NbButton>
        </NbButtonGroup>
      `,
    })
    const group = wrapper.get('[role="group"]')

    expect(group.attributes('aria-label')).toBe('Editor actions')
    expect(group.attributes('data-orientation')).toBe('vertical')
    expect(group.findAll('button')).toHaveLength(2)
  })

  it('exposes pressed state and updates a toggle', async () => {
    const wrapper = mount(NbToggle, {
      props: { modelValue: false, label: 'Pin project' },
      slots: { default: 'Pin' },
    })
    const toggle = wrapper.get('button')

    expect(toggle.attributes('aria-pressed')).toBe('false')
    expect(toggle.attributes('aria-label')).toBe('Pin project')
    await toggle.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('uses native inline semantics for keyboard hints and highlights', () => {
    const keyboard = mount(NbKbd, { slots: { default: '⌘ K' } })
    const marker = mount(NbMarker, { slots: { default: 'New' } })

    expect(keyboard.element.tagName).toBe('KBD')
    expect(marker.element.tagName).toBe('MARK')
  })
})
