<script setup lang="ts">
import { computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'

const props = withDefaults(defineProps<{
  value?: number | null
  max?: number
  label?: string
  showValue?: boolean
}>(), {
  value: null,
  max: 100,
  label: 'Progress',
  showValue: false,
})

const percentage = computed(() => props.value === null
  ? 0
  : Math.min(100, Math.max(0, (props.value / props.max) * 100)))
</script>

<template>
  <div class="nb-root nb-progress-wrap">
    <div v-if="showValue" class="nb-progress__header">
      <span>{{ label }}</span>
      <span>{{ Math.round(percentage) }}%</span>
    </div>
    <ProgressRoot
      class="nb-progress"
      :model-value="value"
      :max="max"
      :get-value-label="() => label"
    >
      <ProgressIndicator
        class="nb-progress__indicator"
        :style="value === null ? undefined : { transform: `translateX(-${100 - percentage}%)` }"
      />
    </ProgressRoot>
  </div>
</template>
