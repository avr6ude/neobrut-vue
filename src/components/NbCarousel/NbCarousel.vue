<script setup lang="ts">
import { nextTick, onMounted, onUpdated, ref } from 'vue'

withDefaults(defineProps<{ label?: string }>(), { label: 'Carousel' })

const track = ref<HTMLElement | null>(null)
const active = ref(0)
const total = ref(0)

function updatePosition() {
  const element = track.value
  if (!element) return
  total.value = element.children.length
  active.value = total.value ? Math.min(total.value - 1, Math.round(element.scrollLeft / (element.clientWidth || 1))) : 0
}

function move(delta: number) {
  const element = track.value
  if (!element) return
  const index = Math.max(0, Math.min(total.value - 1, active.value + delta))
  element.scrollTo({ left: index * element.clientWidth, behavior: 'smooth' })
}

onMounted(updatePosition)
onUpdated(() => { void nextTick(updatePosition) })
</script>

<template>
  <section class="nb-root nb-carousel" role="region" aria-roledescription="carousel" :aria-label="label">
    <div ref="track" class="nb-carousel__track" tabindex="0" @scroll.passive="updatePosition"><slot /></div>
    <div class="nb-carousel__controls">
      <span aria-live="polite">{{ total ? `${active + 1} / ${total}` : '' }}</span>
      <div>
        <button type="button" aria-label="Previous slide" :disabled="active === 0" @click="move(-1)">←</button>
        <button type="button" aria-label="Next slide" :disabled="active >= total - 1" @click="move(1)">→</button>
      </div>
    </div>
  </section>
</template>
