import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Observer } from 'gsap/Observer'
import { TextPlugin } from 'gsap/TextPlugin'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger, Observer, TextPlugin)
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      Observer,
      TextPlugin
    }
  }
})
