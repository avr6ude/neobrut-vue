<script setup lang="ts">
defineProps<{ title: string; date?: string; datetime?: string }>()
</script>

<template>
  <li class="nb-timeline__item">
    <div class="nb-timeline__card">
      <div class="nb-timeline__heading"><strong>{{ title }}</strong><time v-if="date" :datetime="datetime">{{ date }}</time></div>
      <div v-if="$slots.default" class="nb-timeline__body"><slot /></div>
    </div>
  </li>
</template>
