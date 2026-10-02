import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import {
  NbCarousel, NbCarouselSlide, NbDrawer, NbField, NbInputGroup, NbLabel,
  NbMenubar, NbMenubarItem, NbMenubarMenu, NbNativeSelect,
} from '../../src'

afterEach(() => { document.body.innerHTML = '' })

describe('0.6 components', () => {
  it('connects a standalone label and a composable field to their controls', () => {
    const wrapper = mount({
      components: { NbField, NbInputGroup, NbLabel },
      template: `
        <div>
          <NbLabel for="direct">Direct label</NbLabel><input id="direct" />
          <NbField label="Handle" hint="Letters only" error="Already taken" v-slot="{ inputId, describedBy, invalid }">
            <NbInputGroup><input :id="inputId" :aria-describedby="describedBy" :aria-invalid="invalid" /></NbInputGroup>
          </NbField>
        </div>
      `,
    })

    expect(wrapper.get('label[for="direct"]').text()).toBe('Direct label')
    const field = wrapper.get('.nb-field')
    const input = field.get('input')
    expect(field.get('label').attributes('for')).toBe(input.attributes('id'))
    expect(input.attributes('aria-describedby')?.split(' ')).toEqual([
      field.get('.nb-field__hint').attributes('id'), field.get('.nb-field__error').attributes('id'),
    ])
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('keeps native select value, label, and validation semantics', async () => {
    const wrapper = mount(NbNativeSelect, {
      props: { modelValue: 'apple', label: 'Fruit', hint: 'Choose one', error: 'Required', required: true },
      slots: { default: '<option value="apple">Apple</option><option value="pear">Pear</option>' },
    })
    const select = wrapper.get('select')
    expect(wrapper.get('label').attributes('for')).toBe(select.attributes('id'))
    expect(select.attributes('aria-invalid')).toBe('true')
    expect(select.attributes('aria-describedby')?.split(' ')).toHaveLength(2)
    expect(select.attributes('required')).toBeDefined()
    await select.setValue('pear')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['pear'])
  })

  it('opens and closes a swipeable, labelled drawer', async () => {
    const wrapper = mount(NbDrawer, {
      attachTo: document.body,
      props: { title: 'Quick edit', description: 'Change a field' },
      slots: { trigger: 'Open drawer', default: '<input aria-label="Project name" />' },
    })
    await wrapper.get('button').trigger('click')
    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]')
    expect(dialog?.textContent).toContain('Quick edit')
    expect(dialog?.classList.contains('nb-drawer--bottom')).toBe(true)
    document.body.querySelector<HTMLButtonElement>('[aria-label="Close drawer"]')?.click()
    expect(wrapper.emitted('update:open')?.at(-1)).toEqual([false])
  })

  it('opens keyboard-managed menubar commands', async () => {
    const wrapper = mount({
      components: { NbMenubar, NbMenubarMenu, NbMenubarItem },
      template: '<NbMenubar label="Editor"><NbMenubarMenu label="File"><NbMenubarItem @select="$emit(\'save\')">Save</NbMenubarItem></NbMenubarMenu></NbMenubar>',
    }, { attachTo: document.body })
    await wrapper.get('[role="menuitem"]').trigger('pointerdown', { button: 0, ctrlKey: false })
    await nextTick()
    const item = document.body.querySelector<HTMLElement>('[role="menuitem"][data-highlighted]')
      ?? Array.from(document.body.querySelectorAll<HTMLElement>('[role="menuitem"]')).find(element => element.textContent === 'Save')
    expect(item?.textContent).toBe('Save')
    item?.click()
    expect(wrapper.emitted('save')).toHaveLength(1)
  })

  it('moves between labelled slides and disables edge controls', async () => {
    const wrapper = mount({
      components: { NbCarousel, NbCarouselSlide },
      template: '<NbCarousel label="Colors"><NbCarouselSlide label="Yellow">Yellow</NbCarouselSlide><NbCarouselSlide label="Mint">Mint</NbCarouselSlide></NbCarousel>',
    })
    await nextTick()
    const track = wrapper.get('.nb-carousel__track').element as HTMLElement
    Object.defineProperty(track, 'clientWidth', { value: 300 })
    Object.defineProperty(track, 'scrollTo', { value: vi.fn(({ left }: ScrollToOptions) => { track.scrollLeft = left ?? 0; track.dispatchEvent(new Event('scroll')) }) })
    expect(wrapper.get('[role="region"]').attributes('aria-label')).toBe('Colors')
    expect(wrapper.findAll('[aria-roledescription="slide"]')).toHaveLength(2)
    expect(wrapper.get('[aria-label="Previous slide"]').attributes('disabled')).toBeDefined()
    await wrapper.get('[aria-label="Next slide"]').trigger('click')
    await nextTick()
    expect(track.scrollTo).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' })
    expect(wrapper.get('[aria-label="Next slide"]').attributes('disabled')).toBeDefined()
  })

  it('has no structural accessibility violations in form and carousel examples', async () => {
    const wrapper = mount({
      components: { NbCarousel, NbCarouselSlide, NbNativeSelect },
      template: '<div><NbNativeSelect label="Fruit"><option value="apple">Apple</option></NbNativeSelect><NbCarousel label="Colors"><NbCarouselSlide label="Yellow">Yellow</NbCarouselSlide></NbCarousel></div>',
    })
    await nextTick()
    const result = await axe(wrapper.element, { rules: { region: { enabled: false }, 'color-contrast': { enabled: false } } })
    expect(result.violations).toEqual([])
  })
})
