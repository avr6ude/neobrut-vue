let nextId = 0

export function useStableId(prefix = 'nb'): string {
  nextId += 1
  return `${prefix}-${nextId}`
}
