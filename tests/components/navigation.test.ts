import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
} from '../../src'

const components = { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger }

describe('compound tabs', () => {
  it('connects the active trigger and panel', () => {
    const wrapper = mount({
      components,
      template: `
        <NbTabs default-value="one">
          <NbTabsList>
            <NbTabsTrigger value="one">One</NbTabsTrigger>
            <NbTabsTrigger value="two">Two</NbTabsTrigger>
          </NbTabsList>
          <NbTabsContent value="one">First panel</NbTabsContent>
          <NbTabsContent value="two">Second panel</NbTabsContent>
        </NbTabs>
      `,
    })

    const activeTab = wrapper.get('[role="tab"][aria-selected="true"]')
    const activePanel = wrapper.get('[role="tabpanel"]:not([hidden])')

    expect(activeTab.text()).toBe('One')
    expect(activeTab.attributes('aria-controls')).toBe(activePanel.attributes('id'))
    expect(activePanel.attributes('aria-labelledby')).toBe(activeTab.attributes('id'))
    expect(activePanel.text()).toBe('First panel')
  })

  it('moves and activates with horizontal arrow keys while skipping disabled tabs', async () => {
    const wrapper = mount({
      components,
      template: `
        <NbTabs default-value="one">
          <NbTabsList>
            <NbTabsTrigger value="one">One</NbTabsTrigger>
            <NbTabsTrigger value="two" disabled>Two</NbTabsTrigger>
            <NbTabsTrigger value="three">Three</NbTabsTrigger>
          </NbTabsList>
          <NbTabsContent value="one">First</NbTabsContent>
          <NbTabsContent value="three">Third</NbTabsContent>
        </NbTabs>
      `,
    }, { attachTo: document.body })

    await wrapper.get('[role="tab"]').trigger('keydown', { key: 'ArrowRight' })

    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe('Three')
    expect(document.activeElement?.textContent).toBe('Three')
    wrapper.unmount()
  })

  it('uses vertical arrow keys for vertical tabs', async () => {
    const wrapper = mount({
      components,
      template: `
        <NbTabs default-value="one" orientation="vertical">
          <NbTabsList>
            <NbTabsTrigger value="one">One</NbTabsTrigger>
            <NbTabsTrigger value="two">Two</NbTabsTrigger>
          </NbTabsList>
          <NbTabsContent value="one">First</NbTabsContent>
          <NbTabsContent value="two">Second</NbTabsContent>
        </NbTabs>
      `,
    })

    await wrapper.get('[role="tab"]').trigger('keydown', { key: 'ArrowDown' })

    expect(wrapper.get('[role="tab"][aria-selected="true"]').text()).toBe('Two')
    expect(wrapper.get('[role="tablist"]').attributes('aria-orientation')).toBe('vertical')
  })

  it('emits updates when controlled', async () => {
    const wrapper = mount({
      components,
      data: () => ({ value: 'one' }),
      template: `
        <NbTabs :model-value="value" @update:model-value="$emit('change', $event)">
          <NbTabsList><NbTabsTrigger value="two">Two</NbTabsTrigger></NbTabsList>
        </NbTabs>
      `,
    })

    await wrapper.get('[role="tab"]').trigger('click')

    expect(wrapper.emitted('change')).toEqual([['two']])
  })
})
