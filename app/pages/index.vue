<template>
  <div class="page-home">
    <HeroSection />
    <MarqueeBreak :items="['FRONT-END', 'VUE.JS', 'NUXT 3', 'TYPESCRIPT', 'WEBGL']" />
    <AboutSection />
    <ProjectsGrid />
    <MarqueeBreak :items="['SCROLLYTELLING', 'GSAP', 'ANIMATION', 'CLEAN CODE', 'ARCHITECTURE']" />
    <SkillsSection />
    <TestimonialsSection />
    <ExperienceSection />
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '~/components/hero/HeroSection.vue'
import AboutSection from '~/components/about/AboutSection.vue'
import ProjectsGrid from '~/components/projects/ProjectsGrid.vue'
import SkillsSection from '~/components/skills/SkillsSection.vue'
import ExperienceSection from '~/components/experience/ExperienceSection.vue'
import ContactSection from '~/components/contact/ContactSection.vue'
import TestimonialsSection from '~/components/home/TestimonialsSection.vue'
import MarqueeBreak from '~/components/home/MarqueeBreak.vue'
</script>
