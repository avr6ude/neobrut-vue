import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { NbCheckbox, NbInput, NbSelect } from '../../src'

describe('form fields', () => {
  it('connects input label and error description', () => {
    const wrapper = mount(NbInput, { props: { label: 'Email', error: 'Required' } })
    const input = wrapper.get('input')

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toContain('error')
  })

  it('emits model updates for a checkbox', async () => {
    const wrapper = mount(NbCheckbox, { props: { modelValue: false, label: 'Agree' } })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('renders a custom select chevron', () => {
    const wrapper = mount(NbSelect, { props: { label: 'Tone' } })

    expect(wrapper.get('.nb-select__chevron').attributes('aria-hidden')).toBe('true')
  })
})
