<template>
  <div 
    v-if="!isTouchDevice && !isReducedMotion" 
    class="pointer-events-none fixed top-0 left-0 z-[100] w-full h-full overflow-hidden"
  >
    <div 
      ref="cursorDot" 
      class="absolute top-0 left-0 w-4 h-4 bg-accent rounded-full mix-blend-difference -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center transition-all duration-300 ease-out"
      :class="{ 'w-24 h-24 bg-white/90 mix-blend-normal': isHovering }"
    >
      <span 
        class="text-bg-primary text-xs font-bold tracking-widest uppercase opacity-0 transition-opacity duration-300"
        :class="{ 'opacity-100': isHovering }"
      >
        {{ hoverText }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

const { isReducedMotion } = useReducedMotion()
const cursorDot = ref<HTMLElement | null>(null)
const isTouchDevice = ref(false)
const isHovering = ref(false)
const hoverText = ref('View')

let mouseX = 0
let mouseY = 0
let dotX = 0
let dotY = 0

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const updateCursor = () => {
  if (isReducedMotion.value) return
  
  // Lerp for smooth following
  dotX += (mouseX - dotX) * 0.15
  dotY += (mouseY - dotY) * 0.15
  
  if (cursorDot.value) {
    gsap.set(cursorDot.value, {
      x: dotX,
      y: dotY
    })
  }
  
  requestAnimationFrame(updateCursor)
}

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  
  // Check if we're hovering a clickable element or data-hover element
  const clickable = target.closest('a, button, [data-hover]')
  
  if (clickable) {
    isHovering.value = true
    const text = clickable.getAttribute('data-hover-text')
    if (text) {
      hoverText.value = text
    } else {
      hoverText.value = 'Click'
    }
  }
}

const onMouseOut = (e: MouseEvent) => {
  isHovering.value = false
}

onMounted(() => {
  // Check for touch device
  isTouchDevice.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
  
  if (!isTouchDevice.value && !isReducedMotion.value) {
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    
    // Initial position to center to prevent flying in from corner
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
    dotX = mouseX
    dotY = mouseY
    
    requestAnimationFrame(updateCursor)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
})
</script>
