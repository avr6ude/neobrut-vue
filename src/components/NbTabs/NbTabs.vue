<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { useStableId } from '../../lib/ids'
import { nbTabsKey, type NbTabsOrientation } from './tabsContext'

const props = withDefaults(defineProps<{
  modelValue?: string
  defaultValue?: string
  orientation?: NbTabsOrientation
}>(), {
  defaultValue: '',
  orientation: 'horizontal',
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const tabsId = useStableId('tabs')
const internalValue = ref(props.defaultValue)
const activeValue = computed(() => props.modelValue ?? internalValue.value)
const orientation = computed(() => props.orientation)
const idPart = (value: string) => encodeURIComponent(value)

function select(value: string) {
  if (props.modelValue === undefined) internalValue.value = value
  emit('update:modelValue', value)
}

provide(nbTabsKey, {
  activeValue,
  orientation,
  select,
  triggerId: (value) => `${tabsId}-tab-${idPart(value)}`,
  panelId: (value) => `${tabsId}-panel-${idPart(value)}`,
})
</script>

<template>
  <div
    class="nb-root nb-tabs"
    :class="`nb-tabs--${orientation}`"
    :data-orientation="orientation"
  >
    <slot />
  </div>
</template>
