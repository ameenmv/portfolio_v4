<template>
  <SitePreloader />
  <NuxtLayout>
    <main id="main-content">
      <NuxtPage :transition="pageTransition" />
    </main>
  </NuxtLayout>

  <!-- The Curtain for Page Transitions -->
  <div 
    ref="curtainRef" 
    class="fixed inset-0 z-[998] bg-bg-secondary pointer-events-none flex items-center justify-center will-change-transform translate-y-[100%]"
  >
    <div ref="spinnerRef" class="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin opacity-0"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHead, useSeoMeta } from '#imports'
import SitePreloader from '~/components/global/SitePreloader.vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const { isReducedMotion } = useReducedMotion()
const curtainRef = ref<HTMLElement | null>(null)
const spinnerRef = ref<HTMLElement | null>(null)

// GSAP Page Transition Hooks
const pageTransition = {
  name: 'page',
  mode: 'out-in',
  css: false,
  onLeave: (el: Element, done: () => void) => {
    if (isReducedMotion.value) {
      done()
      return
    }
    
    // Animate curtain up to cover the screen
    gsap.fromTo(curtainRef.value, 
      { yPercent: 100 },
      { 
        yPercent: 0, 
        duration: 0.8, 
        ease: "power4.inOut",
        onComplete: () => {
          gsap.to(spinnerRef.value, { opacity: 1, duration: 0.2 })
          done()
        }
      }
    )
  },
  onEnter: (el: Element, done: () => void) => {
    if (isReducedMotion.value) {
      done()
      return
    }
    
    // Hide spinner and animate curtain up to reveal new page
    gsap.to(spinnerRef.value, { opacity: 0, duration: 0.2 })
    gsap.to(curtainRef.value, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.1,
      onComplete: () => {
        // Reset curtain position for next time
        gsap.set(curtainRef.value, { yPercent: 100 })
        // Crucial: Refresh scroll triggers after DOM changes
        ScrollTrigger.refresh()
        done()
      }
    })
  }
}

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Ameen Mohamed` : 'Ameen Mohamed | Front-End Developer'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

useSeoMeta({
  description: 'Ameen Mohamed is a Front-End Developer and Tech Lead from Egypt, specializing in building immersive digital experiences, leading teams, and mentoring developers.',
  ogTitle: 'Ameen Mohamed | Front-End Developer',
  ogDescription: 'Ameen Mohamed is a Front-End Developer and Tech Lead from Egypt, specializing in building immersive digital experiences.',
  ogImage: 'https://ameeen.me/og-image.jpg',
  ogUrl: 'https://ameeen.me',
  twitterTitle: 'Ameen Mohamed | Front-End Developer',
  twitterDescription: 'Front-End Developer and Tech Lead specializing in building immersive digital experiences.',
  twitterImage: 'https://ameeen.me/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>
