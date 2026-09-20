<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot,
} from 'reka-ui'

withDefaults(defineProps<{
  page?: number
  defaultPage?: number
  total: number
  itemsPerPage?: number
  siblingCount?: number
  disabled?: boolean
  label?: string
}>(), {
  defaultPage: 1,
  itemsPerPage: 10,
  siblingCount: 1,
  disabled: false,
  label: 'Pagination',
})

const emit = defineEmits<{ 'update:page': [value: number] }>()
</script>

<template>
  <PaginationRoot
    class="nb-root nb-pagination"
    :page="page"
    :default-page="defaultPage"
    :total="total"
    :items-per-page="itemsPerPage"
    :sibling-count="siblingCount"
    :disabled="disabled"
    show-edges
    :aria-label="label"
    @update:page="emit('update:page', $event)"
  >
    <PaginationPrev class="nb-pagination__button" aria-label="Go to previous page">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m10 3-5 5 5 5" /></svg>
    </PaginationPrev>
    <PaginationList v-slot="{ items }" class="nb-pagination__list">
      <template v-for="(item, index) in items" :key="item.type === 'page' ? item.value : `ellipsis-${index}`">
        <PaginationListItem v-if="item.type === 'page'" class="nb-pagination__button" :value="item.value">
          {{ item.value }}
        </PaginationListItem>
        <PaginationEllipsis v-else class="nb-pagination__ellipsis">…</PaginationEllipsis>
      </template>
    </PaginationList>
    <PaginationNext class="nb-pagination__button" aria-label="Go to next page">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m6 3 5 5-5 5" /></svg>
    </PaginationNext>
  </PaginationRoot>
</template>
