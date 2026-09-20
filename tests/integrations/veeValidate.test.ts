import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { useForm } from 'vee-validate'
import { describe, expect, it } from 'vitest'
import { NbInput } from '../../src'

describe('VeeValidate integration', () => {
  it('binds values, blur handling, and validation errors through the public field API', async () => {
    const submitted = ref<Record<string, unknown>>()
    const wrapper = mount(defineComponent({
      components: { NbInput },
      setup() {
        const { defineField, errors, handleSubmit } = useForm({
          initialValues: { email: '' },
          validationSchema: {
            email: (value: string) => value ? true : 'Email is required',
          },
        })
        const [email, emailAttrs] = defineField('email')
        const onSubmit = handleSubmit(values => { submitted.value = values })

        return { email, emailAttrs, errors, onSubmit }
      },
      template: `
        <form @submit="onSubmit">
          <NbInput
            v-model="email"
            v-bind="emailAttrs"
            name="email"
            label="Email"
            :error="errors.email"
          />
          <button type="submit">Save</button>
        </form>
      `,
    }))

    await (wrapper.vm as unknown as { onSubmit: () => Promise<unknown> }).onSubmit()
    await flushPromises()
    expect((wrapper.vm as unknown as { errors: Record<string, string> }).errors).toEqual({ email: 'Email is required' })
    expect(wrapper.get('.nb-field__error').text()).toBe('Email is required')

    await wrapper.get('input').setValue('dev@example.com')
    await (wrapper.vm as unknown as { onSubmit: () => Promise<unknown> }).onSubmit()
    await flushPromises()
    expect(wrapper.find('.nb-field__error').exists()).toBe(false)
    expect(submitted.value).toEqual({ email: 'dev@example.com' })
  })
})
