<template>
  <div 
    v-if="!isTouchDevice && !isReducedMotion" 
    class="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
  >
    <!-- Outer Ring Container (moves, but does NOT scale) -->
    <div 
      ref="cursorRing" 
      class="absolute top-0 left-0 w-12 h-12 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <!-- Visual Circle (stretches and scales) -->
      <div 
        ref="cursorRingVisual"
        class="absolute inset-0 border border-accent/60 rounded-full mix-blend-difference pointer-events-none will-change-transform"
        :class="{ 'border-transparent bg-white/90 mix-blend-normal': isHovering }"
        style="transition: background-color 0.3s, border-color 0.3s;"
      ></div>

      <!-- Text (does NOT scale) -->
      <span 
        class="text-bg-primary text-[10px] font-bold tracking-widest uppercase opacity-0 pointer-events-none relative z-10 whitespace-nowrap"
        :class="{ 'opacity-100': isHovering }"
        style="transition: opacity 0.3s 0.1s;"
      >
        {{ hoverText }}
      </span>
    </div>

    <!-- Inner Dot -->
    <div 
      ref="cursorDot" 
      class="absolute top-0 left-0 w-2 h-2 bg-accent rounded-full mix-blend-difference pointer-events-none will-change-transform"
      :class="{ 'opacity-0 scale-0': isHovering }"
      style="transition: opacity 0.3s, transform 0.3s;"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

const { isReducedMotion } = useReducedMotion()
const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)
const cursorRingVisual = ref<HTMLElement | null>(null)
const isTouchDevice = ref(false)
const isHovering = ref(false)
const hoverText = ref('View')

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let dotX = 0
let dotY = 0

// Variables for velocity calculating
let lastMouseX = 0
let lastMouseY = 0
let velX = 0
let velY = 0

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const updateCursor = () => {
  if (isReducedMotion.value) return
  
  // Fast lerp for dot (almost instant)
  dotX += (mouseX - dotX) * 0.8
  dotY += (mouseY - dotY) * 0.8
  
  // Slower lerp for ring (magnetic drag)
  ringX += (mouseX - ringX) * 0.15
  ringY += (mouseY - ringY) * 0.15
  
  // Calculate velocity for ring stretch
  velX = ringX - lastMouseX
  velY = ringY - lastMouseY
  lastMouseX = ringX
  lastMouseY = ringY
  
  const velocity = Math.sqrt(velX * velX + velY * velY)
  const angle = Math.atan2(velY, velX) * (180 / Math.PI)
  
  let targetScaleX = 1
  let targetScaleY = 1
  
  if (isHovering.value) {
    targetScaleX = 1.8
    targetScaleY = 1.8
  } else {
    const stretch = Math.min(velocity * 0.03, 0.4)
    targetScaleX = 1 + stretch
    targetScaleY = 1 - (stretch * 0.5)
  }

  if (cursorDot.value) {
    gsap.set(cursorDot.value, { 
      x: dotX, 
      y: dotY 
    })
  }

  if (cursorRing.value && cursorRingVisual.value) {
    // Move the container (without scaling)
    gsap.set(cursorRing.value, { 
      x: ringX, 
      y: ringY
    })
    
    // Scale and rotate the visual circle ONLY
    gsap.set(cursorRingVisual.value, {
      scaleX: targetScaleX,
      scaleY: targetScaleY,
      rotation: velocity > 0.5 && !isHovering.value ? angle : undefined
    })
  }
  
  requestAnimationFrame(updateCursor)
}

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const clickable = target.closest('a, button, [data-hover-text]')
  
  if (clickable) {
    isHovering.value = true
    const text = clickable.getAttribute('data-hover-text')
    hoverText.value = text || 'Explore'
  }
}

const onMouseOut = () => {
  isHovering.value = false
}

onMounted(() => {
  isTouchDevice.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
  
  if (!isTouchDevice.value && !isReducedMotion.value) {
    // Initial center position
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
    dotX = mouseX
    dotY = mouseY
    ringX = mouseX
    ringY = mouseY
    lastMouseX = mouseX
    lastMouseY = mouseY
    
    // Explicitly set xPercent/yPercent via GSAP so it doesn't conflict with Tailwind transforms
    if (cursorDot.value && cursorRing.value) {
      gsap.set([cursorDot.value, cursorRing.value], { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY })
    }
    
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    
    requestAnimationFrame(updateCursor)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
})
</script>
