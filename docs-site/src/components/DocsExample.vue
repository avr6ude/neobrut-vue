<script setup lang="ts">
import { NbCopyButton, NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger } from '@neobrut-vue/core'

defineProps<{ title: string; source: string }>()
</script>

<template>
  <NbTabs class="nb-doc-example not-content" default-value="preview">
    <div class="nb-doc-example__bar">
      <NbTabsList :aria-label="`${title} example`">
        <NbTabsTrigger value="preview">Preview</NbTabsTrigger>
        <NbTabsTrigger value="code">Code</NbTabsTrigger>
      </NbTabsList>
    </div>
    <NbTabsContent value="preview" class="nb-doc-example__preview">
      <div class="nb-doc-example__preview-content"><slot name="preview" /></div>
    </NbTabsContent>
    <NbTabsContent value="code" class="nb-doc-example__code">
      <NbCopyButton class="nb-doc-example__copy" size="sm" :text="source.trim()" :aria-label="`Copy ${title} code`" />
      <slot name="code" />
    </NbTabsContent>
  </NbTabs>
</template>
