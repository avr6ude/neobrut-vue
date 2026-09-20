<script setup lang="ts">
import { useStableId } from '../../lib/ids'

defineProps<{
  title: string
  description?: string
}>()

const titleId = useStableId('empty-state-title')
</script>

<template>
  <section class="nb-root nb-empty-state" role="region" :aria-labelledby="titleId">
    <div v-if="$slots.icon" class="nb-empty-state__icon" aria-hidden="true"><slot name="icon" /></div>
    <h2 :id="titleId">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
    <div v-if="$slots.default" class="nb-empty-state__action"><slot /></div>
  </section>
</template>
