<template>
  <section id="skills" class="bg-bg-primary relative overflow-hidden w-full h-[100vh] min-h-[800px] flex flex-col" ref="sectionRef">
    
    <!-- Cyberpunk Background Grid -->
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" 
         style="background-image: radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <!-- Huge Background Title -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-[0.02] mix-blend-screen">
      <h2 class="text-[20vw] font-display font-bold whitespace-nowrap tracking-tighter">STACK</h2>
    </div>

    <!-- Header (Stays at top, doesn't overlap cards) -->
    <div class="pt-24 md:pt-32 pb-8 px-6 md:px-12 z-30 pointer-events-none transition-opacity duration-1000 shrink-0"
         :class="hasShattered ? 'opacity-100' : 'opacity-0'">
      <div class="container mx-auto max-w-[1400px]">
        <SectionIntro 
          pretitle="Expertise" 
          title="Tools of the Trade." 
          description="A fully interactive physics simulation. Grab, drag, and throw the blocks around."
        />
      </div>
    </div>

    <!-- Physics Container (Takes remaining height) -->
    <div ref="containerRef" class="relative flex-1 w-full touch-none overflow-hidden z-20">
      
      <!-- The Cards (DOM mapped to Physics) -->
      <div 
        v-for="(skill, index) in skills"
        :key="skill.title"
        ref="cardOuterRefs"
        class="absolute top-0 left-0 w-[85vw] h-[45vh] md:w-[400px] md:h-[450px] will-change-transform z-20"
        :class="hasShattered ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'"
        @mouseenter="onCardEnter(index)"
        @mouseleave="onCardLeave(index)"
        @mousedown="onCardDown(index)"
        @mouseup="onCardUp(index)"
      >
        <!-- The Inner Card -->
        <div 
          class="inner-tilt-card w-full h-full rounded-[40px] p-6 md:p-8 flex flex-col relative overflow-hidden transition-all duration-500 border border-white/10 shadow-2xl backdrop-blur-xl"
          :class="[
            skill.colorBorder,
            activeCard === index && hasShattered ? 'bg-bg-elevated border-accent shadow-[0_0_80px_rgba(var(--color-accent),0.2)]' : 'bg-bg-secondary/80',
            !hasShattered ? 'grayscale brightness-75 scale-95' : 'scale-100'
          ]"
        >
          <!-- Subtle Glow on Hover -->
          <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
               :class="activeCard === index && hasShattered ? 'opacity-100' : ''"
               style="background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)">
          </div>

          <!-- Card Content -->
          <div class="relative z-10 h-full flex flex-col pointer-events-none transition-opacity duration-700" :class="!hasShattered ? 'opacity-50' : 'opacity-100'">
            
            <div class="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div class="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 shadow-inner shrink-0" :class="skill.textAccent">
                <component :is="skill.icon" class="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h3 class="text-2xl md:text-3xl font-display font-bold tracking-tighter text-white uppercase">
                {{ skill.title }}
              </h3>
            </div>

            <p class="text-white/80 text-sm md:text-base leading-relaxed mb-auto line-clamp-4">
              {{ skill.description }}
            </p>

            <div class="mt-4 pt-4 md:mt-6 md:pt-6 border-t border-white/10">
              <h4 class="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Core Technologies</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tech in skill.technologies" 
                  :key="tech"
                  class="px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-white/10 bg-black/40 text-white/90 text-[9px] md:text-xs font-bold tracking-widest uppercase shadow-sm transition-colors duration-500"
                  :class="!hasShattered ? 'border-transparent text-white/50' : ''"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
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

