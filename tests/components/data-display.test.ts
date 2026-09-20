import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  NbAccordion,
  NbAccordionItem,
  NbAvatar,
  NbBreadcrumbs,
  NbPagination,
  NbProgress,
  NbSkeleton,
} from '../../src'

describe('data display and navigation', () => {
  it('expands an accordion item from its trigger', async () => {
    const wrapper = mount({
      components: { NbAccordion, NbAccordionItem },
      template: `
        <NbAccordion>
          <NbAccordionItem value="shipping" title="Shipping">Ships tomorrow.</NbAccordionItem>
        </NbAccordion>
      `,
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.get('button').attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Ships tomorrow.')
  })

  it('marks the final breadcrumb as the current page', () => {
    const wrapper = mount(NbBreadcrumbs, {
      props: {
        items: [
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Pagination' },
        ],
      },
    })

    expect(wrapper.get('nav').attributes('aria-label')).toBe('Breadcrumb')
    expect(wrapper.get('[aria-current="page"]').text()).toBe('Pagination')
  })

  it('emits the next pagination page', async () => {
    const wrapper = mount(NbPagination, {
      props: { page: 1, total: 50, itemsPerPage: 10 },
    })

    await wrapper.get('[aria-label="Go to next page"]').trigger('click')

    expect(wrapper.emitted('update:page')?.[0]).toEqual([2])
  })

  it('shows an accessible avatar fallback', () => {
    const wrapper = mount(NbAvatar, { props: { name: 'Ada Lovelace' } })

    expect(wrapper.get('[role="img"]').attributes('aria-label')).toBe('Ada Lovelace')
    expect(wrapper.text()).toBe('AL')
  })

  it('exposes progress values', () => {
    const wrapper = mount(NbProgress, { props: { value: 35, label: 'Upload progress' } })
    const progress = wrapper.get('[role="progressbar"]')

    expect(progress.attributes('aria-label')).toBe('Upload progress')
    expect(progress.attributes('aria-valuenow')).toBe('35')
  })

  it('keeps decorative skeletons out of the accessibility tree', () => {
    const wrapper = mount(NbSkeleton)

    expect(wrapper.attributes('aria-hidden')).toBe('true')
  })
})
