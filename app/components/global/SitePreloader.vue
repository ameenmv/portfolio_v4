<template>
  <div 
    v-if="!isDestroyed"
    ref="preloaderRef" 
    class="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-bg-primary overflow-hidden"
  >
    <div class="relative w-full h-full flex items-center justify-center">
      <!-- Massive Percentage Text -->
      <div class="flex flex-col items-center gap-4">
        <span class="text-6xl md:text-8xl font-display font-bold tabular-nums text-text-primary tracking-tighter mix-blend-difference">
          {{ Math.round(progress) }}<span class="text-3xl md:text-5xl text-accent">%</span>
        </span>
      </div>
      
      <!-- Loading Bar -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 md:w-96 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div 
          class="h-full bg-accent"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useAnimationTrigger } from '~/composables/useAnimationTrigger'

const { isReducedMotion } = useReducedMotion()
const { isPreloaderComplete } = useAnimationTrigger()
const preloaderRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const progress = ref(0)
const isDestroyed = ref(false)

onMounted(() => {
  if (isReducedMotion.value) {
    isDestroyed.value = true
    return
  }

  // Lock body scroll during preloader
  document.body.style.overflow = 'hidden'

  // Animate progress to 100%
  gsap.to(progress, {
    value: 100,
    duration: 2.5,
    ease: "power3.inOut",
    onComplete: () => {
      animateOut()
    }
  })
})

const animateOut = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      isDestroyed.value = true
      document.body.style.overflow = ''
      
      // Update global state for synchronized animations
      isPreloaderComplete.value = true
      
      // Keep emitting the old event just in case
      window.dispatchEvent(new Event('preloader-complete'))
    }
  })

  // Cinematic scale out and fade
  tl.to(textRef.value, {
    scale: 25,
    opacity: 0,
    duration: 1.2,
    ease: "power4.inOut"
  }, "+=0.2")
  .to(preloaderRef.value, {
    yPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  }, "-=0.8")
}
</script>
