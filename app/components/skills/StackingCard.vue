<template>
  <div class="sticky top-[calc(var(--header-height)+2rem)] w-full pt-6 md:pt-12" ref="cardRef">
    <div 
      class="w-full rounded-[40px] p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-10 lg:gap-20 transition-transform duration-700 will-change-transform origin-top"
      :class="colorClass"
    >
      <!-- Icon/Header -->
      <div class="md:w-1/3 flex flex-col gap-8 relative z-10">
        <div class="w-20 h-20 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-md border border-black/5">
          <component :is="icon" class="w-10 h-10 text-bg-primary" />
        </div>
        <div>
          <span class="text-bg-primary/60 font-mono text-sm tracking-widest uppercase font-bold mb-3 block">0{{ index + 1 }} //</span>
          <h3 class="text-4xl lg:text-6xl font-display font-bold text-bg-primary tracking-tighter leading-[0.9]">{{ title }}</h3>
        </div>
      </div>
      
      <!-- Content -->
      <div class="md:w-2/3 flex flex-col justify-center relative z-10">
        <p class="text-xl md:text-2xl text-bg-primary opacity-80 leading-relaxed font-medium max-w-2xl">
          {{ description }}
        </p>
        
        <!-- Tags/Tech -->
        <div class="flex flex-wrap gap-3 mt-12">
          <span 
            v-for="tech in technologies" 
            :key="tech"
            class="px-5 py-2.5 rounded-full bg-black/10 text-bg-primary text-xs md:text-sm font-mono tracking-widest uppercase font-bold border border-black/5 backdrop-blur-sm shadow-sm"
          >
            {{ tech }}
          </span>
        </div>
      </div>
      
      <!-- Decorative Background -->
      <div class="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-white/20 rounded-full blur-[80px] z-0 pointer-events-none mix-blend-overlay"></div>
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
