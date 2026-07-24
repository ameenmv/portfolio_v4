<template>
  <section class="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-bg-primary">
    <!-- 3D Background -->
    <div class="absolute inset-0 z-0 opacity-80 transition-opacity duration-1000" ref="sceneWrapper">
      <ClientOnly>
        <HeroScene />
        <template #fallback>
          <div class="w-full h-full bg-bg-primary flex items-center justify-center">
            <!-- Optional loader -->
          </div>
        </template>
      </ClientOnly>
    </div>

    <!-- Kinetic Typography Overlay -->
    <div class="relative z-10 flex flex-col items-center justify-center w-full px-6 pointer-events-none select-none mt-16">
      <h1 
        ref="titleRef" 
        class="font-display font-bold uppercase text-[12vw] leading-[0.85] tracking-tighter text-center mix-blend-difference"
      >
        <div class="overflow-hidden">
          <span class="inline-block title-word will-change-transform">Ameen</span>
        </div>
        <div class="overflow-hidden">
          <span class="inline-block title-word text-accent will-change-transform">Mohamed</span>
        </div>
      </h1>
      
      <div ref="subtitleRef" class="mt-8 overflow-hidden flex flex-col items-center clip-reveal">
        <p class="text-xl md:text-3xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-cool mix-blend-difference mb-4">
          I build interfaces that feel alive.
        </p>
        <div class="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-text-secondary/60">
          <span>VUE.JS</span>
          <span class="w-1 h-1 rounded-full bg-accent"></span>
          <span>NUXT.JS</span>
          <span class="w-1 h-1 rounded-full bg-accent"></span>
          <span>TYPESCRIPT</span>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
      <ScrollIndicator />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroScene from './HeroScene.vue'
import ScrollIndicator from './ScrollIndicator.vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const sceneWrapper = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

onMounted(() => {
  if (isReducedMotion.value) {
    // Just ensure it's visible if reduced motion is on
    gsap.set('.title-word', { yPercent: 0, opacity: 1 })
    subtitleRef.value?.classList.remove('clip-reveal')
    return
  }

  const tl = gsap.timeline()
  
  // Entrance animation
  tl.fromTo('.title-word', 
    { yPercent: 120, opacity: 0, rotateZ: 5 },
    { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.4, stagger: 0.15, ease: 'power4.out', delay: 0.3 }
  )
  .to(subtitleRef.value, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.2,
    ease: 'power3.inOut'
  }, "-=0.8")

  // Scroll Parallax Effect
  ScrollTrigger.create({
    trigger: sceneWrapper.value,
    start: "top top",
    end: "bottom top",
    scrub: 1,
    animation: gsap.to(sceneWrapper.value, { yPercent: 40, opacity: 0, scale: 1.1, ease: "none" })
  })

  // Split Logo/Text effect on scroll (studiomodular reference)
  if (titleRef.value) {
    const words = titleRef.value.querySelectorAll('.title-word')
    
    gsap.fromTo(words[0], 
      { xPercent: 0, opacity: 1, rotateZ: 0 },
      {
        scrollTrigger: { trigger: titleRef.value, start: "top 20%", end: "bottom top", scrub: 1 },
        xPercent: -40,
        opacity: 0,
        rotateZ: -5,
        immediateRender: false
      }
    )
    
    gsap.fromTo(words[1], 
      { xPercent: 0, opacity: 1, rotateZ: 0 },
      {
        scrollTrigger: { trigger: titleRef.value, start: "top 20%", end: "bottom top", scrub: 1 },
        xPercent: 40,
        opacity: 0,
        rotateZ: 5,
        immediateRender: false
      }
    )
  }
})
</script>
