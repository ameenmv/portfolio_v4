import { ref, onMounted, onUnmounted } from 'vue'

export function useReducedMotion() {
  const isReducedMotion = ref(false)
  let mediaQuery: MediaQueryList | null = null

  const updateMotion = (e: MediaQueryListEvent | MediaQueryList) => {
    isReducedMotion.value = e.matches
  }

  onMounted(() => {
    if (window.matchMedia) {
      mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      isReducedMotion.value = mediaQuery.matches
      mediaQuery.addEventListener('change', updateMotion)
    }
  })

  onUnmounted(() => {
    if (mediaQuery) {
      mediaQuery.removeEventListener('change', updateMotion)
    }
  })

  return { isReducedMotion }
}
