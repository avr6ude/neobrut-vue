import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import {
  NbCheckbox,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbNumberInput,
  NbRadioGroup,
  NbSelect,
  NbSelectItem,
  NbSlider,
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

  it('opens the styled select menu and emits the chosen value', async () => {
    const wrapper = mount(NbSelect, {
      attachTo: document.body,
      props: { label: 'Tone', modelValue: 'primary' },
      slots: {
        default: () => [
          h(NbSelectItem, { value: 'primary' }, () => 'Electric blue'),
          h(NbSelectItem, { value: 'accent' }, () => 'Safety yellow'),
        ],
      },
    })

    await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'Enter' })
    await nextTick()
    const option = document.body.querySelector<HTMLElement>('[role="option"][data-value="accent"]')

    expect(document.body.querySelector('.nb-select__content')).not.toBeNull()
    expect(option).not.toBeNull()
    option?.dispatchEvent(new MouseEvent('pointerup', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['accent'])

    wrapper.unmount()
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

  it('increments a labelled number field with the keyboard and exposes its error', async () => {
    const wrapper = mount(NbNumberInput, {
      props: {
        modelValue: 2,
        label: 'Seats',
        error: 'Choose at least three seats',
        min: 1,
        max: 5,
        step: 1,
      },
    })

    const input = wrapper.get('[role="spinbutton"]')
    await input.trigger('keydown', { key: 'ArrowUp' })

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toContain('error')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('emits a scalar value from a keyboard-operated slider', async () => {
    const wrapper = mount(NbSlider, {
      props: {
        modelValue: 40,
        label: 'Volume',
        error: 'Turn it up',
        min: 0,
        max: 100,
        step: 5,
      },
    })

    const slider = wrapper.get('[role="slider"]')
    await slider.trigger('keydown', { key: 'ArrowRight' })

    expect(slider.attributes('aria-labelledby')).toContain('label')
    expect(slider.attributes('aria-describedby')).toContain('error')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([45])
  })
})
