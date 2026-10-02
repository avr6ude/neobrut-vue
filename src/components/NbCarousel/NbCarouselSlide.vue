<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <div class="nb-carousel__slide" role="group" aria-roledescription="slide" :aria-label="label"><slot /></div>
</template>
