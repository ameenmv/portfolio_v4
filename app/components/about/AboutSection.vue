<template>
  <section id="about" class="py-32 px-6 md:px-12 bg-bg-secondary relative">
    <div class="container mx-auto">
      <SectionIntro 
        pretitle="The Developer" 
        title="Engineering digital experiences." 
        description="I'm a Front-End Developer with a focus on building performant, scalable, and immersive web applications. I bridge the gap between complex engineering and pixel-perfect design."
        class="mb-24"
      />
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        <!-- Text Content -->
        <div class="lg:col-span-7 order-2 lg:order-1">
          <div class="space-y-8 text-lg text-text-secondary leading-relaxed">
            <TextReveal :delay="0.2">
              Currently working at <span class="text-accent font-medium">neop</span>, I specialize in the Vue.js ecosystem. From enterprise fintech solutions to real-time BCI platforms, I've delivered over 15 production applications.
            </TextReveal>
            <TextReveal :delay="0.3">
              Beyond coding, I lead the Frontend track at CIS Team, mentoring over 150 developers, and share my knowledge through my YouTube channel, Coding with Ameen.
            </TextReveal>
            <TextReveal :delay="0.4">
              I believe in clean architecture, smooth animations, and the power of open source.
            </TextReveal>
            
            <div class="pt-8">
              <NuxtLink to="/about" class="inline-flex items-center gap-2 group text-text-primary font-medium border-b border-accent pb-1" data-hover-text="Read More">
                Full Story
                <span class="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
        
        <!-- Image/Visual -->
        <div class="lg:col-span-5 order-1 lg:order-2" ref="imageRef">
          <div class="relative w-full aspect-[4/5] rounded-2xl overflow-hidden clip-reveal bg-bg-elevated">
            <!-- Placeholder for Ameen's photo -->
            <div class="absolute inset-0 flex flex-col items-center justify-center border border-white/5 rounded-2xl">
              <span class="text-text-secondary font-mono text-sm opacity-50">[ Profile Image ]</span>
              <span class="text-xs text-text-secondary opacity-30 mt-2">Will be updated with your photo</span>
            </div>
          </div>
          
          <!-- Stats Row -->
          <div class="grid grid-cols-3 gap-4 mt-8">
            <div class="flex flex-col gap-1">
              <span class="text-3xl font-display font-bold text-text-primary">15+</span>
              <span class="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Projects</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-3xl font-display font-bold text-text-primary">840+</span>
              <span class="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Components</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-3xl font-display font-bold text-text-primary">150+</span>
              <span class="text-[10px] font-mono text-text-secondary uppercase tracking-widest">Mentees</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionIntro from '../ui/SectionIntro.vue'
import TextReveal from '../ui/TextReveal.vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const imageRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) {
    gsap.set('.clip-reveal', { clipPath: 'inset(0 0% 0 0)' })
    return
  }

  const el = imageRef.value?.querySelector('.clip-reveal')
  if (el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: imageRef.value,
        start: 'top 80%'
      },
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.5,
      ease: 'power4.inOut'
    })
  }
})
</script>
