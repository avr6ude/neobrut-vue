import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import * as core from '../../src'

describe('advanced overlay primitives', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('opens and closes a labelled sheet from its trigger', async () => {
    expect(core.NbSheet).toBeTruthy()

    const wrapper = mount(core.NbSheet, {
      attachTo: document.body,
      props: { title: 'Edit profile', side: 'right' },
      slots: {
        trigger: 'Open profile',
        default: 'Profile fields',
      },
    })

    await wrapper.get('button').trigger('click')

    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')
    expect(dialog?.textContent).toContain('Edit profile')
    expect(dialog?.classList.contains('nb-sheet--right')).toBe(true)

    document.body.querySelector<HTMLButtonElement>('[aria-label="Close sheet"]')?.click()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('requires an explicit decision in an alert dialog', async () => {
    expect(core.NbAlertDialog).toBeTruthy()

    const wrapper = mount(core.NbAlertDialog, {
      attachTo: document.body,
      props: {
        title: 'Delete project?',
        description: 'This cannot be undone.',
        actionLabel: 'Delete',
      },
      slots: { trigger: 'Delete project' },
    })

    await wrapper.get('button').trigger('click')

    const dialog = document.body.querySelector<HTMLElement>('[role="alertdialog"]')
    expect(dialog?.textContent).toContain('This cannot be undone.')

    const action = Array.from(dialog?.querySelectorAll('button') ?? [])
      .find(button => button.textContent === 'Delete')
    action?.click()

    expect(wrapper.emitted('action')).toHaveLength(1)
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('opens a context menu and selects its actions', async () => {
    expect(core.NbContextMenu).toBeTruthy()
    expect(core.NbContextMenuItem).toBeTruthy()
    expect(core.NbContextMenuCheckboxItem).toBeTruthy()

    const wrapper = mount({
      components: {
        NbContextMenu: core.NbContextMenu,
        NbContextMenuCheckboxItem: core.NbContextMenuCheckboxItem,
        NbContextMenuItem: core.NbContextMenuItem,
      },
      data: () => ({ grid: false }),
      template: `
        <NbContextMenu>
          <template #trigger><div data-trigger>Canvas</div></template>
          <NbContextMenuItem @select="$emit('duplicate')">Duplicate</NbContextMenuItem>
          <NbContextMenuCheckboxItem v-model="grid">Show grid</NbContextMenuCheckboxItem>
        </NbContextMenu>
      `,
    }, { attachTo: document.body })

    await wrapper.get('[data-trigger]').trigger('contextmenu')

    const items = document.body.querySelectorAll<HTMLElement>('[role^="menuitem"]')
    expect(items).toHaveLength(2)
    items[0]?.click()
    expect(wrapper.emitted('duplicate')).toHaveLength(1)
  })

  it('preserves link semantics while showing a hover card', async () => {
    expect(core.NbHoverCard).toBeTruthy()

    const wrapper = mount(core.NbHoverCard, {
      attachTo: document.body,
      props: { defaultOpen: true },
      slots: {
        trigger: '<a href="/ada">Ada Lovelace</a>',
        default: 'First computer programmer',
      },
    })
    await nextTick()

    expect(wrapper.get('a').attributes('href')).toBe('/ada')
    expect(document.body.querySelector('.nb-hover-card')?.textContent).toContain('First computer programmer')
  })
})
