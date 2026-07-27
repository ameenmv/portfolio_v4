<template>
  <section ref="sectionRef" class="relative w-full bg-bg-primary">
    
    <!-- INTRO SCENE -->
    <div class="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden" ref="introRef">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-[600px] h-[600px] rounded-full bg-accent/5 blur-[160px]" ref="introGlowRef"></div>
      </div>

      <div class="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <div class="overflow-hidden mb-4">
          <span class="block text-[12vw] md:text-[8vw] font-display font-bold text-accent leading-none tracking-tighter" ref="introNumberRef">150+</span>
        </div>
        <div class="overflow-hidden">
          <h2 class="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-text-primary" ref="introTitleRef">Mentored</h2>
        </div>
        <div class="overflow-hidden mt-6">
          <p class="text-lg md:text-2xl font-medium text-text-secondary max-w-2xl" ref="introDescRef">
            Code is read more often than it is written. Abstraction is a tool, not a goal. Shaping the next generation of engineers.
          </p>
        </div>
        <div class="mt-16 flex flex-col items-center gap-3 opacity-60" ref="scrollHintRef">
          <span class="font-mono text-xs tracking-[0.3em] uppercase text-text-secondary">Scroll to explore</span>
          <div class="w-px h-12 bg-gradient-to-b from-text-secondary to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- PINNED JOURNEY -->
    <div ref="journeyRef" class="relative w-full h-screen overflow-hidden">
      
      <!-- L1: BG color -->
      <div class="absolute inset-0 z-0" ref="bgLayerRef" :style="{ backgroundColor: scenes[0].bg }"></div>

      <!-- L2: Ambient glow -->
      <div class="absolute inset-0 pointer-events-none z-[1]">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[200px] opacity-15" ref="sceneGlowRef" :style="{ backgroundColor: scenes[0].accent }"></div>
      </div>

      <!-- L3: Watermark number -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-[2] overflow-hidden">
        <span 
          v-for="(scene, index) in scenes"
          :key="`wm-${index}`"
          class="absolute font-display font-bold text-[40vw] md:text-[28vw] leading-none select-none tracking-tighter watermark"
          :class="`watermark-${index}`"
          :style="{ 
            color: 'transparent',
            WebkitTextStroke: `2px ${scene.accent}18`
          }"
        >{{ scene.number }}</span>
      </div>

      <!-- L4: Content wrappers (stacked) -->
      <div class="absolute inset-0 flex items-center z-[5] px-6 md:px-16 lg:px-24 pointer-events-none">
        <div class="w-full max-w-7xl mx-auto relative h-[70vh]">
          
          <div 
            v-for="(scene, index) in scenes" 
            :key="`content-${index}`"
            class="absolute inset-0 flex flex-col justify-center scene-content"
            :class="[ `scene-content-${index}`, activeScene === index ? 'pointer-events-auto' : 'pointer-events-none' ]"
          >
            <!-- Header -->
            <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 scene-header">
              <span class="font-mono text-sm md:text-base tracking-widest uppercase header-num" :style="{ color: scene.accent }">{{ scene.number }}</span>
              <div class="h-px flex-1 max-w-[80px] bg-white/20"></div>
              <span class="font-mono text-sm md:text-base text-text-secondary tracking-wider header-org">{{ scene.org }}</span>
              <div class="h-px flex-1 max-w-[80px] bg-white/20"></div>
              <span class="font-mono text-xs md:text-sm text-text-secondary/60 tracking-wider header-period">{{ scene.period }}</span>
            </div>

            <!-- Title -->
            <div class="overflow-hidden mb-8 md:mb-12">
              <h3 class="text-5xl md:text-7xl lg:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.9] title-wrap">
                <span v-for="(char, cIdx) in scene.title.split('')" :key="cIdx" class="title-char inline-block" :style="{ color: scene.accent }">{{ char === ' ' ? '\u00A0' : char }}</span>
              </h3>
            </div>

            <!-- Metrics -->
            <div class="flex flex-wrap gap-8 md:gap-16 mb-8 md:mb-12 metrics-wrap">
              <div class="metric-item flex flex-col" v-for="(m, i) in scene.metrics" :key="i">
                <span class="text-4xl md:text-6xl font-display font-bold leading-none metric-val" :style="{ color: scene.accent }">{{ m.value }}</span>
                <span class="text-xs md:text-sm font-mono text-text-secondary mt-2 tracking-wider uppercase metric-label">{{ m.label }}</span>
              </div>
            </div>

            <!-- Description -->
            <div class="overflow-hidden">
              <p class="text-base md:text-xl text-text-secondary max-w-2xl leading-relaxed desc-text">{{ scene.description }}</p>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-3 mt-6 md:mt-8 tags-wrap">
              <span 
                v-for="tag in scene.tags" 
                :key="tag"
                class="px-4 py-2 rounded-full font-mono text-xs md:text-sm font-bold uppercase tracking-widest border tag-item"
                :style="{ borderColor: `${scene.accent}40`, color: scene.accent, backgroundColor: `${scene.accent}08` }"
              >{{ tag }}</span>
            </div>
          </div>

        </div>
      </div>

      <!-- L5: Progress dots -->
      <div class="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[10]">
        <button 
          v-for="(scene, sIdx) in scenes" 
          :key="sIdx"
          class="relative w-3 h-3 rounded-full transition-all duration-500 cursor-pointer group"
          :class="sIdx === activeScene ? 'scale-125' : 'scale-100 opacity-40 hover:opacity-70'"
          :style="{ backgroundColor: sIdx === activeScene ? scene.accent : 'rgba(255,255,255,0.3)' }"
          @click="scrollToScene(sIdx)"
        >
          <span 
            v-if="sIdx === activeScene"
            class="absolute inset-[-4px] rounded-full animate-pulse"
            :style="{ border: `1px solid ${scene.accent}60` }"
          ></span>
          <span class="absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs font-mono text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {{ scene.org }}
          </span>
        </button>
      </div>

      <!-- Counter -->
      <div class="absolute bottom-8 left-6 md:left-10 z-[10]">
        <span class="font-mono text-xs text-text-secondary/60 tracking-widest">
          <span :style="{ color: scenes[activeScene]?.accent }">{{ String(activeScene + 1).padStart(2, '0') }}</span>
          <span class="mx-2">/</span>
          <span>{{ String(scenes.length).padStart(2, '0') }}</span>
        </span>
      </div>

      <!-- Grain -->
      <div class="absolute inset-0 z-[8] pointer-events-none opacity-[0.03]">
        <div class="w-full h-full" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E'); background-size: 128px;"></div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

