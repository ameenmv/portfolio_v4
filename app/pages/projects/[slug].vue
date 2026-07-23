<template>
  <div class="page-project min-h-screen bg-bg-primary pt-[var(--header-height)]">
    <!-- Hero Section -->
    <section class="relative w-full h-[70vh] md:h-[85vh]">
      <ParallaxMedia 
        class="w-full h-full"
        src="/placeholder.jpg" 
        :alt="projectTitle"
      >
        <div class="w-full h-full bg-gradient-to-t from-bg-primary/90 via-bg-primary/40 to-transparent absolute inset-0 z-10"></div>
        <div class="w-full h-full bg-bg-elevated">
           <!-- Placeholder bg until we have images -->
        </div>
      </ParallaxMedia>

      <div class="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-12 md:pb-24">
        <div class="container mx-auto">
          <TextReveal as="h1" class="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter text-text-primary mix-blend-difference mb-6">
            {{ projectTitle }}
          </TextReveal>
          
          <div class="flex flex-wrap gap-4 md:gap-12 text-sm md:text-base font-mono tracking-widest uppercase text-text-secondary">
            <div class="flex flex-col gap-2">
              <span class="text-accent text-[10px]">Role</span>
              <span>Frontend Developer</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-accent text-[10px]">Timeline</span>
              <span>2025</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-accent text-[10px]">Tech</span>
              <span>Nuxt 3 • Tailwind • GSAP</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-32 px-6 md:px-12 bg-bg-secondary">
      <div class="container mx-auto max-w-4xl">
        <div class="space-y-24">
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div class="md:col-span-4">
              <h2 class="text-2xl font-display font-medium text-text-primary">The Challenge</h2>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-text-secondary leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <ParallaxMedia class="w-full aspect-video rounded-2xl bg-bg-elevated" />

          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div class="md:col-span-4">
              <h2 class="text-2xl font-display font-medium text-text-primary">The Solution</h2>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-text-secondary leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Next Project Navigation -->
    <section class="h-[50vh] flex items-center justify-center bg-bg-primary border-t border-white/5 relative group cursor-pointer overflow-hidden">
      <NuxtLink to="/projects" class="absolute inset-0 z-10" aria-label="Next Project"></NuxtLink>
      
      <div class="text-center z-20 pointer-events-none">
        <span class="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">Next Project</span>
        <h2 class="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-text-primary group-hover:text-transparent group-hover:-webkit-text-stroke transition-all duration-500 will-change-transform">
          Haze Clue
        </h2>
      </div>
      
      <div class="absolute inset-0 bg-bg-elevated transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out z-0"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from '#imports'
import ParallaxMedia from '~/components/ui/ParallaxMedia.vue'
import TextReveal from '~/components/ui/TextReveal.vue'

const route = useRoute()
const slug = route.params.slug as string

// Format slug to title
const projectTitle = computed(() => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
})
</script>

<style scoped>
.-webkit-text-stroke {
  -webkit-text-stroke: 1px var(--text-primary);
  color: transparent;
}
</style>
