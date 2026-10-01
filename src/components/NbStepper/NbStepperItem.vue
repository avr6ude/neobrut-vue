<script setup lang="ts">
import { StepperDescription, StepperIndicator, StepperItem, StepperTitle, StepperTrigger } from 'reka-ui'

defineProps<{ step: number; title: string; description?: string; disabled?: boolean; completed?: boolean }>()
</script>

<template>
  <StepperItem class="nb-stepper__item" :step="step" :disabled="disabled" :completed="completed">
    <StepperTrigger class="nb-stepper__trigger">
      <StepperIndicator class="nb-stepper__indicator">{{ step }}</StepperIndicator>
      <span class="nb-stepper__copy">
        <StepperTitle as="span" class="nb-stepper__title">{{ title }}</StepperTitle>
        <StepperDescription as="span" class="nb-stepper__description">{{ description || `Step ${step}` }}</StepperDescription>
      </span>
    </StepperTrigger>
  </StepperItem>
</template>
