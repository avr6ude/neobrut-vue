import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import * as core from '../src'

describe('package entry point', () => {
  it('globally registers every public component', () => {
    const app = createApp({})
    app.use(core.NeoBrutalVue)

    for (const [name, component] of Object.entries(core)) {
      if (name.startsWith('Nb')) expect(app.component(name), `${name} was not registered`).toBe(component)
    }
  })
})
