<script setup lang="ts">
import { computed } from 'vue'
import { AvatarFallback, AvatarImage, AvatarRoot } from 'reka-ui'

type AvatarSize = 'sm' | 'md' | 'lg'
type AvatarTone = 'primary' | 'secondary' | 'accent'

const props = withDefaults(defineProps<{
  name: string
  src?: string
  size?: AvatarSize
  tone?: AvatarTone
}>(), {
  size: 'md',
  tone: 'primary',
})

const initials = computed(() => props.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase()).join(''))
</script>

<template>
  <AvatarRoot
    class="nb-root nb-avatar"
    :class="[`nb-avatar--${size}`, `nb-avatar--${tone}`]"
    role="img"
    :aria-label="name"
  >
    <AvatarImage v-if="src" class="nb-avatar__image" :src="src" alt="" aria-hidden="true" />
    <AvatarFallback class="nb-avatar__fallback" aria-hidden="true">{{ initials }}</AvatarFallback>
  </AvatarRoot>
</template>
