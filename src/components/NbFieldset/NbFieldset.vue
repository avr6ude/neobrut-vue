<script setup lang="ts">
import { useStableId } from '../../lib/ids';

withDefaults(defineProps<{
  legend?: string
  description?: string
  disabled?: boolean
}>(), {
  disabled: false,
})

const descriptionId = `${useStableId('fieldset')}-description`
</script>

<template>
  <fieldset
    class="nb-root nb-fieldset"
    :disabled="disabled"
    :aria-describedby="description ? descriptionId : undefined"
  >
    <legend v-if="legend" class="nb-fieldset__legend">{{ legend }}</legend>
    <p v-if="description" :id="descriptionId" class="nb-fieldset__description">{{ description }}</p>
    <div class="nb-fieldset__content"><slot /></div>
  </fieldset>
</template>
