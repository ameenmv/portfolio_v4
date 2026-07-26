<template>
  <section ref="sectionWrapperRef" id="skills" class="py-32 px-6 md:px-12 bg-bg-primary relative z-20">
    <div class="container mx-auto">
      <SectionIntro 
        pretitle="Expertise" 
        title="Tools of the Trade." 
        description="I've spent years mastering the modern frontend stack, building robust architectures, and creating seamless user experiences."
        class="mb-24"
      />
      
      <!-- Stacking Cards Container -->
      <div class="relative w-full pb-32 max-w-[95%] xl:max-w-[1400px] mx-auto">
        <StackingCard 
          v-for="(skill, index) in skills"
          :key="skill.title"
          v-bind="skill"
          :index="index"
          :style="{ zIndex: index + 1 }"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SectionIntro from '../ui/SectionIntro.vue'
import StackingCard from './StackingCard.vue'

const sectionWrapperRef = ref<HTMLElement | null>(null)

import IconFrontend from '../icons/IconFrontend.vue'
import IconBackend from '../icons/IconBackend.vue'
import IconDesign from '../icons/IconDesign.vue'
import IconArchitecture from '../icons/IconArchitecture.vue'

const skills = [
  {
    title: 'Frontend Core',
    description: 'Specializing in the Vue ecosystem to build scalable, reactive, and highly performant applications. Deep understanding of modern state management and reactive patterns.',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Pinia', 'GSAP', 'Vite', 'Webpack'],
    colorClass: 'bg-accent',
    icon: IconFrontend
  },
  {
    title: 'Backend & Data',
    description: 'Bridging the gap with full-stack capabilities. Building robust APIs, real-time communication servers, and managing complex databases.',
    technologies: ['Node.js', 'NestJS', 'MongoDB', 'Laravel', 'WebSockets', 'GraphQL'],
    colorClass: 'bg-accent-warm',
    icon: IconBackend
  },
  {
    title: 'UI & Design',
    description: 'Translating complex designs into pixel-perfect, accessible, and responsive interfaces. Strong focus on design systems and component libraries.',
    technologies: ['Tailwind CSS', 'Vuetify', 'SASS', 'Figma', 'Framer Motion'],
    colorClass: 'bg-accent-cool',
    icon: IconDesign
  },
  {
    title: 'Architecture & Tools',
    description: 'Setting up projects for long-term success. Implementing CI/CD pipelines, internationalization, and maintaining clean code standards.',
    technologies: ['Git', 'Docker', 'CI/CD', 'Testing', 'i18n', 'Clean Architecture', 'Turborepo'],
    colorClass: 'bg-[#b0aea5]', 
    icon: IconArchitecture
  }
]
</script>
