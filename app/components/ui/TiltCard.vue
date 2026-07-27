<template>
  <div 
    ref="cardRef" 
    class="relative perspective-[1000px] w-full"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div 
      ref="innerRef" 
      class="relative w-full h-full transition-transform duration-200 ease-out will-change-transform transform-gpu preserve-3d"
    >
      <!-- Glossy Overlay -->
      <div 
        ref="glossyRef"
        class="absolute inset-0 z-20 pointer-events-none mix-blend-overlay rounded-inherit transition-opacity duration-300 opacity-0"
        style="background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%);"
      ></div>
      
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  maxTilt: { type: Number, default: 15 },
  scale: { type: Number, default: 1.02 }
})

const cardRef = ref<HTMLElement | null>(null)
const innerRef = ref<HTMLElement | null>(null)
const glossyRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

const onMouseMove = (e: MouseEvent) => {
  if (isReducedMotion.value || !cardRef.value || !innerRef.value || !glossyRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  
  // Calculate mouse position relative to center of card (-1 to 1)
  const x = (e.clientX - rect.left) / rect.width - 0.5
  const y = (e.clientY - rect.top) / rect.height - 0.5
  
  // Calculate rotation (invert Y so it tilts toward mouse)
  const rotateX = -y * props.maxTilt * 2
  const rotateY = x * props.maxTilt * 2

  gsap.to(innerRef.value, {
    rotateX,
    rotateY,
    scale: props.scale,
    duration: 0.4,
    ease: 'power2.out',
    overwrite: true
  })
  
  // Move glossy overlay
  gsap.to(glossyRef.value, {
    opacity: 1,
    background: `radial-gradient(circle at ${x * 100 + 50}% ${y * 100 + 50}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
    duration: 0.2,
    overwrite: true
  })
}

const onMouseLeave = () => {
  if (!innerRef.value || !glossyRef.value) return

  gsap.to(innerRef.value, {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    duration: 0.7,
    ease: 'elastic.out(1, 0.3)',
    overwrite: true
  })
  
  gsap.to(glossyRef.value, {
    opacity: 0,
    duration: 0.5,
    overwrite: true
  })
}
</script>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
}
.rounded-inherit {
  border-radius: inherit;
}
</style>
