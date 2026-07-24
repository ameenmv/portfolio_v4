<template>
  <header 
    ref="headerRef"
    class="fixed top-0 left-0 w-full z-50 h-[var(--header-height)] flex items-center justify-between px-6 md:px-12 transition-transform duration-500 will-change-transform"
    :class="{ 'backdrop-blur-md bg-bg-primary/70 border-b border-white/5': hasScrolled }"
  >
    <!-- Logo & Status -->
    <div class="flex items-center gap-6">
      <NuxtLink to="/" class="font-display font-bold text-2xl tracking-tighter hover:text-accent transition-colors duration-300" data-hover-text="Home">
        AM.
      </NuxtLink>
      <div class="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
        <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        <span class="text-[10px] font-mono text-accent uppercase tracking-widest">Available for freelance</span>
      </div>
    </div>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center gap-8">
      <NuxtLink 
        v-for="link in links" 
        :key="link.name" 
        :to="link.path"
        class="nav-link relative text-sm font-medium tracking-wide uppercase text-text-secondary hover:text-text-primary transition-colors overflow-hidden group"
        data-hover-text="Go"
      >
        <span class="inline-block transition-transform duration-300 group-hover:-translate-y-full">{{ link.name }}</span>
        <span class="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-accent">{{ link.name }}</span>
      </NuxtLink>
    </nav>

    <!-- CTA & Mobile Toggle -->
    <div class="flex items-center gap-4">
      <!-- Sound Toggle -->
      <button 
        class="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-text-secondary hover:text-accent hover:border-accent transition-colors duration-300"
        @click="toggleMute"
        data-hover-text="Sound"
        :aria-label="isMuted ? 'Unmute Sound' : 'Mute Sound'"
      >
        <Volume2 v-if="!isMuted" class="w-4 h-4" />
        <VolumeX v-else class="w-4 h-4" />
      </button>

      <NuxtLink 
        to="/#contact" 
        ref="btnRef"
        class="hidden md:flex items-center justify-center h-10 px-5 rounded-full bg-accent text-bg-primary font-medium text-sm hover:bg-white transition-colors duration-300 btn-special will-change-transform"
        data-hover-text="Chat"
      >
        Let's Talk
      </NuxtLink>
      
      <button 
        class="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle Menu"
      >
        <span class="w-6 h-[2px] bg-white transition-all duration-300" :class="{ 'rotate-45 translate-y-[8px]': isMenuOpen }"></span>
        <span class="w-4 h-[2px] bg-white transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
        <span class="w-6 h-[2px] bg-white transition-all duration-300" :class="{ '-rotate-45 -translate-y-[8px]': isMenuOpen }"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <div 
        class="fixed inset-0 bg-bg-primary z-[45] flex flex-col justify-center px-12 transition-all duration-500 md:hidden"
        :class="isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
      >
        <nav class="flex flex-col gap-6 text-4xl font-display font-bold">
          <NuxtLink 
            v-for="(link, index) in links" 
            :key="link.name" 
            :to="link.path"
            class="hover:text-accent transition-colors"
            @click="isMenuOpen = false"
            :style="{ transitionDelay: `${index * 100}ms` }"
            :class="isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Volume2, VolumeX } from 'lucide-vue-next'
import { useSound } from '~/composables/useSound'
import { useMagnetic } from '~/composables/useMagnetic'

const { isMuted, toggleMute } = useSound()

const links = [
  { name: 'Work', path: '/#work' },
  { name: 'About', path: '/about' },
  { name: 'Open Source', path: '/open-source' },
  { name: 'Contact', path: '#contact' }
]

const isMenuOpen = ref(false)
const hasScrolled = ref(false)
const headerRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)

useMagnetic(btnRef, 0.4)

let lastScrollY = 0

onMounted(() => {
  // GSAP scroll trigger to hide/show header
  const showAnim = gsap.from(headerRef.value, { 
    yPercent: -100,
    paused: true,
    duration: 0.3,
    ease: "power2.out"
  }).progress(1)

  ScrollTrigger.create({
    start: "top top-=" + 100,
    onUpdate: (self) => {
      hasScrolled.value = self.scroll() > 50
      if (self.direction === 1) {
        // scrolling down
        showAnim.reverse()
      } else {
        // scrolling up
        showAnim.play()
      }
    }
  })
})
</script>
