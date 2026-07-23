<template>
  <div class="page-oss min-h-screen bg-bg-primary pt-[var(--header-height)]">
    <section class="py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
      <!-- Decorative background -->
      <div class="absolute left-[-10%] top-[20%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="container mx-auto max-w-6xl relative z-10">
        <SectionIntro 
          pretitle="Open Source" 
          title="Building in Public." 
          description="A collection of tools, libraries, and boilerplates I've built to solve my own problems and share with the community."
          class="mb-24"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <a 
            v-for="project in ossProjects" 
            :key="project.name"
            :href="project.url"
            target="_blank"
            class="group bg-bg-elevated p-8 rounded-[30px] border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden flex flex-col h-full"
            data-hover-text="GitHub"
          >
            <div class="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:translate-x-0 translate-x-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
            
            <h3 class="text-2xl font-display font-bold text-text-primary mb-4 pr-8">{{ project.name }}</h3>
            <p class="text-text-secondary mb-8 flex-grow">
              {{ project.description }}
            </p>
            
            <div class="flex items-center justify-between mt-auto">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :class="project.languageColor"></div>
                <span class="text-xs font-mono text-text-secondary">{{ project.language }}</span>
              </div>
              <div class="flex items-center gap-1 text-text-secondary group-hover:text-accent transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                <span class="text-xs font-mono">{{ project.stars }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import SectionIntro from '~/components/ui/SectionIntro.vue'

useHead({
  title: 'Open Source | Ameen Mohamed'
})

const ossProjects = [
  {
    name: 'Sa5er CLI',
    description: 'An AI-powered command-line interface that acts as your personal terminal assistant.',
    language: 'TypeScript',
    languageColor: 'bg-blue-500',
    stars: '128',
    url: 'https://github.com/ameeenmv'
  },
  {
    name: 'Nuxt 3 Boilerplate',
    description: 'Enterprise-ready Nuxt 3 starter template with Tailwind, ESLint, and optimal folder structure.',
    language: 'Vue',
    languageColor: 'bg-green-500',
    stars: '85',
    url: 'https://github.com/ameeenmv'
  },
  {
    name: 'Vue Flow Elements',
    description: 'A collection of custom node components for Vue Flow based on modern UI libraries.',
    language: 'Vue',
    languageColor: 'bg-green-500',
    stars: '42',
    url: 'https://github.com/ameeenmv'
  },
  {
    name: 'Tailwind Glassmorphism',
    description: 'A Tailwind CSS plugin to easily generate beautiful glassmorphism utilities.',
    language: 'JavaScript',
    languageColor: 'bg-yellow-400',
    stars: '210',
    url: 'https://github.com/ameeenmv'
  },
  {
    name: 'dotfiles',
    description: 'My personal macOS & Linux dotfiles and development environment setup scripts.',
    language: 'Shell',
    languageColor: 'bg-gray-400',
    stars: '15',
    url: 'https://github.com/ameeenmv'
  }
]
</script>
