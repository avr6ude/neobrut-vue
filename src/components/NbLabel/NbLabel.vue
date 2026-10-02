<script setup lang="ts">
defineOptions({ inheritAttrs: false })
</script>

<template>
  <label v-bind="$attrs" class="nb-root nb-label"><slot /></label>
</template>
