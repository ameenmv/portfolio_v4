<template>
  <div 
    class="relative w-full h-full overflow-hidden clip-reveal" 
    ref="containerRef"
  >
    <div 
      class="absolute w-full h-[120%] top-[-10%] left-0 will-change-transform" 
      ref="mediaRef"
    >
      <slot>
        <NuxtImg 
          v-if="src" 
          :src="src" 
          :alt="alt" 
          class="w-full h-full object-cover" 
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: 'Media' },
  speed: { type: Number, default: 0.5 }
})

const containerRef = ref<HTMLElement | null>(null)
const mediaRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) {
    gsap.set(containerRef.value, { clipPath: 'inset(0 0% 0 0)' })
    gsap.set(mediaRef.value, { height: '100%', top: '0%' })
    return
  }

  // Entrance reveal
  gsap.to(containerRef.value, {
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top 85%'
    },
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.5,
    ease: 'power4.inOut'
  })

  // Parallax effect
  gsap.to(mediaRef.value, {
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 20,
    ease: 'none'
  })
})
</script>
