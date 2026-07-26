<template>
  <section id="work" class="py-32 px-6 md:px-12 bg-bg-primary relative">
    <div class="container mx-auto">
      <SectionIntro 
        pretitle="Selected Work" 
        title="Featured Projects." 
        description="A selection of recent projects I've built, ranging from enterprise fintech solutions to innovative real-time platforms."
        class="mb-24"
      />
      
      <!-- Masonry Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        <div v-for="(project, index) in projects" :key="project.slug" :class="{ 'md:mt-32': index % 2 !== 0 }">
          <ProjectCard v-bind="project" />
        </div>
      </div>
      
      <!-- View All CTA -->
      <div class="mt-32 flex justify-center">
        <NuxtLink to="/projects" ref="btnRef" class="group flex items-center justify-center w-32 h-32 rounded-full border border-white/20 hover:border-accent hover:bg-accent text-text-primary hover:text-bg-primary transition-all duration-500 font-display font-bold uppercase tracking-widest text-sm btn-special will-change-transform" data-hover-text="Explore">
          <span class="group-hover:scale-110 transition-transform duration-500">View All</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SectionIntro from '../ui/SectionIntro.vue'
import ProjectCard from './ProjectCard.vue'
import { useMagnetic } from '~/composables/useMagnetic'
import { useProjectData } from '~/composables/useProjectData'

const btnRef = ref<HTMLElement | null>(null)
useMagnetic(btnRef, 0.4)

const { projects } = useProjectData()
</script>

<style scoped>
/* Fix for Vite HMR cache */
</style>
