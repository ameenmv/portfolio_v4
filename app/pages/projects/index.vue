<template>
  <main class="fixed inset-0 w-full h-full bg-black overflow-hidden z-[100] touch-none">
    
    <!-- Giant Background Text -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5 mix-blend-screen overflow-hidden">
      <h1 class="text-[25vw] font-display font-black text-white whitespace-nowrap tracking-tighter">PROJECTS</h1>
    </div>

    <!-- Site Header Overlay -->
    <div class="absolute top-0 left-0 w-full z-[150] pointer-events-auto">
      <SiteHeader />
    </div>
    
    <!-- The WebGL Visualiser (Client Only) -->
    <ClientOnly>
      <ProjectVisualiser :projects="projects" />
      <template #fallback>
        <div class="w-full h-full flex items-center justify-center text-white font-mono text-sm tracking-widest opacity-50">
          Initializing WebGL Universe...
        </div>
      </template>
    </ClientOnly>

  </main>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta, definePageMeta } from '#imports'
import { useProjectData } from '~/composables/useProjectData'
import ProjectVisualiser from '~/components/projects/ProjectVisualiser.client.vue'

definePageMeta({
  layout: false
})

useHead({ title: 'Projects Universe | Ameen Mohamed' })
useSeoMeta({ title: 'Projects Universe | Ameen Mohamed', description: 'Interactive 3D WebGL Project Visualiser.' })

const { projects } = useProjectData()
</script>
