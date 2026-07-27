import { gsap } from 'gsap'
import { useScrollVelocity } from '~/composables/useScrollVelocity'
import { useReducedMotion } from '~/composables/useReducedMotion'

export default defineNuxtPlugin((nuxtApp) => {
  const { isReducedMotion } = useReducedMotion()
  
  if (isReducedMotion.value) return

  const { skewY } = useScrollVelocity()
  
  // Set up GSAP quickSetters for better performance
  const skewSetters: Array<(value: number) => void> = []

  nuxtApp.hook('page:finish', () => {
    // Re-initialize elements when page changes
    const elements = document.querySelectorAll('[data-velocity-skew]')
    skewSetters.length = 0 // clear old setters
    
    elements.forEach(el => {
      // Create a quick setter for each element's skewY property
      gsap.set(el, { transformOrigin: 'center center', force3D: true })
      skewSetters.push(gsap.quickSetter(el, 'skewY', 'deg'))
    })
  })

  // Hook into requestAnimationFrame to update skews
  const tick = () => {
    if (skewSetters.length > 0) {
      const currentSkew = skewY.value
      // Apply the same skew to all registered elements
      skewSetters.forEach(setter => setter(currentSkew))
    }
    requestAnimationFrame(tick)
  }

  if (typeof window !== 'undefined') {
    requestAnimationFrame(tick)
  }
})
