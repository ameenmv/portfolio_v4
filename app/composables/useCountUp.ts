import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useCountUp = (target: number, duration: number = 2, delay: number = 0) => {
  const value = ref(0)
  const elementRef = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!elementRef.value) return

    gsap.to(value, {
      scrollTrigger: {
        trigger: elementRef.value,
        start: 'top 85%'
      },
      value: target,
      duration: duration,
      delay: delay,
      ease: 'power3.out',
      snap: { value: 1 } // ensure it snaps to whole numbers
    })
  })

  return { value, elementRef }
}
