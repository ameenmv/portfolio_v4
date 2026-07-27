<template>
  <component :is="as" ref="textRef" :class="cn('will-change-transform', className)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { cn } from '~/utils/cn'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  as: { type: String, default: 'p' },
  className: { type: String, default: '' },
})

const textRef = ref<HTMLElement | null>(null)
let splitInstance: SplitType | null = null
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (!textRef.value || isReducedMotion.value) return

  // Small timeout to ensure layout is ready
  setTimeout(() => {
    if (!textRef.value) return
    splitInstance = new SplitType(textRef.value, { types: 'words, chars' })
    
    const chars = splitInstance.chars
    if (chars && chars.length > 0) {
      // Set initial state
      gsap.set(chars, { opacity: 0.15 })
      
      // Scrub animation
      gsap.to(chars, {
        scrollTrigger: {
          trigger: textRef.value,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1, // Smooth scrub
        },
        opacity: 1,
        stagger: 0.1,
        ease: 'none'
      })
    }
  }, 100)
})

onUnmounted(() => {
  splitInstance?.revert()
})
</script>
