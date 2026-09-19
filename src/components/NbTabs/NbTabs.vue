<script setup lang="ts">
import { computed } from 'vue'
import { useStableId } from '../../lib/ids'

export interface NbTabDefinition {
  value: string
  label: string
  disabled?: boolean
}

const props = defineProps<{
  tabs: NbTabDefinition[]
  modelValue?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const tabsId = useStableId('tabs')
const activeValue = computed(() => props.modelValue ?? props.tabs[0]?.value ?? '')

function select(value: string) {
  emit('update:modelValue', value)
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()

  const enabled = props.tabs.map((tab, tabIndex) => ({ tab, tabIndex })).filter(({ tab }) => !tab.disabled)
  if (!enabled.length) return
  const current = enabled.findIndex(({ tab }) => tab.value === props.tabs[index]?.value)
  const nextIndex = event.key === 'Home'
    ? 0
    : event.key === 'End'
      ? enabled.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length
  const next = enabled[nextIndex]

  select(next.tab.value)
  void Promise.resolve().then(() => document.querySelector<HTMLElement>(`[data-nb-tab="${next.tab.value}"]`)?.focus())
}
</script>

<template>
  <div class="nb-root nb-tabs">
    <div class="nb-tabs__list" role="tablist" aria-orientation="horizontal">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        class="nb-tabs__tab"
        :class="{ 'is-active': tab.value === activeValue }"
        :id="`${tabsId}-tab-${tab.value}`"
        :data-nb-tab="tab.value"
        type="button"
        role="tab"
        :aria-selected="tab.value === activeValue"
        :aria-controls="`${tabsId}-panel-${tab.value}`"
        :tabindex="tab.value === activeValue ? 0 : -1"
        :disabled="tab.disabled"
        @click="select(tab.value)"
        @keydown="onKeydown(index, $event)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div
      class="nb-tabs__panel"
      role="tabpanel"
      :id="`${tabsId}-panel-${activeValue}`"
      :aria-labelledby="`${tabsId}-tab-${activeValue}`"
      tabindex="0"
    >
      <slot :name="`panel-${activeValue}`" :value="activeValue" />
    </div>
  </div>
</template>
