<template>
  <div class="relative w-24 h-24 flex items-center justify-center pointer-events-none opacity-50" ref="indicatorRef">
    <!-- Circle Text (SCROLL TO EXPLORE) SVG -->
    <svg viewBox="0 0 100 100" class="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]">
      <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
      <text fill="currentColor" font-size="10" font-weight="bold" letter-spacing="2">
        <textPath href="#circlePath" startOffset="0%">SCROLL TO EXPLORE • SCROLL TO EXPLORE • </textPath>
      </text>
    </svg>
    <!-- Center Arrow -->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-bounce">
      <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

const indicatorRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) return

  gsap.to(indicatorRef.value, {
    scrollTrigger: {
      trigger: indicatorRef.value,
      start: "top 90%",
      end: "top 20%",
      scrub: true
    },
    opacity: 0,
    y: 50
  })
})
</script>
