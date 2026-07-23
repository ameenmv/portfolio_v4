<template>
  <div class="page-home">
    <HeroSection />
    <AboutSection />
    <ProjectsGrid />
    <SkillsSection />
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
</script>
