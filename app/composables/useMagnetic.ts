import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

export const useMagnetic = (elementRef: Ref<any>, intensity: number = 0.5) => {
  const { isReducedMotion } = useReducedMotion()
  
  let xTo: gsap.QuickToFunc | null = null
  let yTo: gsap.QuickToFunc | null = null

  const getEl = (): HTMLElement | null => {
    if (!elementRef.value) return null
    return elementRef.value.$el || elementRef.value
  }

  const handleMouseMove = (e: MouseEvent) => {
    const el = getEl()
    if (isReducedMotion.value || !el || !xTo || !yTo) return

    const { clientX, clientY } = e
    const { height, width, left, top } = el.getBoundingClientRect()
    
    // Calculate distance from center
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    // Apply intensity
    xTo(x * intensity)
    yTo(y * intensity)
  }

  const handleMouseLeave = () => {
    if (xTo && yTo) {
      xTo(0)
      yTo(0)
    }
  }

  onMounted(() => {
    if (isReducedMotion.value) return

    // Allow time for DOM to mount properly before initializing
    setTimeout(() => {
      const el = getEl()
      if (el) {
        xTo = gsap.quickTo(el, 'x', { duration: 1, ease: 'elastic.out(1, 0.3)' })
        yTo = gsap.quickTo(el, 'y', { duration: 1, ease: 'elastic.out(1, 0.3)' })
        
        el.addEventListener('mousemove', handleMouseMove)
        el.addEventListener('mouseleave', handleMouseLeave)
      }
    }, 100)
  })

  onUnmounted(() => {
    const el = getEl()
    if (el) {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  })
}
