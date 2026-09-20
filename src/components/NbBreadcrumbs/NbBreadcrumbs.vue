<script setup lang="ts">
export interface NbBreadcrumbItem {
  label: string
  href?: string
}

withDefaults(defineProps<{
  items: NbBreadcrumbItem[]
  label?: string
}>(), {
  label: 'Breadcrumb',
})
</script>

<template>
  <nav class="nb-root nb-breadcrumbs" :aria-label="label">
    <ol>
      <li v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <a v-if="item.href && index < items.length - 1" :href="item.href">{{ item.label }}</a>
        <span v-else :aria-current="index === items.length - 1 ? 'page' : undefined">{{ item.label }}</span>
        <svg v-if="index < items.length - 1" class="nb-breadcrumbs__separator" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="m6 3 5 5-5 5" />
        </svg>
      </li>
    </ol>
  </nav>
</template>