const skills = [
  {
    title: 'Frontend',
    description: 'Specializing in the Vue ecosystem to build scalable, reactive, and highly performant applications. Mastering modern state management and WebGL.',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Pinia', 'GSAP', 'WebGL', 'Tailwind'],
    colorBorder: 'hover:border-accent/50',
    textAccent: 'text-accent',
    icon: IconFrontend
  },
  {
    title: 'Backend',
    description: 'Bridging the gap with full-stack capabilities. Building robust APIs, real-time communication servers, and managing complex databases.',
    technologies: ['Node.js', 'NestJS', 'MongoDB', 'Laravel', 'WebSockets', 'PostgreSQL'],
    colorBorder: 'hover:border-accent-warm/50',
    textAccent: 'text-accent-warm',
    icon: IconBackend
  },
  {
    title: 'Design',
    description: 'Translating complex designs into pixel-perfect, accessible, and responsive interfaces. Strong focus on design systems and micro-interactions.',
    technologies: ['Figma', 'Design Systems', 'Framer Motion', 'Spline'],
    colorBorder: 'hover:border-accent-cool/50',
    textAccent: 'text-accent-cool',
    icon: IconDesign
  },
  {
    title: 'Architecture',
    description: 'Setting up projects for long-term success. Implementing CI/CD pipelines, internationalization, and maintaining clean code standards.',
    technologies: ['Docker', 'Git', 'CI/CD', 'Jest', 'Clean Code', 'Turborepo'],
    colorBorder: 'hover:border-[#b0aea5]/50', 
    textAccent: 'text-[#b0aea5]',
    icon: IconArchitecture
  }
]

const sectionRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const cardOuterRefs = ref<HTMLElement[]>([])

const activeCard = ref<number | null>(null)
const hasShattered = ref(false)

let engine: Matter.Engine
let runner: Matter.Runner
let mouseConstraint: Matter.MouseConstraint
let resizeObserver: ResizeObserver
let cardBodies: Matter.Body[] = []
let cardSprings: Matter.Constraint[] = []

const { isReducedMotion } = useReducedMotion()

