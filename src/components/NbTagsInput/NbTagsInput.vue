<script setup lang="ts">
import { computed } from 'vue'
import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'reka-ui'
import { createFieldIds, describedBy } from '../formField'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: string[]
  label?: string
  hint?: string
  error?: string
  placeholder?: string
  name?: string
  id?: string
  max?: number
  disabled?: boolean
  required?: boolean
}>(), { modelValue: () => [], disabled: false, required: false })

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()
const ids = createFieldIds('tags-input', props.id)
const describedById = computed(() => describedBy(props.hint, props.error, ids.hintId, ids.errorId))
</script>

<template>
  <div class="nb-root nb-field">
    <label v-if="label" class="nb-field__label" :for="ids.inputId">{{ label }}</label>
    <TagsInputRoot
      class="nb-tags-input"
      :model-value="modelValue"
      :name="name"
      :id="ids.inputId"
      :max="max"
      :disabled="disabled"
      :required="required"
      @update:model-value="emit('update:modelValue', $event as string[])"
    >
      <TagsInputItem v-for="tag in modelValue" :key="tag" class="nb-tags-input__tag" :value="tag">
        <TagsInputItemText />
        <TagsInputItemDelete class="nb-tags-input__remove" :aria-label="`Remove ${tag}`" :aria-labelledby="undefined">×</TagsInputItemDelete>
      </TagsInputItem>
      <TagsInputInput
        v-bind="$attrs"
        class="nb-tags-input__input"
        :placeholder="placeholder"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedById"
      />
    </TagsInputRoot>
    <span v-if="hint" :id="ids.hintId" class="nb-field__hint">{{ hint }}</span>
    <span v-if="error" :id="ids.errorId" class="nb-field__error">{{ error }}</span>
  </div>
</template>
