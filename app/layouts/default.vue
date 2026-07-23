<template>
  <div class="min-h-screen bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary flex flex-col">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:px-6 focus:py-4 focus:bg-accent focus:text-bg-primary font-display font-bold">
      Skip to main content
    </a>
    <CustomCursor />
    <SiteHeader />
    <main id="main-content" class="flex-grow w-full relative z-10">
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
