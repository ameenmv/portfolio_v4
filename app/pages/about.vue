<template>
  <div class="page-about w-full bg-bg-primary overflow-hidden">
    <!-- Premium Story-driven narrative components -->
    <AboutHero />
    <AboutHorizontal />
    <AboutMentorPremium />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Architecture & Journey | Ameen Mohamed'
})
</script>

<style scoped>
/* Fix for Vite HMR cache */
</style>
