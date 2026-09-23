import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import * as core from '../../src'

describe('command and navigation primitives', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('filters and selects command actions', async () => {
    expect(core.NbCommand).toBeTruthy()

    const deploy = { value: 'deploy', label: 'Deploy project', group: 'Project', shortcut: '⌘D' }
    const wrapper = mount(core.NbCommand, {
      props: {
        options: [
          deploy,
          { value: 'settings', label: 'Open settings', group: 'Account' },
        ],
      },
      attachTo: document.body,
    })

    await wrapper.get('input').setValue('deploy')
    await nextTick()

    expect(wrapper.text()).toContain('Deploy project')
    expect(wrapper.text()).not.toContain('Open settings')

    await wrapper.get('[data-value="deploy"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['deploy'])
    expect(wrapper.emitted('select')?.at(-1)).toEqual([deploy])
  })

  it('can present the command menu as a labelled dialog', async () => {
    expect(core.NbCommand).toBeTruthy()

    mount(core.NbCommand, {
      props: {
        dialog: true,
        defaultOpen: true,
        label: 'Quick actions',
        options: [{ value: 'new', label: 'New project' }],
      },
      slots: { trigger: 'Open commands' },
      attachTo: document.body,
    })
    await nextTick()

    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')
    expect(dialog?.getAttribute('aria-labelledby')).toBeTruthy()
    expect(dialog?.textContent).toContain('New project')
  })

  it('renders labelled navigation and reveals grouped links', async () => {
    expect(core.NbNavigationMenu).toBeTruthy()

    const wrapper = mount(core.NbNavigationMenu, {
      props: {
        label: 'Main navigation',
        items: [
          { label: 'Docs', href: '/docs' },
          {
            label: 'Components',
            children: [
              { label: 'Button', href: '/components/button', description: 'Actions and controls' },
              { label: 'Dialog', href: '/components/dialog' },
            ],
          },
        ],
      },
      attachTo: document.body,
    })

    expect(wrapper.get('nav').attributes('aria-label')).toBe('Main navigation')
    expect(wrapper.get('a[href="/docs"]').text()).toBe('Docs')

    await wrapper.get('button').trigger('click')
    await nextTick()

    expect(wrapper.get('a[href="/components/button"]').text()).toContain('Actions and controls')
  })
})
