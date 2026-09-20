<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  caption?: string
}>()
</script>

<template>
  <div class="nb-root nb-table-wrap">
    <table v-bind="$attrs" class="nb-table">
      <caption v-if="caption">{{ caption }}</caption>
      <slot />
    </table>
  </div>
</template>
