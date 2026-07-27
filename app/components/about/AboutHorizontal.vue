<template>
  <section class="about-horizontal relative w-full bg-bg-primary overflow-hidden" ref="sectionRef">
    
    <!-- Giant Background Text (Parallaxed inside horizontal scroll) -->
    <div class="absolute inset-0 flex items-center z-0 pointer-events-none overflow-hidden select-none opacity-20">
      <div class="whitespace-nowrap font-display font-bold text-[20vw] uppercase tracking-tighter text-transparent -webkit-text-stroke leading-none" ref="bgTextRef">
        CODING WITH AMEEN • FRONTEND • ARCHITECTURE • PERFORMANCE • 
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div class="h-screen flex items-center" ref="scrollContainerRef">
      <div class="flex gap-12 md:gap-32 px-12 md:px-32 w-max h-full items-center relative z-10" ref="horizontalWrapperRef">
        
        <!-- Video Cards -->
        <a 
          v-for="(video, index) in videos" 
          :key="video.id"
          :href="video.url"
          target="_blank"
          rel="noopener noreferrer"
          class="w-[85vw] md:w-[45vw] h-[65vh] shrink-0 bg-bg-secondary/80 backdrop-blur-md rounded-[40px] border border-white/10 overflow-hidden relative group block"
        >
          <!-- Background Thumbnail -->
          <img 
            :src="`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`" 
            :alt="video.title"
            class="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out" 
            loading="lazy"
          />
          <!-- Gradient Overlay to ensure text readability -->
          <div class="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/80 to-bg-primary/20"></div>
          
          <!-- Content -->
          <div class="relative z-10 h-full p-8 md:p-12 flex flex-col justify-end">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-accent font-mono text-sm tracking-widest uppercase">{{ video.category === 'Playlist' ? 'Series' : `Video 0${index + 1}` }}</span>
              <span class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-text-secondary tracking-wider">{{ video.category }}</span>
            </div>
            <h3 class="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-4 leading-tight group-hover:text-accent transition-colors duration-300">
              {{ video.title }}
            </h3>
            
            <!-- Play Indicator -->
            <div class="absolute top-8 right-8 w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:bg-accent group-hover:border-accent transition-all duration-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </a>

      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const videos = [
  { 
    id: 'playlist_browser',
    videoId: '8voxC-pIaCQ', // Use first video's thumbnail for the playlist
    url: 'https://youtube.com/playlist?list=PL8vUYmFH_EUuv-xfZVxjTDO6wx94Buv1T', 
    title: 'Browser Under The Hood (Full Series)', 
    category: 'Playlist' 
  },
  { 
    id: 'I1iQbwSx5Ds', 
    videoId: 'I1iQbwSx5Ds',
    url: 'https://www.youtube.com/watch?v=I1iQbwSx5Ds',
    title: 'Why Vue.js over React? 5 Real-World Reasons', 
    category: 'Ecosystem' 
  },
  { 
    id: '60EChu-POQc', 
    videoId: '60EChu-POQc',
    url: 'https://www.youtube.com/watch?v=60EChu-POQc',
    title: 'Why Requests Die? Building Resilient APIs', 
    category: 'System Design' 
  },
  { 
    id: 'ykfFMXBDKV8', 
    videoId: 'ykfFMXBDKV8',
    url: 'https://www.youtube.com/watch?v=ykfFMXBDKV8',
    title: 'Git & GitHub Crash Course from Scratch', 
    category: 'Tooling' 
  }
]

const sectionRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const horizontalWrapperRef = ref<HTMLElement | null>(null)
const bgTextRef = ref<HTMLElement | null>(null)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // Determine the amount to scroll horizontally
    const scrollAmount = () => -(horizontalWrapperRef.value?.scrollWidth || 0) + window.innerWidth

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: () => `+=${horizontalWrapperRef.value?.scrollWidth || window.innerWidth * 3}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })

    // Move cards horizontally
    tl.to(horizontalWrapperRef.value, {
      x: scrollAmount,
      ease: "none"
    })

    // Move background text slightly faster for parallax
    tl.to(bgTextRef.value, {
      x: () => scrollAmount() * 1.5,
      ease: "none"
    }, 0)

  }, sectionRef.value || document.body)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.-webkit-text-stroke {
  -webkit-text-stroke: 2px var(--text-secondary);
}
</style>
