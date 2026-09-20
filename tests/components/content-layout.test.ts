import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  NbAspectRatio,
  NbEmptyState,
  NbScrollArea,
  NbSeparator,
  NbSpinner,
  NbTable,
} from '../../src'

describe('content and layout', () => {
  it('renders an accessible native table', () => {
    const wrapper = mount(NbTable, {
      props: { caption: 'Team members' },
      slots: {
        default: '<thead><tr><th>Name</th></tr></thead><tbody><tr><td>Ada</td></tr></tbody>',
      },
    })

    expect(wrapper.get('caption').text()).toBe('Team members')
    expect(wrapper.get('th').text()).toBe('Name')
  })

  it('labels an empty state from its title', () => {
    const wrapper = mount(NbEmptyState, {
      props: { title: 'Nothing here', description: 'Try changing the filters.' },
    })
    const region = wrapper.get('[role="region"]')

    expect(region.attributes('aria-labelledby')).toBe(wrapper.get('h2').attributes('id'))
  })

  it('announces a spinner label', () => {
    const wrapper = mount(NbSpinner, { props: { label: 'Saving changes' } })

    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('Saving changes')
  })

  it('exposes a meaningful vertical separator', () => {
    const wrapper = mount(NbSeparator, { props: { orientation: 'vertical', decorative: false } })

    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })

  it('preserves the requested aspect ratio', () => {
    const wrapper = mount(NbAspectRatio, {
      props: { ratio: 16 / 9 },
      slots: { default: '<div>Preview</div>' },
    })

    expect(wrapper.get('[data-reka-aspect-ratio-wrapper]').attributes('style')).toContain('56.25%')
    expect(wrapper.text()).toContain('Preview')
  })

  it('labels the keyboard-scrollable viewport', () => {
    const wrapper = mount(NbScrollArea, {
      props: { label: 'Release notes', height: '12rem' },
      slots: { default: '<p>Lots of content</p>' },
    })
    const viewport = wrapper.get('[data-reka-scroll-area-viewport]')

    expect(viewport.attributes('aria-label')).toBe('Release notes')
    expect(viewport.attributes('tabindex')).toBe('0')
  })
})
