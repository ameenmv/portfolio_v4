<template>
  <NuxtLink :to="`/projects/${slug}`" class="block group" data-hover-text="View">
    <div class="relative w-full rounded-2xl overflow-hidden bg-bg-elevated aspect-[4/3] mb-6 clip-reveal" ref="cardRef">
      <!-- Image/Video -->
      <NuxtImg 
        v-if="image"
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center border border-white/5 bg-bg-elevated transition-transform duration-700 group-hover:scale-105">
        <span class="text-text-secondary font-mono text-sm opacity-50">{{ title }}</span>
        <span class="text-xs text-text-secondary opacity-30 mt-2">Placeholder</span>
      </div>
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
    
    <!-- Meta -->
    <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
      <div>
        <h3 class="text-2xl font-display font-bold text-text-primary group-hover:text-accent transition-colors duration-300">{{ title }}</h3>
        <p class="text-text-secondary mt-1 text-sm">{{ role }}</p>
      </div>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 max-w-[50%] justify-end">
        <span 
          v-for="tag in tags" 
          :key="tag" 
          class="px-3 py-1 text-[10px] font-mono tracking-widest uppercase border border-white/10 rounded-full text-text-secondary whitespace-nowrap"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: '' },
  tags: { type: Array as () => string[], default: () => [] }
})

const cardRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) {
    gsap.set(cardRef.value, { clipPath: 'inset(0 0% 0 0)' })
    return
  }

  if (cardRef.value) {
    gsap.to(cardRef.value, {
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top 85%'
      },
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power4.inOut'
    })
  }
})
</script>
