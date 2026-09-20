import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import {
  NbAlert,
  NbDialog,
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbPopover,
  NbToast,
  NbTooltip,
} from '../../src'

describe('overlay primitives', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

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

  it('opens a labelled popover from its trigger', async () => {
    const wrapper = mount(NbPopover, {
      props: { title: 'Quick actions' },
      slots: { trigger: 'Open actions', default: 'Popover content' },
      attachTo: document.body,
    })

    await wrapper.get('button').trigger('click')

    expect(document.body.querySelector('[role="dialog"]')?.textContent).toContain('Popover content')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
  })

  it('selects a dropdown menu item', async () => {
    const wrapper = mount({
      components: { NbDropdownMenu, NbDropdownMenuItem },
      template: `
        <NbDropdownMenu label="Open menu">
          <template #trigger>Actions</template>
          <NbDropdownMenuItem @select="$emit('picked')">Duplicate</NbDropdownMenuItem>
        </NbDropdownMenu>
      `,
    }, { attachTo: document.body })

    await wrapper.get('button').trigger('click')
    const item = document.body.querySelector<HTMLElement>('[role="menuitem"]')
    item?.click()

    expect(wrapper.emitted('picked')).toBeTruthy()
  })

  it('announces and dismisses a toast', async () => {
    const wrapper = mount(NbToast, {
      props: { open: true, title: 'Saved', description: 'Your changes are live.' },
      attachTo: document.body,
    })
    await nextTick()

    expect(document.body.querySelector('[role="status"]')?.textContent).toContain('Your changes are live.')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })
})
