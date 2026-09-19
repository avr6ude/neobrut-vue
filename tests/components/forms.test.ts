import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  NbCheckbox,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbRadioGroup,
  NbSelect,
  NbSwitch,
} from '../../src'

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

  it('emits the selected native radio value from a labelled group', async () => {
    const wrapper = mount(NbRadioGroup, {
      props: {
        label: 'Density',
        hint: 'Choose one option',
        options: [
          { value: 'roomy', label: 'Roomy' },
          { value: 'compact', label: 'Compact' },
        ],
      },
    })

    const radios = wrapper.findAll('input[type="radio"]')
    await radios[1]?.setValue(true)

    expect(wrapper.get('legend').text()).toBe('Density')
    expect(radios[0]?.attributes('name')).toBe(radios[1]?.attributes('name'))
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['compact'])
  })

  it('emits boolean updates from a native switch input', async () => {
    const wrapper = mount(NbSwitch, {
      props: { modelValue: false, label: 'Airplane mode', description: 'Disable all connections' },
    })

    await wrapper.get('input[type="checkbox"]').setValue(true)

    expect(wrapper.get('[role="switch"]').attributes('aria-checked')).toBe('false')
    expect(wrapper.get('[role="switch"]').attributes('aria-describedby')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('groups related controls with native fieldset semantics', () => {
    const wrapper = mount(NbFieldset, {
      props: { legend: 'Profile', description: 'Public information' },
      slots: { default: '<input aria-label="Name">' },
    })

    expect(wrapper.element.tagName).toBe('FIELDSET')
    expect(wrapper.get('legend').text()).toBe('Profile')
    expect(wrapper.attributes('aria-describedby')).toBeTruthy()
  })

  it('renders input group addons around the native control', () => {
    const wrapper = mount(NbInputGroup, {
      slots: {
        start: '@',
        default: '<input aria-label="Username">',
        end: '.dev',
      },
    })

    expect(wrapper.element.children[0]?.textContent).toBe('@')
    expect(wrapper.element.children[1]?.querySelector('input')).toBeTruthy()
    expect(wrapper.element.children[2]?.textContent).toBe('.dev')
  })
})