const { isReducedMotion } = useReducedMotion()

// ─── Refs ───────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
const introRef = ref<HTMLElement | null>(null)
const introGlowRef = ref<HTMLElement | null>(null)
const introNumberRef = ref<HTMLElement | null>(null)
const introTitleRef = ref<HTMLElement | null>(null)
const introDescRef = ref<HTMLElement | null>(null)
const scrollHintRef = ref<HTMLElement | null>(null)
const journeyRef = ref<HTMLElement | null>(null)
const bgLayerRef = ref<HTMLElement | null>(null)
const sceneGlowRef = ref<HTMLElement | null>(null)

// ─── Data ───────────────────────────────────────────────
const activeScene = ref(0)

const scenes = [
  {
    number: '01', title: 'Frontend Tech Lead', org: 'CIS Team MU', period: '2023 — Present',
    description: 'Leading technical decisions, reviewing PRs, and ensuring architecture scales gracefully. Building a culture of code excellence across the frontend committee.',
    metrics: [{ value: '40+', label: 'Engineers Mentored' }, { value: '12+', label: 'Projects Delivered' }, { value: '6+', label: 'Months Leading' }],
    tags: ['Leadership', 'Architecture', 'Code Review'], accent: '#00DC82', bg: '#0a0a0a',
  },
  {
    number: '02', title: 'Vice Head', org: 'CAT Reloaded', period: '2023 — 2024',
    description: 'Co-managing the frontend committee, mentoring juniors, and setting coding standards. Shaping the technical direction of one of the largest student activities.',
    metrics: [{ value: '25+', label: 'Juniors Guided' }, { value: '8', label: 'Workshops Held' }, { value: '3', label: 'Cycles Led' }],
    tags: ['Management', 'Mentoring', 'Standards'], accent: '#FF6B35', bg: '#0d0a08',
  },
  {
    number: '03', title: 'RedDev', org: 'Community', period: '2022 — Present',
    description: 'An elite technical circle pushing the boundaries of frontend engineering. Solving complex community problems and building open-source tools.',
    metrics: [{ value: '15+', label: 'Members Active' }, { value: '5+', label: 'OSS Projects' }, { value: '3+', label: 'Years Active' }],
    tags: ['Community', 'Open Source', 'Innovation'], accent: '#FF3366', bg: '#0d0a0c',
  },
  {
    number: '04', title: 'Instructor', org: 'CAT Station', period: '2022 — 2024',
    description: 'Teaching modern web development, JavaScript nuances, and the Vue.js ecosystem. Turning complex concepts into accessible knowledge for aspiring developers.',
    metrics: [{ value: '200+', label: 'Students Taught' }, { value: '6', label: 'Crash Courses' }, { value: '15+', label: 'Hours of Content' }],
    tags: ['Teaching', 'Vue.js', 'JavaScript'], accent: '#4ECDC4', bg: '#0a0d0d',
  },
]

