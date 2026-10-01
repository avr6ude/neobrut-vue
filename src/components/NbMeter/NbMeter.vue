<script setup lang="ts">
import { computed } from 'vue'
import { useStableId } from '../../lib/ids'

const props = withDefaults(defineProps<{
  value: number
  min?: number
  max?: number
  label: string
  showValue?: boolean
  low?: number
  high?: number
  optimum?: number
}>(), { min: 0, max: 100, showValue: false })

const id = useStableId('meter')
const percentage = computed(() => props.max > props.min
  ? Math.round(Math.min(100, Math.max(0, (props.value - props.min) / (props.max - props.min) * 100)))
  : 0)
</script>

<template>
  <div class="nb-root nb-meter">
    <div class="nb-meter__header">
      <label :for="id">{{ label }}</label>
      <span v-if="showValue" aria-hidden="true">{{ percentage }}%</span>
    </div>
    <meter :id="id" :value="value" :min="min" :max="max" :low="low" :high="high" :optimum="optimum">{{ percentage }}%</meter>
  </div>
</template>

<style>
.nb-meter { display: grid; gap: 0.4rem; }
.nb-meter__header { display: flex; justify-content: space-between; gap: 1rem; font-family: var(--nb-font-display); font-weight: 850; }
.nb-meter meter { display: block; width: 100%; height: 1.5rem; appearance: none; border: 2px solid var(--nb-color-ink); border-radius: var(--nb-radius-sm); background: var(--nb-color-muted); }
.nb-meter meter::-webkit-meter-bar { border: 0; border-radius: 0; background: var(--nb-color-muted); }
.nb-meter meter::-webkit-meter-optimum-value { background: var(--nb-color-secondary); }
.nb-meter meter::-webkit-meter-suboptimum-value { background: var(--nb-color-primary); }
.nb-meter meter::-webkit-meter-even-less-good-value { background: var(--nb-color-danger); }
.nb-meter meter::-moz-meter-bar { background: var(--nb-color-secondary); }
</style>
