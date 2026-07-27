import { onMounted, onUnmounted } from 'vue'
import { useHead } from '#imports'

export const useVisibilityMagic = () => {
  const originalTitle = 'Ameen Mohamed | Front-End Developer'
  const awayTitle = '👀 Come back! - Ameen'

  const handleVisibilityChange = () => {
    if (document.hidden) {
      document.title = awayTitle
    } else {
      document.title = originalTitle
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })
}
