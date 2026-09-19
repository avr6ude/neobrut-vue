<script setup lang="ts">
import { useNbTabs } from './tabsContext'

const { orientation } = useNbTabs()

function onKeydown(event: KeyboardEvent) {
  const previousKey = orientation.value === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = orientation.value === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return

  const list = event.currentTarget as HTMLElement
  const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'))
  const current = (event.target as Element).closest<HTMLButtonElement>('[role="tab"]')
  const currentIndex = current ? tabs.indexOf(current) : -1
  if (!tabs.length || currentIndex < 0) return

  event.preventDefault()
  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? tabs.length - 1
      : (currentIndex + (event.key === nextKey ? 1 : -1) + tabs.length) % tabs.length

  tabs[nextIndex]?.focus()
  tabs[nextIndex]?.click()
}
</script>

<template>
  <div
    class="nb-tabs__list"
    role="tablist"
    :aria-orientation="orientation"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
