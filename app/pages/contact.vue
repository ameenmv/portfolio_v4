<template>
  <div class="page-contact min-h-[100dvh] bg-bg-primary relative overflow-hidden flex flex-col justify-between pt-[calc(var(--header-height))]">
    
    <!-- Ambient GSAP Background -->
    <div ref="ambientRef" class="absolute top-1/4 -left-1/4 w-[60vw] h-[60vw] bg-accent/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
    <div ref="ambientRef2" class="absolute bottom-0 -right-1/4 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col items-center justify-center container mx-auto px-6 md:px-12 relative z-10 py-12 md:py-0 w-full max-w-7xl">
      <ContactForm />
    </div>

    <!-- Footer Links -->
    <div class="w-full border-t border-white/5 bg-bg-primary/80 backdrop-blur-xl relative z-20">
      <div class="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <a href="mailto:ameeenmv@gmail.com" class="text-text-secondary hover:text-accent font-mono text-sm tracking-widest uppercase transition-colors" data-hover-text="Email">ameeenmv@gmail.com</a>
        </div>
        
        <div class="flex items-center justify-center flex-wrap gap-6 md:gap-12">
          <a href="https://github.com/ameeenmv" target="_blank" class="text-text-secondary hover:text-accent font-mono text-sm tracking-widest uppercase transition-colors" data-hover-text="GitHub">GitHub</a>
          <a href="https://linkedin.com/in/ameeenmv" target="_blank" class="text-text-secondary hover:text-accent font-mono text-sm tracking-widest uppercase transition-colors" data-hover-text="LinkedIn">LinkedIn</a>
          <a href="https://youtube.com/@ameeenmv" target="_blank" class="text-text-secondary hover:text-accent font-mono text-sm tracking-widest uppercase transition-colors" data-hover-text="YouTube">YouTube</a>
        </div>
        
        <div>
          <a href="/resume.pdf" download class="inline-flex items-center gap-2 text-text-primary hover:text-accent font-mono text-sm tracking-widest uppercase transition-colors group" data-hover-text="Resume">
            Resume
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead, useSeoMeta } from '#imports'
import { gsap } from 'gsap'
import ContactForm from '~/components/contact/ContactForm.vue'

useHead({
  title: 'Contact | Ameen Mohamed'
})

useSeoMeta({
  title: 'Contact | Ameen Mohamed',
  description: 'Get in touch with Ameen Mohamed.',
})

const ambientRef = ref<HTMLElement | null>(null)
const ambientRef2 = ref<HTMLElement | null>(null)

onMounted(() => {

  if (ambientRef.value && ambientRef2.value) {
    gsap.to(ambientRef.value, {
      x: '20vw',
      y: '10vh',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    
    gsap.to(ambientRef2.value, {
      x: '-20vw',
      y: '-15vh',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: -5
    })
  }
})
</script>
