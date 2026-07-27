import { onMounted, onUnmounted, unref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { MaybeRef } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

export function useSectionAnimation(elRef: MaybeRef<HTMLElement | null>) {
  let ctx: gsap.Context

  onMounted(() => {
    const el = unref(elRef)
    if (!el) return

    const { isReducedMotion } = useReducedMotion()
    if (isReducedMotion.value) return

    // Ensure parent doesn't collapse during 3D transforms by setting perspective
    gsap.set(el, { transformPerspective: 1200 })

    ctx = gsap.context(() => {
      
      // We wrap the animation logic in ScrollTrigger callbacks for precise control 
      // when entering and leaving the viewport boundaries.
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => {
          gsap.fromTo(el, 
            { y: 80, scale: 0.95, opacity: 0, rotateX: 5 }, 
            { y: 0, scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }
          )
        },
        onLeave: () => {
          gsap.fromTo(el, 
            { y: 0, scale: 1, opacity: 1, rotateX: 0 }, 
            { y: -80, scale: 0.95, opacity: 0, rotateX: -5, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }
          )
        },
        onEnterBack: () => {
          gsap.fromTo(el, 
            { y: -80, scale: 0.95, opacity: 0, rotateX: -5 }, 
            { y: 0, scale: 1, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }
          )
        },
        onLeaveBack: () => {
          gsap.fromTo(el, 
            { y: 0, scale: 1, opacity: 1, rotateX: 0 }, 
            { y: 80, scale: 0.95, opacity: 0, rotateX: 5, duration: 1.2, ease: 'power3.out', overwrite: 'auto' }
          )
        }
      })

      // Initial state before any scroll occurs (hidden below)
      gsap.set(el, { y: 80, scale: 0.95, opacity: 0, rotateX: 5 })

    }, el)
  })

  onUnmounted(() => {
    if (ctx) ctx.revert()
  })
}
