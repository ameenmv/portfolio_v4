<template>
  <div class="pointer-events-none fixed inset-0 z-[60] flex" aria-hidden="true">
    <div 
      ref="curtain"
      class="w-full h-full bg-accent origin-bottom transform scale-y-0"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const curtain = ref<HTMLElement | null>(null)

// Note: This component is currently an aesthetic placeholder.
// The actual page transitions are driven by Nuxt's out-in layout transition,
// defined in tailwind.css under `.page-enter-active` etc.
// For more complex GSAP page transitions, we would hook into Nuxt page transition callbacks.
</script>
