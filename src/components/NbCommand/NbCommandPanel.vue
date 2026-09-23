<script setup lang="ts">
import { computed } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxRoot,
  ComboboxViewport,
} from 'reka-ui'
import type { NbCommandOption } from './types'

const props = withDefaults(defineProps<{
  modelValue?: string
  options: NbCommandOption[]
  label: string
  placeholder: string
  emptyText: string
}>(), {
  modelValue: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  select: [option: NbCommandOption]
}>()

const groups = computed(() => {
  const grouped = new Map<string, NbCommandOption[]>()
  for (const option of props.options) {
    const key = option.group ?? ''
    grouped.set(key, [...(grouped.get(key) ?? []), option])
  }
  return Array.from(grouped, ([label, options]) => ({ label, options }))
})

function updateValue(value: unknown) {
  if (typeof value !== 'string') return
  const option = props.options.find(candidate => candidate.value === value)
  if (!option) return
  emit('update:modelValue', value)
  emit('select', option)
}
</script>

<template>
  <ComboboxRoot
    class="nb-command"
    :model-value="modelValue"
    :open="true"
    :reset-search-term-on-select="false"
    @update:model-value="updateValue"
  >
    <ComboboxAnchor class="nb-command__search">
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
      <ComboboxInput
        class="nb-command__input"
        :aria-label="label"
        :placeholder="placeholder"
        :display-value="() => ''"
      />
    </ComboboxAnchor>
    <ComboboxContent class="nb-command__content">
      <ComboboxViewport class="nb-command__viewport">
        <ComboboxEmpty class="nb-command__empty">{{ emptyText }}</ComboboxEmpty>
        <ComboboxGroup v-for="group in groups" :key="group.label || 'default'" class="nb-command__group">
          <ComboboxLabel v-if="group.label" class="nb-command__group-label">{{ group.label }}</ComboboxLabel>
          <ComboboxItem
            v-for="option in group.options"
            :key="option.value"
            class="nb-command__item"
            :value="option.value"
            :text-value="[option.label, ...(option.keywords ?? [])].join(' ')"
            :disabled="option.disabled"
            :data-value="option.value"
          >
            <span>{{ option.label }}</span>
            <span v-if="option.shortcut" class="nb-command__shortcut" aria-hidden="true">{{ option.shortcut }}</span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
