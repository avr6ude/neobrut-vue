<script setup lang="ts">
import { ToggleGroupItem } from 'reka-ui'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  value: string
  disabled?: boolean
}>(), {
  disabled: false,
})
</script>

<template>
  <ToggleGroupItem
    v-bind="$attrs"
    class="nb-toggle-group__item"
    :value="value"
    :disabled="disabled"
  >
    <slot />
  </ToggleGroupItem>
</template>
