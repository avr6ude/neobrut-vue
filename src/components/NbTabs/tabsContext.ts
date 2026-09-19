import { inject, type ComputedRef, type InjectionKey } from 'vue'

export type NbTabsOrientation = 'horizontal' | 'vertical'

export interface NbTabsContext {
  activeValue: ComputedRef<string>
  orientation: ComputedRef<NbTabsOrientation>
  triggerId: (value: string) => string
  panelId: (value: string) => string
  select: (value: string) => void
}

export const nbTabsKey: InjectionKey<NbTabsContext> = Symbol('nb-tabs')

export function useNbTabs(): NbTabsContext {
  const context = inject(nbTabsKey)
  if (!context) throw new Error('Tabs components must be used inside NbTabs')
  return context
}
