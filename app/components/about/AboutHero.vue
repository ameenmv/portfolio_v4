<template>
  <section class="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-bg-primary" ref="sectionRef">
    <!-- Full-screen Video Background -->
    <div class="absolute inset-0 z-0">
      <video 
        ref="videoRef"
        src="/me.mp4" 
        class="w-full h-full object-cover opacity-100 scale-110"
        autoplay 
        muted 
        loop 
        playsinline
      ></video>
      <!-- No overlay -->
    </div>

    <!-- Giant Kinetic Typography -->
    <div class="relative z-10 flex flex-col items-center justify-center w-full px-6 pointer-events-none select-none">
      <h1 
        class="font-display font-bold uppercase text-[10vw] md:text-[8vw] leading-[0.85] tracking-tighter text-center text-text-primary drop-shadow-2xl"
      >
        <div class="overflow-hidden hero-word-wrapper">
          <span class="inline-block hero-word will-change-transform">THE ARCHITECT</span>
        </div>
        <div class="overflow-hidden hero-word-wrapper">
          <span class="inline-block hero-word text-accent will-change-transform drop-shadow-xl">BEHIND</span>
        </div>
        <div class="overflow-hidden hero-word-wrapper">
          <span class="inline-block hero-word will-change-transform">THE INTERFACE</span>
        </div>
      </h1>
      
      <div class="mt-8 overflow-hidden flex flex-col items-center hero-subtitle">
        <p class="text-lg md:text-2xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-4 drop-shadow-lg">
          Frontend Tech Lead & Systems Thinker
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimationTrigger } from '~/composables/useAnimationTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
let ctx: gsap.Context

const { onReady } = useAnimationTrigger()

onMounted(() => {
  ctx = gsap.context(() => {
    // 1. Setup initial states
    const tl = gsap.timeline({ paused: true })
    
    tl.fromTo('.hero-word', 
      { yPercent: 120, opacity: 0, rotateZ: 3 },
      { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.4, stagger: 0.1, ease: 'power4.out' }
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 
      "-=0.8"
    )
    .to(videoRef.value, {
      scale: 1,
      duration: 2,
      ease: 'power2.out'
    }, 0)
    
    // 2. Play only when transition allows
    onReady(() => {
      tl.play()
    })

    // 3. Parallax Scroll Effect
    ScrollTrigger.create({
      trigger: sectionRef.value,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(videoRef.value, { yPercent: 30, opacity: 0, ease: "none" })
    })

    // Split words parallax
    const words = sectionRef.value?.querySelectorAll('.hero-word')
    if (words && words.length >= 3) {
      gsap.to(words[0], {
        scrollTrigger: { trigger: sectionRef.value, start: "top top", end: "bottom top", scrub: 1 },
        xPercent: -30, opacity: 0, immediateRender: false
      })
      gsap.to(words[1], {
        scrollTrigger: { trigger: sectionRef.value, start: "top top", end: "bottom top", scrub: 1 },
        scale: 1.2, opacity: 0, immediateRender: false
      })
      gsap.to(words[2], {
        scrollTrigger: { trigger: sectionRef.value, start: "top top", end: "bottom top", scrub: 1 },
        xPercent: 30, opacity: 0, immediateRender: false
      })
    }
  }, sectionRef.value || document.body)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
