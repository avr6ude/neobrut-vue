<script setup lang="ts">
import { computed } from 'vue'
import { createFieldIds, describedBy } from '../formField'
import { NbLabel } from '../NbLabel'

const props = defineProps<{
  id?: string
  label?: string
  hint?: string
  error?: string
}>()

const ids = createFieldIds('field', props.id)
const descriptionId = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))
</script>

<template>
  <div class="nb-root nb-field">
    <NbLabel v-if="label" :for="ids.inputId">{{ label }}</NbLabel>
    <slot :input-id="ids.inputId" :described-by="descriptionId" :invalid="Boolean(error)" />
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
