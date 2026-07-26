<template>
  <main v-if="project" class="project-page overflow-hidden bg-bg-primary pt-[var(--header-height)]">
    <section class="min-h-[calc(100svh-var(--header-height))] px-5 pb-8 pt-10 md:px-12 md:pb-12 md:pt-16">
      <div class="mx-auto flex max-w-[1600px] items-center justify-between border-y border-white/10 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary md:text-xs">
        <NuxtLink to="/projects" class="group inline-flex items-center gap-3 transition-colors hover:text-accent"><span class="transition-transform duration-300 group-hover:-translate-x-1">←</span> All projects</NuxtLink>
        <span>Project / {{ projectNumber }}</span>
      </div>
      <div class="mx-auto max-w-[1600px] pt-14 md:pt-20">
        <p class="hero-kicker mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent md:mb-8 md:text-xs">{{ project.role }} · {{ project.timeline }}</p>
        <h1 ref="heroTitle" class="max-w-[14ch] font-display text-[clamp(4.4rem,13vw,13.5rem)] font-bold uppercase leading-[0.78] tracking-[-0.085em] text-text-primary">{{ project.title }}</h1>
        <div class="mt-12 grid items-end gap-10 border-t border-white/10 pt-6 md:mt-20 md:grid-cols-12 md:gap-8 md:pt-8">
          <p class="max-w-xl text-xl leading-[1.25] tracking-[-0.03em] text-text-primary md:col-span-7 md:text-3xl">{{ project.description }}</p>
          <div class="md:col-span-4 md:col-start-9"><span class="mb-3 block font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">Built with</span><p class="font-mono text-xs leading-relaxed text-text-primary md:text-sm">{{ project.tags.join(' · ') }}</p></div>
        </div>
      </div>
      <div class="hero-visual mx-auto mt-14 max-w-[1600px] overflow-hidden bg-bg-elevated md:mt-20">
        <img :src="project.image" :alt="`${project.title} project preview`" class="project-image h-full w-full object-cover" />
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-primary/25 via-transparent to-transparent"></div>
      </div>
    </section>
    <section class="border-y border-white/10 bg-[#101210] px-5 py-16 md:px-12 md:py-24">
      <div class="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12 md:gap-8"><p class="font-mono text-[10px] uppercase tracking-[0.18em] text-accent md:col-span-3 md:text-xs">The brief</p><h2 class="max-w-5xl font-display text-4xl font-medium leading-[0.94] tracking-[-0.055em] text-text-primary md:col-span-8 md:text-7xl">Make something complex feel immediate, calm, and confidently human.</h2></div>
    </section>
    <section class="px-5 py-20 md:px-12 md:py-36">
      <div class="mx-auto max-w-[1600px]">
        <div class="case-row grid gap-8 border-t border-white/10 py-10 md:grid-cols-12 md:gap-8 md:py-16"><div class="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary md:col-span-3 md:text-xs">01 / The challenge</div><div class="md:col-span-7"><p class="max-w-3xl text-2xl leading-[1.32] tracking-[-0.035em] text-text-primary md:text-4xl">{{ project.challenge }}</p></div></div>
        <div class="case-row grid gap-8 border-t border-white/10 py-10 md:grid-cols-12 md:gap-8 md:py-16"><div class="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary md:col-span-3 md:text-xs">02 / The approach</div><div class="md:col-span-7"><p class="max-w-3xl text-2xl leading-[1.32] tracking-[-0.035em] text-text-primary md:text-4xl">{{ project.solution }}</p></div></div>
        <div class="case-row grid gap-8 border-y border-white/10 py-10 md:grid-cols-12 md:gap-8 md:py-16"><div class="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary md:col-span-3 md:text-xs">03 / The result</div><div class="md:col-span-7"><p class="max-w-3xl text-2xl leading-[1.32] tracking-[-0.035em] text-text-primary md:text-4xl">{{ project.result }}</p><a :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="group mt-10 inline-flex items-center gap-5 border-b border-accent pb-3 font-mono text-xs uppercase tracking-[0.16em] text-text-primary transition-colors hover:text-accent">View source <span class="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span></a></div></div>
      </div>
    </section>
    <section v-if="nextProject" class="bg-[#d5e7cf] px-5 py-20 text-[#10271f] md:px-12 md:py-32">
      <NuxtLink :to="`/projects/${nextProject.slug}`" class="group block"><div class="mx-auto max-w-[1600px]"><p class="mb-7 font-mono text-[10px] uppercase tracking-[0.18em] md:text-xs">Next project / {{ nextProject.role }}</p><div class="flex items-end justify-between gap-4"><h2 class="font-display text-[clamp(4.1rem,12vw,13rem)] font-bold uppercase leading-[0.76] tracking-[-0.085em] transition-transform duration-500 group-hover:translate-x-3">{{ nextProject.title }}</h2><span class="mb-1 text-3xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 md:text-5xl">↗</span></div></div></NuxtLink>
    </section>
  </main>
  <main v-else class="flex min-h-screen items-center justify-center bg-bg-primary px-6 pt-[var(--header-height)] text-center"><div><p class="font-mono text-xs uppercase tracking-[0.18em] text-accent">404</p><h1 class="mt-4 font-display text-5xl font-bold uppercase tracking-[-0.06em]">Project not found</h1><NuxtLink to="/projects" class="mt-8 inline-block border-b border-accent pb-2 font-mono text-xs uppercase tracking-widest text-text-primary">Back to projects</NuxtLink></div></main>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useHead } from '#imports'
import { gsap } from 'gsap'
import { useProjectData } from '~/composables/useProjectData'
import { useReducedMotion } from '~/composables/useReducedMotion'

const route = useRoute()
const { getProjectBySlug, getNextProject, projects } = useProjectData()
const slug = computed(() => route.params.slug as string)
const project = computed(() => getProjectBySlug(slug.value))
const nextProject = computed(() => getNextProject(slug.value))
const projectNumber = computed(() => String(projects.findIndex(item => item.slug === slug.value) + 1).padStart(2, '0'))
const heroTitle = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()
let ctx: gsap.Context | undefined

useHead(() => ({ title: project.value ? `${project.value.title} | Ameen Mohamed` : 'Project | Ameen Mohamed' }))
onMounted(async () => {
  await nextTick()
  if (isReducedMotion.value || !heroTitle.value) return
  ctx = gsap.context(() => {
    gsap.from('.hero-kicker', { y: 18, opacity: 0, duration: 0.65, ease: 'power3.out' })
    gsap.from(heroTitle.value, { yPercent: 18, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.08 })
    gsap.from('.hero-visual', { clipPath: 'inset(0 0 100% 0)', duration: 1.25, ease: 'power4.inOut', delay: 0.25 })
    gsap.utils.toArray<HTMLElement>('.case-row').forEach((row) => gsap.from(row.children, { scrollTrigger: { trigger: row, start: 'top 82%' }, y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }))
  })
})
onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.hero-visual { position: relative; height: clamp(320px, 52vw, 780px); }
.project-image { transform: scale(1.03); animation: settle 1.5s cubic-bezier(.16, 1, .3, 1) .4s both; }
@keyframes settle { to { transform: scale(1); } }
@media (prefers-reduced-motion: reduce) { .project-image { animation: none; } }
</style>
