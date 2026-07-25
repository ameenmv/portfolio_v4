import { ref, onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'

export const useScrollVelocity = () => {
  const velocity = ref(0)
  const skewY = ref(0)
  const { isReducedMotion } = useReducedMotion()
  
  let frameId: number | null = null
  let lastVelocity = 0

  const updateVelocity = () => {
    if (isReducedMotion.value) return
    
    // Get velocity from ScrollTrigger
    // ScrollTrigger instance needs to be global or we can just track scroll delta
    // Since we don't have a global lenis instance directly exposed, we'll calculate it
  }

  onMounted(() => {
    if (isReducedMotion.value) return
    
    // Create a global ScrollTrigger to track velocity
    ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        // Clamp velocity to avoid extreme skews
        const vel = Math.max(-1000, Math.min(1000, self.getVelocity()))
        // Map velocity to a skew angle (max ~15 degrees)
        lastVelocity = vel * 0.005 
      }
    })

    const tick = () => {
      // Smoothly damp velocity back to 0
      velocity.value += (lastVelocity - velocity.value) * 0.1
      skewY.value = velocity.value
      
      // Auto-decay lastVelocity
      lastVelocity *= 0.9
      
      frameId = requestAnimationFrame(tick)
    }
    
    tick()
  })

  onUnmounted(() => {
    if (frameId) cancelAnimationFrame(frameId)
  })

  return { velocity, skewY }
}
