<template>
  <div v-if="project" class="page-project min-h-screen bg-bg-primary pt-[var(--header-height)]">
    <!-- Hero Section -->
    <section class="relative w-full h-[70vh] md:h-[85vh]">
      <ParallaxMedia 
        class="w-full h-full"
        :src="project.image" 
        :alt="project.title"
      >
        <div class="w-full h-full bg-gradient-to-t from-bg-primary/90 via-bg-primary/40 to-transparent absolute inset-0 z-10"></div>
      </ParallaxMedia>

      <div class="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-12 md:pb-24">
        <div class="container mx-auto">
          <TextReveal as="h1" class="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter text-text-primary mix-blend-difference mb-6">
            {{ project.title }}
          </TextReveal>
          
          <div class="flex flex-wrap gap-4 md:gap-12 text-sm md:text-base font-mono tracking-widest uppercase text-text-secondary">
            <div class="flex flex-col gap-2">
              <span class="text-accent text-[10px]">Role</span>
              <span>{{ project.role }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-accent text-[10px]">Timeline</span>
              <span>{{ project.timeline }}</span>
            </div>
            <div class="flex flex-col gap-2">
              <span class="text-accent text-[10px]">Tech</span>
              <span>{{ project.tags.join(' • ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-32 px-6 md:px-12 bg-bg-secondary">
      <div class="container mx-auto max-w-4xl">
        <div class="space-y-24">
          
          <!-- Introduction -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div class="md:col-span-4">
              <h2 class="text-2xl font-display font-medium text-text-primary">Overview</h2>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg md:text-2xl text-text-primary font-medium leading-relaxed">
                {{ project.description }}
              </p>
            </div>
          </div>

          <!-- Challenge -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div class="md:col-span-4">
              <h2 class="text-2xl font-display font-medium text-text-primary">The Challenge</h2>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-text-secondary leading-relaxed">
                {{ project.challenge }}
              </p>
            </div>
          </div>

          <!-- Solution -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div class="md:col-span-4">
              <h2 class="text-2xl font-display font-medium text-text-primary">The Solution</h2>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-text-secondary leading-relaxed">
                {{ project.solution }}
              </p>
            </div>
          </div>

          <!-- Results -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div class="md:col-span-4">
              <h2 class="text-2xl font-display font-medium text-text-primary">The Impact</h2>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-text-secondary leading-relaxed">
                {{ project.result }}
              </p>
              
              <div class="mt-8 flex gap-4">
                <a :href="project.githubUrl" target="_blank" class="inline-flex items-center gap-2 group text-text-primary hover:text-accent font-medium border-b border-accent pb-1 transition-colors">
                  View Source Code
                  <span class="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Next Project Navigation -->
    <section v-if="nextProject" class="h-[50vh] flex items-center justify-center bg-bg-primary border-t border-white/5 relative group cursor-pointer overflow-hidden">
      <NuxtLink :to="`/projects/${nextProject.slug}`" class="absolute inset-0 z-10" aria-label="Next Project"></NuxtLink>
      
      <div class="text-center z-20 pointer-events-none">
        <span class="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">Next Project</span>
        <h2 class="text-6xl md:text-8xl font-display font-bold uppercase tracking-tighter text-text-primary group-hover:text-transparent group-hover:-webkit-text-stroke transition-all duration-500 will-change-transform">
          {{ nextProject.title }}
        </h2>
      </div>
      
      <!-- Hover background reveal -->
      <div class="absolute inset-0 z-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
        <NuxtImg :src="nextProject.image" class="w-full h-full object-cover blur-sm scale-105" />
      </div>
    </section>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center bg-bg-primary pt-[var(--header-height)]">
    <div class="text-center">
      <h1 class="text-4xl font-display font-bold mb-4">Project Not Found</h1>
      <NuxtLink to="/#work" class="text-accent hover:underline">Back to Work</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useHead } from '#imports'
import ParallaxMedia from '~/components/ui/ParallaxMedia.vue'
import TextReveal from '~/components/ui/TextReveal.vue'
import { useProjectData } from '~/composables/useProjectData'

const route = useRoute()
const slug = route.params.slug as string

const { getProjectBySlug, getNextProject } = useProjectData()
const project = computed(() => getProjectBySlug(slug))
const nextProject = computed(() => getNextProject(slug))

if (project.value) {
  useHead({
    title: `${project.value.title} | Ameen Mohamed`
  })
}
</script>

<style scoped>
.-webkit-text-stroke {
  -webkit-text-stroke: 1px var(--text-primary);
  color: transparent;
}
</style>
