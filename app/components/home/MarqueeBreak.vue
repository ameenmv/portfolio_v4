<template>
  <div class="relative w-full py-12 md:py-24 overflow-hidden bg-bg-primary flex items-center border-y border-white/5" ref="marqueeRef">
    <div class="flex animate-marquee-fast whitespace-nowrap text-[8vw] font-display font-black tracking-tighter uppercase leading-none opacity-10">
      <span v-for="i in 4" :key="i" class="px-8 flex items-center gap-12">
        <span v-for="(item, index) in items" :key="item" :class="{ 'text-accent': index % 2 !== 0 }">
          {{ item }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  items: { 
    type: Array as () => string[], 
    default: () => ['VUE.JS', 'NUXT 3', 'TYPESCRIPT', 'GSAP', 'THREE.JS', 'TAILWIND']
  }
})

const marqueeRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) return

  // Parallax the marquee container on scroll
  gsap.to(marqueeRef.value, {
    scrollTrigger: {
      trigger: marqueeRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: 50,
    ease: 'none'
  })
})
</script>

<style scoped>
.animate-marquee-fast {
  animation: marquee-fast 20s linear infinite;
  will-change: transform;
}

@keyframes marquee-fast {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>
