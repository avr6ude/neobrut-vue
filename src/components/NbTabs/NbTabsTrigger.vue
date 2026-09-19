<script setup lang="ts">
import { computed } from 'vue'
import { useNbTabs } from './tabsContext'

const props = withDefaults(defineProps<{
  value: string
  disabled?: boolean
}>(), {
  disabled: false,
})

const tabs = useNbTabs()
const active = computed(() => tabs.activeValue.value === props.value)
</script>

<template>
  <button
    class="nb-tabs__trigger"
    :class="{ 'is-active': active }"
    :id="tabs.triggerId(value)"
    type="button"
    role="tab"
    :aria-selected="active"
    :aria-controls="tabs.panelId(value)"
    :tabindex="active ? 0 : -1"
    :disabled="disabled"
    :data-active="active ? '' : undefined"
    @click="tabs.select(value)"
  >
    <slot />
  </button>
</template>
