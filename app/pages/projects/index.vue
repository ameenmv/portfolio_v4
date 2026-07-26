<template>
  <main class="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-bg-primary">
    <div class="container mx-auto max-w-7xl">
      
      <!-- Big Intro -->
      <PageIntro 
        pretitle="Projects"
        title="Selected work, in depth"
        description="A small collection of products and digital experiences. Open any project to explore the thinking, the build, and the outcome."
      />

      <!-- Filter Pills -->
      <div class="flex flex-wrap justify-center gap-3 mb-16 md:mb-24">
        <button 
          v-for="category in allCategories" 
          :key="category"
          @click="selectedCategory = category"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border flex items-center gap-2"
          :class="[
            selectedCategory === category 
              ? 'bg-[#b8d8fa] border-[#b8d8fa] text-black shadow-sm' 
              : 'bg-white/5 border-white/10 text-text-primary hover:bg-white/10 hover:border-white/20'
          ]"
        >
          <span v-if="selectedCategory === category" class="w-1.5 h-1.5 rounded-full bg-black"></span>
          {{ category }}
        </button>
      </div>
      
      <!-- Masonry Grid -->
      <div class="columns-1 md:columns-2 gap-8 md:gap-12 space-y-8 md:space-y-12">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.slug" 
          v-bind="project" 
          class="break-inside-avoid"
        />
      </div>
      
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useHead, useSeoMeta } from '#imports'
import ProjectCard from '~/components/projects/ProjectCard.vue'
import { useProjectData } from '~/composables/useProjectData'

useHead({
  title: 'Projects | Ameen Mohamed'
})

useSeoMeta({
  title: 'Projects | Ameen Mohamed',
  description: 'A complete list of projects built by Ameen Mohamed.',
})

const { projects } = useProjectData()

const allCategories = computed(() => {
  const cats = new Set<string>()
  projects.forEach(p => p.services?.forEach(s => cats.add(s)))
  return ['All services', ...Array.from(cats)]
})

const selectedCategory = ref('All services')

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All services') return projects
  return projects.filter(p => p.services?.includes(selectedCategory.value))
})
</script>
