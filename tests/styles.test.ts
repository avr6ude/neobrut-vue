import { describe, expect, it } from 'vitest'
import { cx } from '../src/lib/variants'
import { useStableId } from '../src/lib/ids'

describe('shared utilities', () => {
  it('joins only active class names', () => {
    expect(cx('nb-button', false, undefined, 'is-primary')).toBe('nb-button is-primary')
  })

  it('creates prefixed stable ids', () => {
    expect(useStableId('field')).toMatch(/^field-\d+$/)
  })
})
