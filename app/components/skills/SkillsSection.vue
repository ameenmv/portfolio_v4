<template>
  <section id="skills" class="py-32 bg-bg-primary relative z-20 overflow-hidden w-full h-[120vh] min-h-[800px]" ref="sectionRef">
    
    <!-- Ambient Glowing Orbs -->
    <div class="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] bg-accent/10 rounded-full blur-[100px] transform -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>
    <div class="absolute top-1/2 right-1/4 w-[40vw] h-[40vw] bg-accent-cool/10 rounded-full blur-[100px] transform -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>

    <!-- Background Title (Behind the physics) -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.03]">
      <h2 class="text-[15vw] font-display font-bold whitespace-nowrap tracking-tighter">EXPERTISE</h2>
    </div>

    <!-- Header -->
    <div class="absolute top-32 left-0 right-0 z-10 pointer-events-none px-6 md:px-12">
      <div class="container mx-auto max-w-[1400px]">
        <SectionIntro 
          pretitle="Expertise" 
          title="Tools of the Trade." 
          description="A fully interactive physics simulation. Grab, drag, and throw the blocks around. Click a block to explore the stack."
        />
      </div>
    </div>

    <!-- Physics Container -->
    <div ref="containerRef" class="absolute inset-0 w-full h-full z-20 overflow-hidden touch-none" @mousedown="onMouseDown" @mouseup="onMouseUp">
      <!-- DOM representations of the physics bodies -->
      <div 
        v-for="(skill, index) in skills"
        :key="skill.title"
        ref="cardRefs"
        class="absolute top-0 left-0 w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-[40px] flex flex-col items-center justify-center gap-4 md:gap-6 cursor-grab active:cursor-grabbing border transition-all duration-300 will-change-transform backdrop-blur-md overflow-hidden group"
        :class="[
          skill.colorBorder,
          hoveredCard === index ? 'bg-white/10 scale-105 z-30' : 'bg-bg-secondary/60 shadow-2xl z-20'
        ]"
        @mouseenter="hoveredCard = index"
        @mouseleave="hoveredCard = null"
      >
        <!-- Subtle inner glow -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 mb-2 pointer-events-none transition-transform duration-300 group-hover:scale-110" :class="skill.textAccent">
          <component :is="skill.icon" class="w-10 h-10 md:w-12 md:h-12 pointer-events-none" />
        </div>
        
        <h3 class="text-3xl md:text-4xl font-display font-bold text-white text-center pointer-events-none px-4 tracking-tighter">
          {{ skill.title }}
        </h3>
        
        <!-- Tags inside the card to fill empty space -->
        <div class="flex flex-wrap justify-center gap-2 px-6 pointer-events-none">
          <span v-for="tag in skill.technologies.slice(0, 3)" :key="tag" class="text-[10px] md:text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10 bg-black/20 text-white/80">
            {{ tag }}
          </span>
          <span v-if="skill.technologies.length > 3" class="text-[10px] md:text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full text-white/50 bg-black/20 border border-white/5">
            +{{ skill.technologies.length - 3 }}
          </span>
        </div>

        <!-- Subtle hint -->
        <span class="absolute bottom-6 text-white/40 text-[10px] font-mono uppercase tracking-widest pointer-events-none flex items-center gap-2 group-hover:text-accent transition-colors duration-300">
          Click to open 
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </span>
      </div>
    </div>

    <!-- Detailed Modal (When clicked) -->
    <Transition name="fade">
      <div v-if="activeSkill !== null" class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl touch-auto">
        <div 
          class="relative w-full max-w-4xl bg-bg-secondary border rounded-[40px] p-8 md:p-16 shadow-2xl overflow-y-auto max-h-[90vh]"
          :class="skills[activeSkill].colorBorder"
          v-click-outside="closeModal"
        >
          <!-- Close Button -->
          <button @click="closeModal" class="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>

          <div class="flex items-center gap-6 mb-8">
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10" :class="skills[activeSkill].textAccent">
              <component :is="skills[activeSkill].icon" class="w-12 h-12" />
            </div>
            <h3 class="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white">
              {{ skills[activeSkill].title }}
            </h3>
          </div>

          <p class="text-xl md:text-2xl text-text-secondary leading-relaxed mb-12 max-w-3xl">
            {{ skills[activeSkill].description }}
          </p>
          
          <div class="mb-6">
            <h4 class="text-sm font-mono uppercase tracking-widest text-white/50 mb-4">Core Technologies</h4>
            <div class="flex flex-wrap gap-3">
              <span 
                v-for="tech in skills[activeSkill].technologies" 
                :key="tech"
                class="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white text-sm md:text-base font-bold tracking-widest shadow-sm"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Matter from 'matter-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'

