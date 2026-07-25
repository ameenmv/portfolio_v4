<template>
  <SitePreloader />
  <NuxtLayout>
    <main id="main-content">
      <NuxtPage :transition="pageTransition" />
    </main>
  </NuxtLayout>

  <!-- Transition Overlay -->
  <div 
    ref="curtainRef" 
    class="page-transition-overlay"
  >
    <img
      ref="logoRef"
      src="/ameeen.png"
      alt="Ameen"
      class="w-16 h-16 md:w-20 md:h-20"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHead, useSeoMeta } from '#imports'
import SitePreloader from '~/components/global/SitePreloader.vue'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useAnimationTrigger } from '~/composables/useAnimationTrigger'

const { isReducedMotion } = useReducedMotion()
const { isPageTransitioning } = useAnimationTrigger()
const curtainRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)

const pageTransition = {
  name: 'page',
  mode: 'out-in' as const,
  onBeforeLeave() {
    isPageTransitioning.value = true
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  },
  onLeave(_el: Element, done: () => void) {
    if (isReducedMotion.value || !curtainRef.value || !logoRef.value) {
      done()
      return
    }

    const tl = gsap.timeline({ onComplete: done })

    // Overlay slides in from top
    tl.set(curtainRef.value, { display: 'flex', yPercent: -100 })
    tl.set(logoRef.value, { scale: 0.5, opacity: 0, rotation: -20 })
    
    tl.to(curtainRef.value, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    })
    
    // Logo bounces in
    tl.to(logoRef.value, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'back.out(1.7)'
    }, "-=0.15")
  },
  onEnter(_el: Element, done: () => void) {
    if (isReducedMotion.value || !curtainRef.value || !logoRef.value) {
      isPageTransitioning.value = false
      done()
      return
    }

    const tl = gsap.timeline({ 
      onComplete: () => {
        gsap.set(curtainRef.value, { display: 'none' })
        ScrollTrigger.refresh()
        isPageTransitioning.value = false
        done()
      } 
    })
    
    // Short hold so the logo is visible
    tl.to(logoRef.value, {
      scale: 0.5,
      opacity: 0,
      rotation: 20,
      duration: 0.2,
      ease: 'power2.in'
    })
    
    // Overlay slides out downward
    tl.to(curtainRef.value, {
      yPercent: 100,
      duration: 0.5,
      ease: 'power3.inOut'
    }, "-=0.05")
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

<style>
/* Page transition overlay */
.page-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg-primary);
  display: none;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

/* Ensure page content doesn't flash during transition */
.page-leave-active,
.page-enter-active {
  transition: none;
}
</style>
