<template>
  <section id="experience" class="bg-bg-secondary relative overflow-hidden" ref="sectionRef">
    <div class="container mx-auto px-6 md:px-12 pt-32 pb-16">
      <SectionIntro 
        pretitle="Journey" 
        title="Professional Experience." 
        description="My career path leading teams, building enterprise applications, and mentoring the next generation of developers."
      />
    </div>
    
    <!-- Horizontal Scroll Container -->
    <div class="h-screen flex items-center overflow-x-hidden" ref="scrollContainerRef">
      <div class="flex flex-nowrap h-[80vh] items-center px-6 md:px-24 will-change-transform hide-scrollbar" ref="horizontalWrapperRef">
        
        <TimelineCard 
          v-for="(job, index) in experience"
          :key="index"
          v-bind="job"
          :index="index"
        />
        
        <!-- End Spacer to ensure last card is fully visible -->
        <div class="w-[20vw] flex-shrink-0"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '~/composables/useReducedMotion'
import SectionIntro from '../ui/SectionIntro.vue'
import TimelineCard from './TimelineCard.vue'

const sectionRef = ref<HTMLElement | null>(null)
const scrollContainerRef = ref<HTMLElement | null>(null)
const horizontalWrapperRef = ref<HTMLElement | null>(null)
const { isReducedMotion } = useReducedMotion()

const experience = [
  {
    role: 'Frontend Developer',
    company: 'neop',
    date: '12/2025 - Present',
    achievements: [
      'Developed 50+ robust web applications using Vue.js and Nuxt.js ecosystems.',
      'Designed architecture and systems to enhance application responsiveness.',
      'Collaborated closely with cross-functional teams to implement efficient APIs.'
    ]
  },
  {
    role: 'Frontend Tech Lead & Mentor',
    company: 'CIS Team',
    date: '10/2025 - Present',
    achievements: [
      'Led the Frontend track, mentoring 150+ members through Technical Gates.',
      'Instructed advanced topics in Vue.js, Tailwind, and system architecture.',
      'Provided 1-on-1 code reviews and career guidance.'
    ]
  },
  {
    role: 'Frontend Developer',
    company: 'Azzrk',
    date: '10/2025 - 12/2025',
    achievements: [
      'Developed responsive and user-friendly web interfaces.',
      'Optimized Vue components for improved performance.',
      'Participated in code reviews and agile workflows.'
    ]
  },
  {
    role: 'PHP Backend Intern',
    company: 'ITI',
    date: '07/2025 - 08/2025',
    achievements: [
      'Built backend services using raw PHP and Laravel framework.',
      'Gained deep understanding of relational databases and RESTful API design.',
      'Integrated frontend client systems with backend databases.'
    ]
  }
]

let scrollTween: gsap.core.Tween | null = null

onMounted(() => {
  if (isReducedMotion.value || window.innerWidth < 768) {
    // Let it scroll natively on mobile or reduced motion
    if (horizontalWrapperRef.value) {
      horizontalWrapperRef.value.style.overflowX = 'auto'
      horizontalWrapperRef.value.style.webkitOverflowScrolling = 'touch'
    }
    return
  }

  setTimeout(() => {
    if (!horizontalWrapperRef.value || !scrollContainerRef.value) return
    
    const getScrollAmount = () => {
      const wrapperWidth = horizontalWrapperRef.value!.scrollWidth
      const windowWidth = window.innerWidth
      return -(wrapperWidth - windowWidth)
    }

    scrollTween = gsap.to(horizontalWrapperRef.value, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainerRef.value,
        start: "top top",
        end: () => `+=${Math.abs(getScrollAmount())}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })
  }, 100)
})

onUnmounted(() => {
  if (scrollTween) scrollTween.kill()
})
</script>