import SectionIntro from '../ui/SectionIntro.vue'
import IconFrontend from '../icons/IconFrontend.vue'
import IconBackend from '../icons/IconBackend.vue'
import IconDesign from '../icons/IconDesign.vue'
import IconArchitecture from '../icons/IconArchitecture.vue'

// Custom directive to handle clicking outside the modal
const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    setTimeout(() => {
      document.body.addEventListener('click', el.clickOutsideEvent)
    }, 50)
  },
  unmounted(el: any) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}

const skills = [
  {
    title: 'Frontend',
    description: 'Specializing in the Vue ecosystem to build scalable, reactive, and highly performant applications. Deep understanding of modern state management and reactive patterns.',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Pinia', 'GSAP', 'WebGL', 'Tailwind'],
    colorBorder: 'border-accent/40',
    textAccent: 'text-accent',
    bgHoverClass: 'bg-accent/20',
    icon: IconFrontend
  },
  {
    title: 'Backend',
    description: 'Bridging the gap with full-stack capabilities. Building robust APIs, real-time communication servers, and managing complex databases.',
    technologies: ['Node.js', 'NestJS', 'MongoDB', 'Laravel', 'WebSockets', 'PostgreSQL'],
    colorBorder: 'border-accent-warm/40',
    textAccent: 'text-accent-warm',
    bgHoverClass: 'bg-accent-warm/20',
    icon: IconBackend
  },
  {
    title: 'Design',
    description: 'Translating complex designs into pixel-perfect, accessible, and responsive interfaces. Strong focus on design systems and micro-interactions.',
    technologies: ['Figma', 'Prototyping', 'Design Systems', 'Framer Motion', 'Spline'],
    colorBorder: 'border-accent-cool/40',
    textAccent: 'text-accent-cool',
    bgHoverClass: 'bg-accent-cool/20',
    icon: IconDesign
  },
  {
    title: 'Architecture',
    description: 'Setting up projects for long-term success. Implementing CI/CD pipelines, internationalization, and maintaining clean code standards.',
    technologies: ['Docker', 'Git', 'CI/CD', 'Jest', 'Clean Architecture', 'Turborepo'],
    colorBorder: 'border-[#b0aea5]/40', 
    textAccent: 'text-[#b0aea5]',
    bgHoverClass: 'bg-[#b0aea5]/20',
    icon: IconArchitecture
  }
]

const sectionRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

const hoveredCard = ref<number | null>(null)
const activeSkill = ref<number | null>(null)

let engine: Matter.Engine
let runner: Matter.Runner
let mouseConstraint: Matter.MouseConstraint
let resizeObserver: ResizeObserver

let dragStartX = 0
let dragStartY = 0
let isDragging = false

const { isReducedMotion } = useReducedMotion()

