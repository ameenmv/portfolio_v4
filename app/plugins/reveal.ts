import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { useReducedMotion } from '~/composables/useReducedMotion'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps(binding, vnode) {
      // Provide empty SSR props to prevent SSR crash
      return {}
    },
    mounted(el, binding) {
      if (!import.meta.client) return

      const { isReducedMotion } = useReducedMotion()
      if (isReducedMotion.value) return

      // Default settings
      let type = 'words, chars'
      let delay = 0
      let stagger = 0.05
      let duration = 1.2
      let yPercent = 100

      // If binding value is an object, parse options
      if (binding.value && typeof binding.value === 'object') {
        if (binding.value.type) type = binding.value.type
        if (binding.value.delay) delay = binding.value.delay
        if (binding.value.stagger) stagger = binding.value.stagger
        if (binding.value.duration) duration = binding.value.duration
      }

      // Add wrapper class to prevent overflow during translation
      el.style.clipPath = 'inset(0 0 -20% 0)'

      // Need slight timeout to let fonts render before splitting
      setTimeout(() => {
        const text = new SplitType(el, { types: type })
        
        let targets = null
        if (type.includes('chars')) targets = text.chars
        else if (type.includes('words')) targets = text.words
        else targets = text.lines

        if (!targets || targets.length === 0) return

        gsap.fromTo(targets, 
          { 
            yPercent: yPercent, 
            opacity: 0,
            rotateZ: binding.modifiers.rotate ? 5 : 0 
          },
          {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
            yPercent: 0,
            opacity: 1,
            rotateZ: 0,
            duration: duration,
            stagger: stagger,
            ease: 'power4.out',
            delay: delay
          }
        )
      }, 50)
    },
    unmounted(el) {
      if (!import.meta.client) return
      // Cleanup SplitType instances attached to this element if any
      const splitInstance = SplitType.data ? SplitType.data[el.id] : null
      if (splitInstance) splitInstance.revert()
    }
  })
})
