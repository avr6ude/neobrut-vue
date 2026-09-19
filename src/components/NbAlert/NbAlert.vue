<script setup lang="ts">
import { computed, ref } from 'vue'
import { cx } from '../../lib/variants'

type AlertTone = 'info' | 'success' | 'danger' | 'warning'

const props = withDefaults(defineProps<{
  tone?: AlertTone
  title?: string
  dismissible?: boolean
}>(), {
  tone: 'info',
  dismissible: false,
})

const emit = defineEmits<{ dismiss: [] }>()
const dismissed = ref(false)
const classes = computed(() => cx(`nb-alert--${props.tone}`))

function dismiss() {
  dismissed.value = true
  emit('dismiss')
}
</script>

<template>
  <div v-if="!dismissed" class="nb-root nb-alert" :class="classes" role="alert">
    <div class="nb-alert__content">
      <strong v-if="title">{{ title }}</strong>
      <span><slot /></span>
    </div>
    <button v-if="dismissible" class="nb-alert__close" type="button" aria-label="Dismiss" @click="dismiss">×</button>
  </div>
</template>
