<template>
  <section class="py-32 bg-bg-secondary relative overflow-hidden z-20 border-y border-white/5">
    <!-- Decorative background element -->
    <div class="absolute left-0 bottom-0 w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>
    
    <div class="container mx-auto px-6 md:px-12 mb-16 relative z-10">
      <SectionIntro 
        pretitle="Social Proof" 
        title="What they say." 
        description="I've had the pleasure of working with amazing teams and mentoring hundreds of developers. Here is what some of them have to say."
      />
    </div>

    <!-- Infinite Testimonial Slider -->
    <div class="relative w-full overflow-hidden flex items-center group">
      <div class="flex animate-marquee-testimonials hover:[animation-play-state:paused] will-change-transform pb-8">
        
        <!-- Repeat the items twice for seamless loop -->
        <div v-for="loop in 2" :key="loop" class="flex items-stretch gap-6 px-3">
          
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="w-[85vw] md:w-[400px] flex-shrink-0 bg-bg-elevated p-8 rounded-3xl border border-white/5 hover:border-accent/30 transition-colors duration-500 flex flex-col justify-between"
          >
            <div class="mb-8">
              <div class="text-accent mb-6">
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0H0V12H7C7 16.5 4 19.5 0 21.5L2 24C8 21.5 12 16.5 12 10V0ZM32 0H20V12H27C27 16.5 24 19.5 20 21.5L22 24C28 21.5 32 16.5 32 10V0Z" fill="currentColor"/>
                </svg>
              </div>
              <p class="text-text-primary text-lg md:text-xl font-medium leading-relaxed opacity-90">
                "{{ testimonial.quote }}"
              </p>
            </div>
            
            <div class="flex items-center gap-4 pt-6 border-t border-white/10">
              <div class="w-12 h-12 rounded-full bg-black flex items-center justify-center text-xl font-display font-bold text-text-secondary overflow-hidden border border-white/10">
                <span v-if="!testimonial.image">{{ testimonial.name.charAt(0) }}</span>
                <img v-else :src="testimonial.image" :alt="testimonial.name" class="w-full h-full object-cover" loading="lazy" />
              </div>
              <div>
                <h4 class="text-text-primary font-bold">{{ testimonial.name }}</h4>
                <p class="text-text-secondary text-sm font-mono mt-1">{{ testimonial.role }} <span class="text-accent">@ {{ testimonial.company }}</span></p>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      
      <!-- Gradient Fades -->
      <div class="absolute left-0 top-0 w-16 md:w-48 h-full bg-gradient-to-r from-bg-secondary to-transparent pointer-events-none z-10"></div>
      <div class="absolute right-0 top-0 w-16 md:w-48 h-full bg-gradient-to-l from-bg-secondary to-transparent pointer-events-none z-10"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionIntro from '../ui/SectionIntro.vue'

const testimonials = [
  {
    quote: "Ameen completely transformed our legacy architecture. The new Nuxt 3 frontend is ridiculously fast, and his approach to real-time data flow using WebSockets saved our trading platform during peak hours.",
    name: "Ahmed Yassin",
    role: "Engineering Manager",
    company: "neop",
    image: ""
  },
  {
    quote: "As a mentor, Ameen has an incredible ability to break down complex Vue and architectural concepts into digestible pieces. His guidance at CIS Team elevated the entire frontend track.",
    name: "Salma Tarek",
    role: "Frontend Developer",
    company: "CIS Team",
    image: ""
  },
  {
    quote: "Working with Ameen on Haze Clue was a masterclass in performance optimization. He managed to keep our WebGL shaders running at 60fps while handling intense multiplayer state.",
    name: "Omar Khaled",
    role: "Lead Designer",
    company: "Haze Studio",
    image: ""
  },
  {
    quote: "Sa5er CLI has become an indispensable part of my daily workflow. It's rare to see a developer who can bridge the gap between AI, Node.js, and excellent developer experience so flawlessly.",
    name: "Yousef Ali",
    role: "Full Stack Engineer",
    company: "Tech Lead",
    image: ""
  }
]
</script>

<style scoped>
.animate-marquee-testimonials {
  animation: marquee-test 40s linear infinite;
}

@keyframes marquee-test {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
</style>
