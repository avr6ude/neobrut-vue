import { describe, expect, it } from 'vitest'
import { NeoBrutalVue } from '../src'

describe('package entry point', () => {
  it('exports the plugin', () => {
    expect(NeoBrutalVue).toBeDefined()
  })
})