onMounted(async () => {
  if (isReducedMotion.value || !containerRef.value) return
  
  await nextTick()

  const Engine = Matter.Engine
  const Render = Matter.Render
  const Runner = Matter.Runner
  const Bodies = Matter.Bodies
  const Composite = Matter.Composite
  const Mouse = Matter.Mouse
  const MouseConstraint = Matter.MouseConstraint

  engine = Engine.create({
    gravity: { x: 0, y: 0 } // Zero gravity (floating space)
  })

  let width = containerRef.value.clientWidth
  let height = containerRef.value.clientHeight

  const wallOptions = { 
    isStatic: true, 
    render: { visible: false },
    restitution: 0.8 // Bouncy walls
  }
  
  const thickness = 100
  const walls = [
    Bodies.rectangle(width / 2, -thickness / 2, width * 2, thickness, wallOptions),
    Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, wallOptions),
    Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions),
    Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions)
  ]

  Composite.add(engine.world, walls)

  const cardBodies = cardRefs.value.map((el, index) => {
    const isMobile = window.innerWidth < 768
    const cardSize = isMobile ? 280 : 350
    
    // Spread them out in a loose grid so they don't explode initially
    const offsetX = index % 2 === 0 ? -150 : 150
    const offsetY = index < 2 ? -150 : 150
    const startX = width / 2 + offsetX
    const startY = height / 2 + offsetY
    
    const body = Bodies.rectangle(startX, startY, cardSize, cardSize, {
      restitution: 0.9, 
      frictionAir: 0.02, 
      friction: 0.05,
      density: 0.002,
      chamfer: { radius: 40 },
      render: { visible: false }
    })
    
    Matter.Body.setVelocity(body, { 
      x: (Math.random() - 0.5) * 8, 
      y: (Math.random() - 0.5) * 8 
    })
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03)
    
    ;(body as any).cardIndex = index
    
    return body
  })

  Composite.add(engine.world, cardBodies)

  const mouse = Mouse.create(containerRef.value)
  
  mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel)
  mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel)

  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: { visible: false }
    }
  })

  Composite.add(engine.world, mouseConstraint)

  ScrollTrigger.addEventListener("scrollStart", () => {
    if (mouseConstraint) {
      mouseConstraint.collisionFilter.mask = 0;
    }
  })
  
  ScrollTrigger.addEventListener("scrollEnd", () => {
    if (mouseConstraint) {
      mouseConstraint.collisionFilter.mask = 0xFFFFFFFF;
      Mouse.setOffset(mouse, { x: 0, y: -window.scrollY });
    }
  })

  Matter.Events.on(engine, 'afterUpdate', () => {
    // Attract bodies slowly to the center so they don't just hug the walls
    cardBodies.forEach((body, i) => {
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = centerX - body.position.x;
      const dy = centerY - body.position.y;
      
      // Apply a very gentle force towards the center
      Matter.Body.applyForce(body, body.position, {
        x: dx * 0.000002,
        y: dy * 0.000002
      });

      const el = cardRefs.value[i]
      if (el) {
        const x = body.position.x - el.offsetWidth / 2
        const y = body.position.y - el.offsetHeight / 2
        el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`
      }
    })
  })

  runner = Runner.create()
  Runner.run(runner, engine)
  
  resizeObserver = new ResizeObserver(() => {
    if (!containerRef.value) return
    width = containerRef.value.clientWidth
    height = containerRef.value.clientHeight
    
    Matter.Body.setPosition(walls[1], { x: width / 2, y: height + thickness / 2 })
    Matter.Body.setPosition(walls[3], { x: width + thickness / 2, y: height / 2 })
  })
  resizeObserver.observe(containerRef.value)
})

onUnmounted(() => {
  if (runner) Matter.Runner.stop(runner)
  if (engine) Matter.Engine.clear(engine)
  if (resizeObserver) resizeObserver.disconnect()
})

const onMouseDown = (e: MouseEvent) => {
  dragStartX = e.clientX
  dragStartY = e.clientY
  isDragging = false
}

const onMouseUp = (e: MouseEvent) => {
  const dist = Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY)
  if (dist > 10) {
    isDragging = true
    return
  }
  
  const target = e.target as HTMLElement
  const cardElement = target.closest('.cursor-grab') as HTMLElement | null
  
  if (cardElement) {
    const index = cardRefs.value.indexOf(cardElement)
    if (index !== -1) {
      activeSkill.value = index
    }
  }
}

const closeModal = () => {
  activeSkill.value = null
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, backdrop-filter 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.fade-enter-active .bg-bg-secondary,
.fade-leave-active .bg-bg-secondary {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease;
}

.fade-enter-from .bg-bg-secondary,
.fade-leave-to .bg-bg-secondary {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}
</style>
