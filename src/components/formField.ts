import { useStableId } from '../lib/ids'

export function createFieldIds(prefix: string, providedId?: string) {
  const inputId = providedId ?? useStableId(prefix)

  return {
    inputId,
    hintId: `${inputId}-hint`,
    errorId: `${inputId}-error`,
  }
}

export function describedBy(hint: string | undefined, error: string | undefined, hintId: string, errorId: string) {
  return [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
}
