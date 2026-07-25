<template>
  <div class="page-home">
    <HeroSection />
    <MarqueeBreak :items="['FRONT-END', 'VUE.JS', 'NUXT 3', 'TYPESCRIPT', 'THREE.JS']" />
    <AboutSection />
    <ProjectsGrid />
    <MarqueeBreak :items="['GSAP', 'NODE.JS', 'WEBSOCKETS', 'CLEAN CODE', 'ARCHITECTURE']" />
    <SkillsSection />
    <TestimonialsSection />
    <ExperienceSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/hero/HeroSection.vue'
import AboutSection from '~/components/about/AboutSection.vue'
import ProjectsGrid from '~/components/projects/ProjectsGrid.vue'
import SkillsSection from '~/components/skills/SkillsSection.vue'
import ExperienceSection from '~/components/experience/ExperienceSection.vue'
import TestimonialsSection from '~/components/home/TestimonialsSection.vue'
import MarqueeBreak from '~/components/home/MarqueeBreak.vue'
</script>
