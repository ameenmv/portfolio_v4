<template>
  <div class="fixed top-0 right-6 w-4 h-full z-[45] pointer-events-none hidden md:block opacity-70">
    <svg 
      class="w-full h-full" 
      viewBox="0 0 10 100" 
      preserveAspectRatio="none"
    >
      <!-- Background track -->
      <path 
        d="M 5 0 L 5 100" 
        fill="none" 
        stroke="rgba(255,255,255,0.1)" 
        stroke-width="0.5"
      />
      
      <!-- Progress thread -->
      <path 
        ref="progressRef" 
        d="M 5 0 L 5 100" 
        fill="none" 
        stroke="var(--accent)" 
        stroke-width="1.5"
        stroke-linecap="round"
      />
      
      <!-- Moving glow dot -->
      <circle 
        ref="dotRef"
        cx="5"
        cy="0"
        r="2"
        fill="var(--accent)"
        class="opacity-80"
        style="filter: drop-shadow(0 0 4px var(--accent))"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const progressRef = ref<SVGPathElement | null>(null)
const dotRef = ref<SVGCircleElement | null>(null)

let st: ScrollTrigger | null = null

onMounted(() => {
  if (!progressRef.value || !dotRef.value) return

  const pathLength = progressRef.value.getTotalLength()
  
  // Prepare path for drawing
  gsap.set(progressRef.value, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  })

  // Animate on scroll
  st = ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.5,
    onUpdate: (self) => {
      // Draw path
      const drawLength = pathLength * self.progress
      gsap.set(progressRef.value, {
        strokeDashoffset: pathLength - drawLength
      })
      
      // Move dot (viewBox is 0-100 for height)
      gsap.set(dotRef.value, {
        cy: self.progress * 100
      })
    }
  })
})

onUnmounted(() => {
  if (st) st.kill()
})
</script>
