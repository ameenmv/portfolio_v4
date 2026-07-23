<template>
  <div class="min-h-screen bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary flex flex-col">
    <CustomCursor />
    <SiteHeader />
    <main class="flex-grow w-full relative z-10">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports'
// Global meta overrides if needed, most handled in nuxt.config
useHead({
  bodyAttrs: {
    class: 'bg-bg-primary text-text-primary'
  }
})
</script>

<style>
/* Any layout specific styles */
</style>
