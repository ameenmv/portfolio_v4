<template>
  <div class="sticky top-[calc(var(--header-height)+2rem)] w-full pt-6 md:pt-12" ref="cardRef">
    <div 
      class="w-full h-[750px] md:h-[500px] lg:h-[600px] xl:h-[650px] rounded-[60px] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-16 transition-transform duration-700 will-change-transform origin-top"
      :class="colorClass"
    >
      <!-- Left Column (Icon, Title, Description, Link) -->
      <div class="md:w-2/3 flex flex-col relative z-10 justify-between">
        
        <!-- Icon & Title -->
        <div class="flex items-center gap-6 lg:gap-10 mb-12 md:mb-0">
          <component :is="icon" class="w-16 h-16 lg:w-24 lg:h-24 text-bg-primary shrink-0" />
          <h3 class="text-5xl md:text-6xl xl:text-[80px] font-display font-bold text-bg-primary tracking-tighter leading-none -mt-2">{{ title }}</h3>
        </div>

        <!-- Description & Link -->
        <div class="mt-auto max-w-3xl pt-12 md:pt-20">
          <p class="text-xl md:text-2xl lg:text-3xl text-bg-primary leading-snug font-medium opacity-90 mb-8">
            {{ description }}
          </p>
          <div class="flex items-center gap-3 text-bg-primary font-bold tracking-widest text-sm md:text-base cursor-pointer hover:opacity-70 transition-opacity uppercase" data-cursor-type="default">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Right Column (Tags) -->
      <div class="md:w-1/3 flex flex-col justify-end items-start relative z-10 mt-8 md:mt-0">
        <div class="flex flex-col gap-3 items-start w-full">
          <span 
            v-for="tech in technologies" 
            :key="tech"
            class="px-6 py-3 rounded-full bg-transparent text-bg-primary border border-bg-primary text-sm md:text-base font-medium tracking-wide shadow-sm whitespace-nowrap hover:bg-bg-primary hover:text-text-primary transition-colors cursor-pointer"
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
      // opacity: 0.5,
      ease: 'none'
    })
  }
})
</script>
