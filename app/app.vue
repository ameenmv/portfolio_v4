<template>
  <SitePreloader />
  <NuxtLayout>
    <main id="main-content">
      <NuxtPage />
    </main>
  </NuxtLayout>

  <!-- The Curtain for Page Transitions -->
  <div 
    ref="curtainRef" 
    class="fixed inset-0 z-[100] bg-text-primary flex items-center justify-center pointer-events-none"
    style="transform: translateY(100%);"
  >
    <div ref="spinnerRef" class="w-12 h-12 border-4 border-bg-primary border-t-accent rounded-full animate-spin opacity-0"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHead, useSeoMeta, useNuxtApp, useRouter } from '#imports'
import SitePreloader from '~/components/global/SitePreloader.vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const { isReducedMotion } = useReducedMotion()
const curtainRef = ref<HTMLElement | null>(null)
const spinnerRef = ref<HTMLElement | null>(null)

const nuxtApp = useNuxtApp()
const router = useRouter()

// Bulletproof Custom Page Transition using Router Hooks
if (import.meta.client) {
  router.beforeResolve(async (to, from) => {
    if (to.path === from.path) return
    if (isReducedMotion.value) return
    if (!curtainRef.value || !spinnerRef.value) return

    // Animate curtain up to cover the screen BEFORE navigating
    await new Promise((resolve) => {
      gsap.fromTo(curtainRef.value, 
        { yPercent: 100 },
        { 
          yPercent: 0, 
          duration: 0.7, 
          ease: "power4.inOut",
          onComplete: () => {
            gsap.to(spinnerRef.value, { opacity: 1, duration: 0.2 })
            resolve(true)
          }
        }
      )
    })
  })

  nuxtApp.hook('page:finish', () => {
    if (isReducedMotion.value) return
    if (!curtainRef.value || !spinnerRef.value) return
    
    // Hide spinner and animate curtain up to reveal new page AFTER navigating
    gsap.to(spinnerRef.value, { opacity: 0, duration: 0.2 })
    gsap.to(curtainRef.value, {
      yPercent: -100,
      duration: 0.7,
      ease: "power4.inOut",
      delay: 0.1,
      onComplete: () => {
        // Reset curtain position for next time
        gsap.set(curtainRef.value, { yPercent: 100 })
        // Crucial: Refresh scroll triggers after DOM changes
        ScrollTrigger.refresh()
      }
    })
  })
}

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Ameen Mohamed` : 'Ameen Mohamed | Front-End Developer'
  },
  link: [
    { rel: 'icon', type: 'image/png', href: '/ameeen.png' }
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
