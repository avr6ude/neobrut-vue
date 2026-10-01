import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { NbCopyButton, NbMeter, NbStepper, NbStepperItem, NbTimeline, NbTimelineItem } from '../../src'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('0.5 components', () => {
  it('keeps a linear stepper labelled and advances by an enabled step', async () => {
    const wrapper = mount({
      components: { NbStepper, NbStepperItem },
      data: () => ({ step: 1 }),
      template: `
        <NbStepper v-model="step" label="Checkout">
          <NbStepperItem :step="1" title="Cart" description="Review items" />
          <NbStepperItem :step="2" title="Address" />
          <NbStepperItem :step="3" title="Payment" />
        </NbStepper>
      `,
    })

    expect(wrapper.get('[role="group"]').attributes('aria-label')).toBe('Checkout')
    const triggers = wrapper.findAll('button')
    expect(triggers).toHaveLength(3)
    expect(wrapper.get('.nb-stepper__indicator').text()).toBe('1')
    expect(triggers[0]!.attributes('aria-labelledby')).toBe(wrapper.get('.nb-stepper__title').attributes('id'))
    expect(triggers[2]!.attributes('disabled')).toBeDefined()
    await triggers[1]!.trigger('mousedown', { button: 0 })
    await nextTick()
    expect(wrapper.vm.step).toBe(2)
    expect(triggers[1]!.attributes('data-state')).toBe('active')
  })

  it('renders a labelled native meter and its bounded value', () => {
    const wrapper = mount(NbMeter, { props: { label: 'Storage used', value: 75, max: 100, showValue: true } })
    const meter = wrapper.get('meter')
    expect(meter.attributes('value')).toBe('75')
    expect(meter.attributes('max')).toBe('100')
    expect(wrapper.get('label').attributes('for')).toBe(meter.attributes('id'))
    expect(wrapper.text()).toContain('75%')
  })

  it('renders a semantic timeline with machine-readable dates', () => {
    const wrapper = mount({
      components: { NbTimeline, NbTimelineItem },
      template: `
        <NbTimeline label="Release history">
          <NbTimelineItem title="Published" datetime="2026-10-01" date="Oct 1">Available on npm</NbTimelineItem>
          <NbTimelineItem title="Reviewed">All checks passed</NbTimelineItem>
        </NbTimeline>
      `,
    })

    expect(wrapper.get('ol').attributes('aria-label')).toBe('Release history')
    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.get('time').attributes('datetime')).toBe('2026-10-01')
    expect(wrapper.get('li').text()).toContain('Available on npm')
  })

  it('copies text and announces success without submitting a form', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    vi.useFakeTimers()
    const wrapper = mount(NbCopyButton, { props: { text: 'npm install @neobrut-vue/core' } })

    expect(wrapper.get('button').attributes('type')).toBe('button')
    await wrapper.get('button').trigger('click')
    await Promise.resolve()
    await nextTick()
    expect(writeText).toHaveBeenCalledWith('npm install @neobrut-vue/core')
    expect(wrapper.get('[role="status"]').text()).toBe('Copied')
    expect(wrapper.emitted('copied')?.[0]).toEqual(['npm install @neobrut-vue/core'])

    vi.advanceTimersByTime(2000)
    await nextTick()
    expect(wrapper.get('[role="status"]').text()).toBe('Copy')
  })

  it('reports clipboard failure without claiming a copy', async () => {
    const failure = new Error('Clipboard denied')
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText: vi.fn().mockRejectedValue(failure) } })
    const wrapper = mount(NbCopyButton, { props: { text: 'secret' } })

    await wrapper.get('button').trigger('click')
    await Promise.resolve()
    await nextTick()
    expect(wrapper.emitted('error')?.[0]).toEqual([failure])
    expect(wrapper.emitted('copied')).toBeUndefined()
    expect(wrapper.get('[role="status"]').text()).toBe('Copy failed')
  })

  it('reports the text actually copied if the prop changes during permission', async () => {
    let finishCopy!: () => void
    const writeText = vi.fn(() => new Promise<void>(resolve => { finishCopy = resolve }))
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } })
    const wrapper = mount(NbCopyButton, { props: { text: 'old value' } })

    await wrapper.get('button').trigger('click')
    await wrapper.setProps({ text: 'new value' })
    finishCopy()
    await Promise.resolve()
    await nextTick()

    expect(writeText).toHaveBeenCalledWith('old value')
    expect(wrapper.emitted('copied')?.[0]).toEqual(['old value'])
    expect(wrapper.get('[role="status"]').text()).toBe('Copy')
  })

  it('has no axe violations in representative states', async () => {
    const wrapper = mount({
      components: { NbCopyButton, NbMeter, NbStepper, NbStepperItem, NbTimeline, NbTimelineItem },
      template: `
        <div>
          <NbStepper label="Checkout" :model-value="2">
            <NbStepperItem :step="1" title="Cart" />
            <NbStepperItem :step="2" title="Payment" />
          </NbStepper>
          <NbMeter label="Storage used" :value="42" />
          <NbTimeline label="Release history"><NbTimelineItem title="Published" date="Oct 1" datetime="2026-10-01" /></NbTimeline>
          <NbCopyButton text="https://example.com" />
        </div>
      `,
    })

    const results = await axe(wrapper.element, {
      rules: { region: { enabled: false }, 'color-contrast': { enabled: false } },
    })
    expect(results.violations).toEqual([])
  })
})
