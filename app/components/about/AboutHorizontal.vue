<template>
  <section class="about-horizontal relative w-full bg-bg-primary overflow-hidden" ref="sectionRef">
    
    <!-- Giant Background Text (Parallaxed inside horizontal scroll) -->
    <div class="absolute inset-0 flex items-center z-0 pointer-events-none overflow-hidden select-none opacity-20">
      <div class="whitespace-nowrap font-display font-bold text-[20vw] uppercase tracking-tighter text-transparent -webkit-text-stroke leading-none" ref="bgTextRef">
        PERFORMANCE • ARCHITECTURE • RESILIENCE • EVENT LOOP
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div class="h-screen flex items-center" ref="scrollContainerRef">
      <div class="flex gap-12 md:gap-32 px-12 md:px-32 w-[300vw] h-full items-center relative z-10" ref="horizontalWrapperRef">
        
        <!-- Card 1 -->
        <div class="w-[80vw] md:w-[40vw] h-[60vh] shrink-0 bg-bg-secondary/80 backdrop-blur-md rounded-[40px] border border-white/10 p-10 flex flex-col justify-center">
          <span class="text-accent font-mono text-sm tracking-widest uppercase mb-4">Module 01</span>
          <h3 class="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">The Rendering Path</h3>
          <p class="text-text-secondary text-xl leading-relaxed">
            I don't just write components; I orchestrate the browser. Optimizing the Critical Rendering Path is an art of balancing Layout, Paint, and Composite.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="w-[80vw] md:w-[40vw] h-[60vh] shrink-0 bg-bg-secondary/80 backdrop-blur-md rounded-[40px] border border-white/10 p-10 flex flex-col justify-center">
          <span class="text-accent font-mono text-sm tracking-widest uppercase mb-4">Module 02</span>
          <h3 class="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">Resilient APIs</h3>
          <p class="text-text-secondary text-xl leading-relaxed">
            The network is a liar. I design frontend architectures that anticipate failure through Idempotency, Circuit Breakers, and Exponential Backoff.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="w-[80vw] md:w-[40vw] h-[60vh] shrink-0 bg-bg-secondary/80 backdrop-blur-md rounded-[40px] border border-white/10 p-10 flex flex-col justify-center">
          <span class="text-accent font-mono text-sm tracking-widest uppercase mb-4">Module 03</span>
          <h3 class="text-4xl md:text-6xl font-display font-bold text-text-primary mb-6">The Event Loop</h3>
          <p class="text-text-secondary text-xl leading-relaxed">
            Mastering the single-threaded nature of JS. Understanding Macrotasks vs Microtasks is the difference between a sluggish app and a fluid experience.
          </p>
        </div>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const horizontalWrapperRef = ref<HTMLElement | null>(null)
const bgTextRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // Determine the amount to scroll horizontally
    const scrollAmount = () => -(horizontalWrapperRef.value?.scrollWidth || 0) + window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: () => `+=${horizontalWrapperRef.value?.scrollWidth || window.innerWidth * 3}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    // Move cards horizontally
    tl.to(horizontalWrapperRef.value, {
      x: scrollAmount,
      ease: "none"
    })

    // Move background text slightly faster for parallax
    tl.to(bgTextRef.value, {
      x: () => scrollAmount() * 1.5,
      ease: "none"
    }, 0)

  }, sectionRef.value || document.body)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.-webkit-text-stroke {
  -webkit-text-stroke: 2px var(--text-secondary);
}
</style>
