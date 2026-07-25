<template>
  <div class="page-about min-h-screen bg-bg-primary pt-[var(--header-height)]">
    <!-- Hero Section -->
    <section class="py-24 md:py-48 px-6 md:px-12 relative overflow-hidden">
      <div class="absolute -right-[20%] -top-[20%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div class="container mx-auto max-w-5xl">
        <TextReveal as="h1" class="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter text-text-primary mb-12">
          Driven by<br/><span class="text-transparent -webkit-text-stroke">Excellence.</span>
        </TextReveal>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <TextReveal as="p" :delay="0.2" class="text-xl md:text-2xl text-text-secondary leading-relaxed font-light">
            I'm Ameen Mohamed, a Front-End Developer from Egypt. I specialize in building immersive digital experiences with modern web technologies.
          </TextReveal>
          
          <div class="space-y-6">
            <TextReveal as="p" :delay="0.3" class="text-lg text-text-secondary leading-relaxed">
              My journey started with a deep curiosity for how things work on the web. Today, I lead frontend teams, mentor hundreds of developers, and build enterprise-grade applications at neop.
            </TextReveal>
            <TextReveal as="p" :delay="0.4" class="text-lg text-text-secondary leading-relaxed">
              When I'm not writing code, I'm usually creating content for my YouTube channel, Coding with Ameen, or contributing to open-source projects.
            </TextReveal>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Scroll Video Section -->
    <ScrollVideo src="/me.mp4" />

    <!-- Mentorship & Community -->
    <section class="py-32 px-6 md:px-12 bg-bg-secondary relative">
      <div class="container mx-auto max-w-5xl">
        <SectionIntro 
          pretitle="Community" 
          title="Sharing Knowledge." 
          description="I believe that teaching is the best way to learn. I dedicate a significant portion of my time to mentoring and creating educational content."
          class="mb-24"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div class="bg-bg-elevated p-12 rounded-[30px] border border-white/5 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150"></div>
            <h3 class="text-3xl font-display font-bold text-text-primary mb-4 relative z-10">CIS Team</h3>
            <p class="text-text-secondary text-lg leading-relaxed relative z-10 mb-8">
              As the Frontend Tech Lead & Mentor, I've guided over 150 developers through complex technical gates, teaching advanced Vue.js and architecture concepts.
            </p>
            <div class="text-3xl font-display font-bold text-accent relative z-10">150+ <span class="text-sm font-mono text-text-secondary uppercase tracking-widest font-normal">Mentees</span></div>
          </div>
          
          <div class="bg-bg-elevated p-12 rounded-[30px] border border-white/5 relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full transition-transform duration-500 group-hover:scale-150"></div>
            <h3 class="text-3xl font-display font-bold text-text-primary mb-4 relative z-10">YouTube</h3>
            <p class="text-text-secondary text-lg leading-relaxed relative z-10 mb-8">
              Through 'Coding with Ameen', I share tutorials, live coding sessions, and insights into the frontend ecosystem to help developers level up their skills.
            </p>
            <a href="https://youtube.com" target="_blank" class="inline-flex items-center gap-2 text-text-primary border-b border-accent pb-1 font-mono text-sm tracking-widest uppercase hover:text-accent transition-colors relative z-10" data-hover-text="Watch">
              Watch Videos <span class="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    
   
    
  </div>
</template>

<script setup lang="ts">
import TextReveal from '~/components/ui/TextReveal.vue'
import ScrollVideo from '~/components/ui/ScrollVideo.vue'
import SectionIntro from '~/components/ui/SectionIntro.vue'
useHead({
  title: 'About | Ameen Mohamed'
})

const certifications = [
  { name: 'Vue JS - The Complete Guide', issuer: 'Udemy' },
  { name: 'JavaScript Design Patterns', issuer: 'Udemy' },
  { name: 'The Complete React Native + Hooks Course', issuer: 'Udemy' },
  { name: 'Node.js, Express, MongoDB & More', issuer: 'Udemy' },
  { name: 'The Complete Web Development Bootcamp', issuer: 'Udemy' },
  { name: 'UI/UX Design Specialization', issuer: 'Coursera' },
]
</script>

<style scoped>
.-webkit-text-stroke {
  -webkit-text-stroke: 1.5px var(--text-primary);
}
</style>
