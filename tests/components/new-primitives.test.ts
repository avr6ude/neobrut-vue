import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { NbCollapsible, NbPinInput, NbRating, NbTagsInput } from '../../src'

describe('new primitives', () => {
  it('adds and removes tags while keeping the field labelled', async () => {
    const wrapper = mount(NbTagsInput, {
      props: { label: 'Skills', modelValue: ['Vue'], name: 'skills' },
    })

    const input = wrapper.get('input[type="text"]')
    expect(input.attributes('id')).toBe(wrapper.get('label').attributes('for'))
    await input.setValue('TypeScript')
    await input.trigger('keydown', { key: 'Enter' })
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['Vue', 'TypeScript']])

    await wrapper.setProps({ modelValue: ['Vue', 'TypeScript'] })
    const removeVue = wrapper.get('button[aria-label="Remove Vue"]')
    expect(removeVue.attributes('aria-labelledby')).toBeUndefined()
    await removeVue.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['TypeScript']])
  })

  it('emits each PIN digit and completion with a labelled field', async () => {
    const wrapper = mount(NbPinInput, {
      props: { label: 'Verification code', length: 4, modelValue: [1, 2, 3] },
    })

    const inputs = wrapper.findAll('input:not([type="hidden"])').filter(input => input.attributes('tabindex') !== '-1')
    expect(inputs).toHaveLength(4)
    expect(wrapper.get('[role="group"]').attributes('aria-labelledby')).toBe(wrapper.get('span.nb-field__label').attributes('id'))
    await inputs[3]!.setValue('4')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[1, 2, 3, 4]])
    expect(wrapper.emitted('complete')?.at(-1)).toEqual([[1, 2, 3, 4]])
  })

  it('preserves a leading zero in a controlled PIN', async () => {
    const wrapper = mount({
      components: { NbPinInput },
      data: () => ({ code: [] as number[] }),
      template: '<NbPinInput v-model="code" label="Verification code" :length="4" />',
    })

    await wrapper.get('.nb-pin-input__digit').setValue('0')
    await nextTick()
    expect(wrapper.vm.code).toEqual([0])
    expect((wrapper.get('.nb-pin-input__digit').element as HTMLInputElement).value).toBe('0')
  })

  it('blocks a required PIN form until every digit is present', async () => {
    const wrapper = mount({
      components: { NbPinInput },
      data: () => ({ code: [] as number[] }),
      template: '<form><NbPinInput v-model="code" label="Code" :length="4" required name="code" /></form>',
    })

    const form = wrapper.get('form').element as HTMLFormElement
    const digits = wrapper.findAll('.nb-pin-input__digit')
    await digits[0]!.setValue('1')
    expect(form.checkValidity()).toBe(false)
    await digits[1]!.setValue('2')
    await digits[2]!.setValue('3')
    await digits[3]!.setValue('4')
    expect(form.checkValidity()).toBe(true)
  })

  it('rejects letters in a numeric PIN', async () => {
    const wrapper = mount(NbPinInput, { props: { label: 'Code', length: 4 } })
    await wrapper.get('.nb-pin-input__digit').setValue('a')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('complete')).toBeUndefined()
  })

  it('blocks a required tags field without an explicit name until a tag is committed', async () => {
    const wrapper = mount({
      components: { NbTagsInput },
      template: '<form><NbTagsInput label="Skills" required /></form>',
    })
    const form = wrapper.get('form').element as HTMLFormElement
    expect(form.checkValidity()).toBe(false)
    await wrapper.get('input[type="text"]').setValue('unfinished draft')
    expect(form.checkValidity()).toBe(false)
  })

  it('selects a rating through labelled radio options', async () => {
    const wrapper = mount(NbRating, {
      props: { label: 'Experience', modelValue: 2, name: 'rating' },
    })

    const radios = wrapper.findAll('input[type="radio"]')
    expect(radios).toHaveLength(5)
    expect(wrapper.get('legend').text()).toBe('Experience')
    expect(radios[1]!.attributes('checked')).toBeDefined()
    await radios[2]!.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
  })

  it('expands a collapsible with its trigger and exposes its content', async () => {
    const wrapper = mount(NbCollapsible, {
      props: { title: 'Advanced options' },
      slots: { default: '<p>Extra controls</p>' },
    })

    const trigger = wrapper.get('button')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await trigger.trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([true])
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.text()).toContain('Extra controls')
  })
})
