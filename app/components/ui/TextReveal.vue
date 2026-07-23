<template>
  <component :is="as" ref="textRef" :class="cn('will-change-transform', className)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { cn } from '~/utils/cn'

const props = defineProps({
  as: { type: String, default: 'p' },
  className: { type: String, default: '' },
  delay: { type: Number, default: 0 }
})

const textRef = ref<HTMLElement | null>(null)
let splitInstance: SplitType | null = null

onMounted(() => {
  if (!textRef.value) return

  // Need a small timeout to ensure fonts are loaded before splitting
  setTimeout(() => {
    if (!textRef.value) return
    splitInstance = new SplitType(textRef.value, { types: 'lines, words' })
    
    const lines = splitInstance.lines
    if (lines && lines.length > 0) {
      lines.forEach(line => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'
        line.parentNode?.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })
      
      gsap.fromTo(lines, 
        { yPercent: 120, opacity: 0, rotateZ: 3 },
        { 
          scrollTrigger: {
            trigger: textRef.value,
            start: 'top 85%',
          },
          yPercent: 0, 
          opacity: 1, 
          rotateZ: 0,
          duration: 1.4, 
          stagger: 0.15, 
          ease: 'power4.out',
          delay: props.delay
        }
      )
    }
  }, 100)
})

onUnmounted(() => {
  splitInstance?.revert()
})
</script>
