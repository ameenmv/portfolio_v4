<template>
  <section class="relative w-full h-screen overflow-hidden bg-bg-secondary flex flex-col md:flex-row items-center justify-center" ref="sectionRef">
    
    <!-- Image Parallax Reveal -->
    <div class="absolute md:relative inset-0 md:inset-auto md:w-1/2 md:h-full z-0 overflow-hidden mentor-img-container">
      <!-- We use me.mp4 as a beautiful moving portrait, assuming ameen.jpg isn't guaranteed to fit perfectly -->
      <video 
        ref="mediaRef"
        src="/me.mp4" 
        class="w-full h-full object-cover scale-125 origin-center opacity-30 md:opacity-100"
        autoplay 
        muted 
        loop 
        playsinline
      ></video>
      <div class="absolute inset-0 bg-bg-secondary/40 md:bg-transparent mix-blend-overlay"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full md:w-1/2 p-6 md:p-24 flex flex-col justify-center">
      <div class="overflow-hidden">
        <h2 class="text-7xl md:text-[8vw] font-display font-bold text-text-primary leading-none tracking-tighter mentor-title">
          150+
        </h2>
      </div>
      <div class="overflow-hidden mt-2">
        <h3 class="text-3xl md:text-5xl font-display font-bold text-accent uppercase tracking-tighter mentor-title">
          Developers Mentored.
        </h3>
      </div>
      
      <div class="overflow-hidden mt-12">
        <p class="text-xl md:text-3xl font-medium text-text-secondary leading-relaxed mentor-text">
          "Code is read more often than it is written. Abstraction is a tool, not a goal."
        </p>
      </div>

      <div class="flex flex-col gap-4 mt-12 overflow-hidden">
        <div class="flex items-center gap-4 mentor-badge">
          <span class="w-12 h-[1px] bg-accent"></span>
          <span class="font-mono text-sm tracking-widest uppercase">Frontend Tech Lead @ CIS Team MU</span>
        </div>
        <div class="flex items-center gap-4 mentor-badge">
          <span class="w-12 h-[1px] bg-accent"></span>
          <span class="font-mono text-sm tracking-widest uppercase">Vice Head @ CAT Reloaded</span>
        </div>
        <div class="flex items-center gap-4 mentor-badge">
          <span class="w-12 h-[1px] bg-accent"></span>
          <span class="font-mono text-sm tracking-widest uppercase">Instructor @ Technical Gates VI</span>
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
const mediaRef = ref<HTMLVideoElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    
    // Parallax the image within its container
    gsap.to(mediaRef.value, {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 20,
      ease: 'none'
    })

    // Reveal text
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 60%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo('.mentor-title',
      { yPercent: 100 },
      { yPercent: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
    )
    .fromTo('.mentor-text',
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      "-=0.6"
    )
    .fromTo('.mentor-badge',
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
      "-=0.6"
    )

  }, sectionRef.value || document.body)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>
