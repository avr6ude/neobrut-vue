<script setup lang="ts">
import { computed } from 'vue'
import { useNbTabs } from './tabsContext'

const props = defineProps<{ value: string }>()
const tabs = useNbTabs()
const active = computed(() => tabs.activeValue.value === props.value)
</script>

<template>
  <div
    v-show="active"
    class="nb-tabs__content"
    role="tabpanel"
    :id="tabs.panelId(value)"
    :aria-labelledby="tabs.triggerId(value)"
    :hidden="!active"
    tabindex="0"
  >
    <slot />
  </div>
</template>
