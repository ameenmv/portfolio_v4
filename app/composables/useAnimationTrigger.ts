import { useState, watch, computed } from '#imports'

export const useAnimationTrigger = () => {
  // Global states across the entire Nuxt app
  const isPreloaderComplete = useState('isPreloaderComplete', () => false)
  const isPageTransitioning = useState('isPageTransitioning', () => false)

  // Derived state that guarantees both conditions are met
  const isReady = computed(() => isPreloaderComplete.value && !isPageTransitioning.value)

  /**
   * Helper function to wrap GSAP timelines or any entrance animations.
   * Ensures the animation only fires AFTER the splash screen has fully disappeared,
   * AND after any page transition curtain has lifted.
   */
  const onReady = (callback: () => void) => {
    if (isReady.value) {
      callback()
    } else {
      const unwatch = watch(isReady, (readyVal) => {
        if (readyVal) {
          callback()
          unwatch() // Cleanup watcher
        }
      })
    }
  }

  return { isPreloaderComplete, isPageTransitioning, onReady }
}
