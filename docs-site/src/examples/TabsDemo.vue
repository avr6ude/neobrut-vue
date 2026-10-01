<script setup lang="ts">
import { NbTabs, NbTabsList, NbTabsTrigger, NbTabsContent } from '@neobrut-vue/core'
</script>

<template>
  <NbTabs default-value="overview">
    <NbTabsList>
      <NbTabsTrigger value="overview">Overview</NbTabsTrigger>
      <NbTabsTrigger value="details">Details</NbTabsTrigger>
      <NbTabsTrigger value="disabled" disabled>Disabled</NbTabsTrigger>
    </NbTabsList>
    <NbTabsContent value="overview">A quick look at the project.</NbTabsContent>
    <NbTabsContent value="details">Use arrow keys to move between tabs.</NbTabsContent>
    <NbTabsContent value="disabled">You can't open this one.</NbTabsContent>
  </NbTabs>
</template>
