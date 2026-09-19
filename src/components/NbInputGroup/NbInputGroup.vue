<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()
</script>

<template>
  <div class="nb-root nb-input-group">
    <span v-if="slots.start" class="nb-input-group__addon"><slot name="start" /></span>
    <div class="nb-input-group__control"><slot /></div>
    <span v-if="slots.end" class="nb-input-group__addon"><slot name="end" /></span>
  </div>
</template>
