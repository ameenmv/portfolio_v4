<template>
  <main class="bg-bg-primary w-full relative">
    
    <!-- Intro Section -->
    <section class="h-screen flex flex-col justify-center px-6 md:px-12 relative z-10 bg-bg-primary" ref="introRef">
      <div class="container mx-auto max-w-7xl pt-20">
        <PageIntro 
          pretitle="Archive"
          title="Featured Index."
          description="A curated selection of products and digital experiences. Keep scrolling to uncover the stack."
        />
        <div class="mt-24 animate-bounce opacity-50 flex flex-col items-center gap-4">
          <span class="text-xs font-mono uppercase tracking-widest text-text-secondary">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="text-accent">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- The Stack -->
    <div class="relative w-full pb-[20vh]" ref="stackContainerRef">
      <div 
        v-for="(project, index) in projects" 
        :key="project.slug"
        class="project-card-wrapper sticky top-0 h-screen w-full flex items-center justify-center p-6 md:p-12 overflow-hidden"
        :style="{ zIndex: 10 + index }"
      >
        <!-- The Card itself -->
        <div class="project-card relative w-full max-w-7xl h-[85vh] md:h-[80vh] rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row transform-gpu will-change-transform bg-bg-secondary border border-white/10 group">
          
          <!-- Image Section -->
          <div class="w-full md:w-3/5 h-[45%] md:h-full relative overflow-hidden bg-black">
             <img :src="project.image" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" />
             <!-- Inner dark gradient for text legibility on mobile -->
             <div class="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent md:hidden opacity-80"></div>
          </div>

          <!-- Content Section -->
          <div class="w-full md:w-2/5 h-[55%] md:h-full p-8 md:p-16 flex flex-col justify-center relative">
            <!-- Subtle gradient background -->
            <div class="absolute inset-0 bg-gradient-to-br from-bg-secondary to-bg-elevated opacity-50 z-0"></div>
            
            <div class="relative z-10 flex flex-col h-full">
              <div class="flex flex-wrap gap-2 mb-6 md:mb-10">
                <span v-for="tag in project.tags.slice(0, 3)" :key="tag" class="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-mono uppercase tracking-widest text-text-secondary">
                  {{ tag }}
                </span>
              </div>
              
              <h2 class="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-4 md:mb-8 tracking-tighter">
                {{ project.title }}
              </h2>
              
              <p class="text-text-secondary text-base md:text-lg leading-relaxed mb-8 md:mb-12 line-clamp-3 md:line-clamp-none">
                {{ project.description }}
              </p>

              <div class="mt-auto">
                <NuxtLink :to="`/projects/${project.slug}`" class="inline-flex items-center gap-4 group/btn">
                  <span class="w-10 h-10 md:w-14 md:h-14 rounded-full border border-accent flex items-center justify-center text-accent group-hover/btn:bg-accent group-hover/btn:text-black transition-colors duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="transform -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span class="font-bold uppercase tracking-widest text-xs md:text-sm text-white group-hover/btn:text-accent transition-colors">Read Case Study</span>
                </NuxtLink>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useHead, useSeoMeta } from '#imports'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageIntro from '~/components/ui/PageIntro.vue'
import { useProjectData } from '~/composables/useProjectData'

useHead({ title: 'Projects | Ameen Mohamed' })
useSeoMeta({ title: 'Projects | Ameen Mohamed', description: 'A curated index of projects.' })

const { projects } = useProjectData()
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    const wrappers = gsap.utils.toArray('.project-card-wrapper') as HTMLElement[]
    const cards = gsap.utils.toArray('.project-card') as HTMLElement[]
    
    // Create the "Deck of Cards" sticky stacking effect
    cards.forEach((card, index) => {
      // The last card doesn't need to scale down since nothing scrolls over it
      if (index === cards.length - 1) return
      
      const nextWrapper = wrappers[index + 1]
      
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.4,
        yPercent: -5,
        filter: 'blur(8px)',
        ease: "none",
        scrollTrigger: {
          trigger: nextWrapper,
          // Start shrinking this card when the NEXT card's top hits the bottom of the viewport
          start: "top bottom", 
          // Finish shrinking when the NEXT card's top hits the top of the viewport (fully covers it)
          end: "top top", 
          scrub: true,
          invalidateOnRefresh: true
        }
      })
    })
  })
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
/* Ensure the body scrollbar behaves smoothly */
main {
  overscroll-behavior-y: none;
}
</style>