// ─── Helpers ────────────────────────────────────────────
function scrollToScene(idx: number) {
  const st = ScrollTrigger.getAll().find(t => t.vars.trigger === journeyRef.value)
  if (!st) return
  const target = st.start + ((st.end - st.start) * idx) / (scenes.length - 1)
  window.scrollTo({ top: target, behavior: 'smooth' })
}

// ─── Lifecycle ──────────────────────────────────────────
let ctx: gsap.Context

onMounted(async () => {
  await nextTick()

  ctx = gsap.context(() => {
    // ── Intro ──
    const introTl = gsap.timeline({
      scrollTrigger: { trigger: introRef.value, start: 'top 80%', once: true }
    })
    if (introNumberRef.value) introTl.from(introNumberRef.value, { y: 80, opacity: 0, scale: 0.85, duration: 1, ease: 'power4.out' }, 0)
    if (introTitleRef.value) introTl.from(introTitleRef.value, { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.15)
    if (introDescRef.value) introTl.from(introDescRef.value, { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.3)
    if (scrollHintRef.value) introTl.from(scrollHintRef.value, { opacity: 0, duration: 1, ease: 'power2.out' }, 0.7)
    if (introGlowRef.value) gsap.to(introGlowRef.value, { scale: 1.3, opacity: 0.7, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    // ── Journey ──
    if (!journeyRef.value) return

    const totalScenes = scenes.length

    // Initialize all scenes
    gsap.set(bgLayerRef.value!, { backgroundColor: scenes[0].bg })
    gsap.set(sceneGlowRef.value!, { backgroundColor: scenes[0].accent })

    for (let i = 0; i < totalScenes; i++) {
      const isFirst = i === 0;
      gsap.set(`.watermark-${i}`, { 
        autoAlpha: isFirst ? 0.05 : 0, 
        y: isFirst ? 0 : 50,
        scale: isFirst ? 1 : 1.2
      })
      gsap.set(`.scene-content-${i}`, { 
        autoAlpha: isFirst ? 1 : 0, 
        y: isFirst ? 0 : 60,
        scale: isFirst ? 1 : 1.02
      })
      
      // Initialize inner elements for stagger effect on entrance
      if (!isFirst && !isReducedMotion.value) {
        gsap.set(`.scene-content-${i} .scene-header`, { autoAlpha: 0, y: 15 })
        gsap.set(`.scene-content-${i} .title-char`, { autoAlpha: 0, y: 40, rotateX: -30 })
        gsap.set(`.scene-content-${i} .metric-item`, { autoAlpha: 0, y: 20 })
        gsap.set(`.scene-content-${i} .desc-text`, { autoAlpha: 0, y: 15 })
        gsap.set(`.scene-content-${i} .tag-item`, { autoAlpha: 0, y: 10, scale: 0.95 })
      }
    }

    // Build the pure scrub-driven master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: journeyRef.value,
        start: 'top top',
        end: () => `+=${totalScenes * 400}vh`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate(self) {
          const newScene = Math.min(Math.floor(self.progress * totalScenes), totalScenes - 1)
          if (newScene !== activeScene.value) activeScene.value = newScene
        }
      }
    })

    // Sequence the scenes
    for (let i = 1; i < totalScenes; i++) {
      const scene = scenes[i]
      
      if (!isReducedMotion.value) {
        // EXIT PREVIOUS SCENE
        masterTL.to(`.scene-content-${i-1}`, {
          autoAlpha: 0, y: -80, scale: 0.98, duration: 0.15, ease: 'power1.inOut'
        })
        masterTL.to(`.watermark-${i-1}`, {
          autoAlpha: 0, y: -50, scale: 0.9, duration: 0.15, ease: 'power1.inOut'
        }, '<')

        // BG TRANSITION
        masterTL.to(bgLayerRef.value!, { backgroundColor: scene.bg, duration: 0.2, ease: 'none' }, '<')
        masterTL.to(sceneGlowRef.value!, { backgroundColor: scene.accent, duration: 0.2, ease: 'none' }, '<')

        // ENTER NEW SCENE
        masterTL.to(`.scene-content-${i}`, {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.2, ease: 'power1.out'
        }, '<0.1')
        masterTL.to(`.watermark-${i}`, {
          autoAlpha: 0.05, y: 0, scale: 1, duration: 0.2, ease: 'power1.out'
        }, '<')

        // STAGGER INNER ELEMENTS (perfectly attached to scrub)
        masterTL.to(`.scene-content-${i} .scene-header`, { autoAlpha: 1, y: 0, duration: 0.1, ease: 'power1.out' }, '<')
        masterTL.to(`.scene-content-${i} .title-char`, { autoAlpha: 1, y: 0, rotateX: 0, stagger: 0.005, duration: 0.15, ease: 'power1.out' }, '<0.02')
        masterTL.to(`.scene-content-${i} .metric-item`, { autoAlpha: 1, y: 0, stagger: 0.01, duration: 0.15, ease: 'power1.out' }, '<0.05')
        masterTL.to(`.scene-content-${i} .desc-text`, { autoAlpha: 1, y: 0, duration: 0.15, ease: 'power1.out' }, '<0.08')
        masterTL.to(`.scene-content-${i} .tag-item`, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.01, duration: 0.15, ease: 'power1.out' }, '<0.1')

      } else {
        // Reduced Motion
        masterTL.set(`.scene-content-${i-1}`, { autoAlpha: 0 })
        masterTL.set(`.watermark-${i-1}`, { autoAlpha: 0 })
        
        masterTL.set(bgLayerRef.value!, { backgroundColor: scene.bg })
        masterTL.set(sceneGlowRef.value!, { backgroundColor: scene.accent })
        
        masterTL.set(`.scene-content-${i}`, { autoAlpha: 1, y: 0, scale: 1 })
        masterTL.set(`.watermark-${i}`, { autoAlpha: 0.05, y: 0, scale: 1 })
      }
    }

    // Fix for the first scene's initial animation if needed
    if (!isReducedMotion.value) {
      // It's already visible, we don't need to stagger the first scene in the scrub timeline.
      // If we want it to animate on initial load, we can do it outside the masterTL.
      gsap.from(`.scene-content-0 .scene-header`, { autoAlpha: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.from(`.scene-content-0 .title-char`, { autoAlpha: 0, y: 60, rotateX: -30, stagger: 0.015, duration: 0.8, ease: 'power4.out', delay: 0.3 })
      gsap.from(`.scene-content-0 .metric-item`, { autoAlpha: 0, y: 30, stagger: 0.04, duration: 0.7, ease: 'power3.out', delay: 0.4 })
      gsap.from(`.scene-content-0 .desc-text`, { autoAlpha: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.5 })
      gsap.from(`.scene-content-0 .tag-item`, { autoAlpha: 0, y: 15, scale: 0.95, stagger: 0.04, duration: 0.6, ease: 'power3.out', delay: 0.6 })
      
      gsap.from(`.watermark-0`, { autoAlpha: 0, scale: 1.2, duration: 1, ease: 'power2.out', delay: 0.2 })
    }

  }, sectionRef.value || document.body)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<style scoped>
.title-char {
  will-change: transform, opacity;
  transform-origin: bottom center;
}
</style>
