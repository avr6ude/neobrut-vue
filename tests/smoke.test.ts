import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import { NeoBrutalVue } from '../src'

describe('package entry point', () => {
  it('globally registers the newest component families', () => {
    const app = createApp({})
    app.use(NeoBrutalVue)

    for (const name of ['NbSheet', 'NbAlertDialog', 'NbContextMenu', 'NbCommand', 'NbHoverCard', 'NbNavigationMenu']) {
      expect(app.component(name), `${name} was not registered`).toBeDefined()
    }
  })
})