onMounted(async () => {
  if (isReducedMotion.value || !containerRef.value) return
  await nextTick()

  const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Constraint } = Matter

  engine = Engine.create({
    gravity: { x: 0, y: 0 } // Zero gravity
  })

  let width = containerRef.value.clientWidth
  let height = containerRef.value.clientHeight

  // Extremely thick invisible boundaries so cards NEVER fly off screen
  const wallOptions = { isStatic: true, render: { visible: false }, restitution: 0.5, friction: 0.1 }
  const thickness = 3000 // Huge thickness to prevent tunneling
  const walls = [
    Bodies.rectangle(width / 2, -thickness / 2, width * 2, thickness, wallOptions),
    Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, wallOptions),
    Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, wallOptions),
    Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, wallOptions)
  ]
  Composite.add(engine.world, walls)

  // Create Physics Bodies
  cardOuterRefs.value.forEach((el, index) => {
    // Dynamic sizes based on viewport
    const isMobile = window.innerWidth < 768
    const cardW = isMobile ? width * 0.85 : 400
    const cardH = isMobile ? height * 0.5 : 450
    
    // SAFE SPAWNING: Calculate ideal grid positions
    const gap = 20
    let idealX = width / 2 + (index % 2 === 0 ? -(cardW / 2 + gap/2) : (cardW / 2 + gap/2))
    let idealY = height / 2 + (index < 2 ? -(cardH / 2 + gap/2) : (cardH / 2 + gap/2))
    
    // CLAMP to screen bounds to prevent spawning inside walls
    const marginX = cardW / 2 + 10;
    const marginY = cardH / 2 + 10;
    idealX = Math.max(marginX, Math.min(width - marginX, idealX));
    idealY = Math.max(marginY, Math.min(height - marginY, idealY));
    
    const body = Bodies.rectangle(idealX, idealY, cardW, cardH, {
      restitution: 0.5, // Bouncy
      frictionAir: 0.08, 
      friction: 0.2,
      density: 0.05, // Heavy so they feel solid
      chamfer: { radius: 40 },
    })
    
    // The Rigid Grid Locks (Starts out very stiff to hold them in grid)
    const spring = Constraint.create({
      pointA: { x: idealX, y: idealY },
      bodyB: body,
      pointB: { x: 0, y: 0 },
      stiffness: 0.1, // Stiff enough to hold them
      damping: 0.8 // High damping to prevent shaking
    })
    
    Composite.add(engine.world, [body, spring])
    cardBodies.push(body)
    cardSprings.push(spring)
  })

  // Mouse interaction
  const mouse = Mouse.create(containerRef.value)
  mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel)
  mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel)

  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.1, 
      render: { visible: false }
    }
  })

  Composite.add(engine.world, mouseConstraint)

  // Sync DOM elements with Physics Bodies
  Matter.Events.on(engine, 'afterUpdate', () => {
    cardBodies.forEach((body, i) => {
      
      // Fallback rescue if physics engine explodes with NaN
      if (isNaN(body.position.x) || isNaN(body.position.y) || isNaN(body.angle)) {
        const el = cardOuterRefs.value[i]
        if (el) {
          // Rescue layout: Just space them out manually so they don't stack at 0,0
          el.style.transform = `translate(${100 + i * 50}px, ${100 + i * 50}px)`
        }
        return; // Skip physics math for this corrupted body
      }

      // Physics logic
      if (!mouseConstraint.body && hasShattered.value) {
        // Gently pull angle to 0 like it has a heavy bottom
        Matter.Body.setAngle(body, body.angle * 0.9);
        Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.85);
      }

      // Safe Velocity Clamping
      const maxVelocity = 40;
      const speed = Math.sqrt(body.velocity.x ** 2 + body.velocity.y ** 2);
      
      if (speed > maxVelocity && speed !== Infinity && !isNaN(speed)) {
        const ratio = maxVelocity / speed;
        Matter.Body.setVelocity(body, {
          x: body.velocity.x * ratio,
          y: body.velocity.y * ratio
        });
      }

      const el = cardOuterRefs.value[i]
      if (el) {
        const x = body.position.x - el.offsetWidth / 2
        const y = body.position.y - el.offsetHeight / 2
        el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`
      }
    })
  })

  runner = Runner.create()
  Runner.run(runner, engine)
  
  // THE SHATTER TRIGGER
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: "top 40%", 
    once: true,
    onEnter: () => {
      hasShattered.value = true;
      
      cardBodies.forEach((body, i) => {
        // 1. Relax the springs completely so they float
        const spring = cardSprings[i]
        spring.stiffness = 0.0005 // Very loose rubber band
        spring.damping = 0.1
        
        // 2. Massive explosive force outwards from the center!
        const forceX = body.position.x > width / 2 ? 10 : -10;
        const forceY = body.position.y > height / 2 ? 10 : -10;
        
        Matter.Body.setVelocity(body, { 
          x: forceX + (Math.random() - 0.5) * 10, 
          y: forceY + (Math.random() - 0.5) * 10 
        });
        
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
      });
    }
  })

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

const onCardEnter = (index: number) => {
  if (!hasShattered.value) return
  activeCard.value = index
  const innerCard = cardOuterRefs.value[index].querySelector('.inner-tilt-card')
  gsap.to(innerCard, { scale: 1.03, duration: 0.4, ease: "power2.out" })
}

const onCardLeave = (index: number) => {
  if (!hasShattered.value) return
  activeCard.value = null
  const innerCard = cardOuterRefs.value[index].querySelector('.inner-tilt-card')
  gsap.to(innerCard, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" })
}

const onCardDown = (index: number) => {
  if (!hasShattered.value) return
  const innerCard = cardOuterRefs.value[index].querySelector('.inner-tilt-card')
  gsap.to(innerCard, { scale: 0.98, duration: 0.2, ease: "power2.out" })
}

const onCardUp = (index: number) => {
  if (!hasShattered.value) return
  const innerCard = cardOuterRefs.value[index].querySelector('.inner-tilt-card')
  gsap.to(innerCard, { scale: 1.03, duration: 0.4, ease: "back.out(1.5)" })
}
</script>

<style scoped>
section {
  overscroll-behavior: none;
}
</style>
