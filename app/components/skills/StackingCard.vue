<template>
  <div class="sticky top-[100px] w-full pt-6 md:pt-12" ref="cardRef">
    <div 
      class="w-full rounded-[30px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-16 border border-white/10 transition-transform duration-700 will-change-transform origin-top"
      :class="colorClass"
    >
      <!-- Icon/Header -->
      <div class="md:w-1/3 flex flex-col gap-6 relative z-10">
        <div class="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <component :is="icon" class="w-8 h-8 text-bg-primary" />
        </div>
        <h3 class="text-3xl lg:text-5xl font-display font-bold text-bg-primary tracking-tighter">{{ title }}</h3>
      </div>
      
      <!-- Content -->
      <div class="md:w-2/3 flex flex-col justify-between relative z-10">
        <p class="text-lg text-bg-primary/80 leading-relaxed max-w-xl font-medium">
          {{ description }}
        </p>
        
        <!-- Tags/Tech -->
        <div class="flex flex-wrap gap-3 mt-12">
          <span 
            v-for="tech in technologies" 
            :key="tech"
            class="px-4 py-2 rounded-full bg-bg-primary text-text-primary text-[10px] sm:text-xs font-mono tracking-widest uppercase font-semibold border border-white/10"
          >
            {{ tech }}
          </span>
        </div>
      </div>
      
      <!-- Decorative Background -->
      <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: { type: Array as () => string[], required: true },
  colorClass: { type: String, required: true },
  icon: { type: Object, required: true },
  index: { type: Number, required: true }
})

const cardRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) return

  const inner = cardRef.value?.firstElementChild
  if (cardRef.value && inner) {
    gsap.to(inner, {
      scrollTrigger: {
        trigger: cardRef.value,
        start: 'top top',
        end: '+=1000',
        scrub: true
      },
      scale: 0.95,
      opacity: 0.5,
      ease: 'none'
    })
  }
})
</script>
