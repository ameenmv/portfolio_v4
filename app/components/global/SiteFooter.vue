<template>
  <footer class="relative bg-bg-primary text-text-primary pt-24 pb-8 overflow-hidden z-20" ref="footerRef">
    <!-- Marquee -->
    <div class="relative w-full whitespace-nowrap overflow-hidden flex items-center mb-24 opacity-20">
      <div class="flex animate-marquee text-[12vw] font-display font-bold tracking-tighter uppercase leading-none">
        <span class="px-8">Let's Build Something Great</span>
        <span class="px-8 text-accent">Let's Build Something Great</span>
        <span class="px-8">Let's Build Something Great</span>
        <span class="px-8 text-accent">Let's Build Something Great</span>
      </div>
    </div>

    <div class="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
      <!-- Contact Info -->
      <div class="flex flex-col gap-4">
        <h3 class="text-2xl font-display font-medium text-text-secondary">Have an idea?</h3>
        <a href="mailto:ameeenmv@gmail.com" class="text-4xl md:text-5xl font-display font-bold hover:text-accent transition-colors duration-300" data-hover-text="Email">
          ameeenmv@gmail.com
        </a>
        <p class="text-text-secondary mt-2">Egypt - Mansoura</p>
      </div>

      <!-- Social & Utility -->
      <div class="flex flex-col items-start md:items-end gap-8">
        <!-- Back to Top -->
        <button 
          @click="scrollToTop" 
          class="group flex items-center justify-center w-16 h-16 rounded-full border border-white/10 hover:border-accent hover:bg-accent/10 transition-all duration-300"
          data-hover-text="Up"
          aria-label="Back to Top"
        >
          <ArrowUp class="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>

        <!-- Social Links -->
        <div class="flex gap-6">
          <a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer" class="text-text-secondary hover:text-accent transition-colors duration-300" :data-hover-text="link.name">
            <component :is="link.icon" class="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="container mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-secondary">
      <p>&copy; {{ new Date().getFullYear() }} Ameen Mohamed. All rights reserved.</p>
      <p>Designed & Built with <span class="text-accent">Nuxt & GSAP</span></p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUp, Github, Linkedin, Youtube, Code2 } from 'lucide-vue-next'
import { useNuxtApp } from '#imports'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'YouTube', url: 'https://youtube.com', icon: Youtube },
  { name: 'npm', url: 'https://npmjs.com', icon: Code2 }
]

const scrollToTop = () => {
  const { $lenis } = useNuxtApp()
  if ($lenis) {
    $lenis.scrollTo(0, { duration: 1.5 })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.animate-marquee {
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>
