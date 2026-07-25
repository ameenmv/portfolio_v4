<template>
  <div class="w-full max-w-5xl mx-auto py-12 md:py-24 relative" ref="containerRef">
    
    <!-- Success Message Overlay -->
    <div v-if="success" class="absolute inset-0 flex flex-col items-center justify-center text-center z-20 bg-bg-primary/95 backdrop-blur-xl rounded-3xl" ref="successRef">
      <h3 class="text-5xl md:text-7xl font-display font-bold text-accent mb-6">Message Sent.</h3>
      <p class="text-xl md:text-3xl text-text-secondary font-light">Thanks for reaching out. I'll get back to you shortly.</p>
    </div>

    <!-- Conversational Form -->
    <form @submit.prevent="handleSubmit" class="w-full transition-opacity duration-700" :class="{ 'opacity-0 pointer-events-none': success, 'form-focused': isFocused }">
      <h2 class="text-3xl md:text-5xl lg:text-[4.5rem] font-display font-light text-text-primary leading-[1.5] md:leading-[1.6] tracking-tight transform-gpu" style="transform-style: preserve-3d; perspective: 1000px;" ref="textWrapperRef">
        
        <span class="inline-block word">Hello</span> <span class="inline-block word">Ameen,</span> <span class="inline-block word">my</span> <span class="inline-block word">name</span> <span class="inline-block word">is</span>
        
        <div class="inline-block relative mx-2 md:mx-4 group align-middle">
          <input 
            type="text" 
            v-model="form.name" 
            @input="playType"
            @focus="handleFocus"
            @blur="handleBlur"
            required
            data-hover-text="Type"
            class="bg-transparent border-b-2 border-white/20 text-accent font-medium focus:outline-none focus:border-accent transition-colors text-center min-w-[250px] md:min-w-[400px]"
            :style="{ width: Math.max(250, form.name.length * 40 + 60) + 'px', maxWidth: '100%' }"
            placeholder="Your Name"
          />
        </div>
        
        <span class="inline-block word">and</span> <span class="inline-block word">I'm</span> <span class="inline-block word">reaching</span> <span class="inline-block word">out</span> <span class="inline-block word">because</span> <span class="inline-block word">I'd</span> <span class="inline-block word">like</span> <span class="inline-block word">to</span>
        
        <div class="inline-block relative mx-2 md:mx-4 group w-full md:w-auto align-bottom mt-4 md:mt-0">
          <textarea 
            ref="messageRef"
            v-model="form.message" 
            @input="autoResize"
            @focus="handleFocus"
            @blur="handleBlur"
            required
            rows="1"
            data-hover-text="Type"
            class="bg-transparent border-b-2 border-white/20 text-accent font-medium focus:outline-none focus:border-accent transition-colors resize-none overflow-hidden w-full min-w-[300px] md:min-w-[700px] leading-[1.5]"
            placeholder="discuss a project / say hi"
          ></textarea>
        </div>
        
        <span class="inline-block word mt-4 md:mt-0">You</span> <span class="inline-block word">can</span> <span class="inline-block word">reply</span> <span class="inline-block word">to</span> <span class="inline-block word">me</span> <span class="inline-block word">at</span>
        
        <div class="inline-block relative mx-2 md:mx-4 group align-middle mt-4 md:mt-0">
          <input 
            type="email" 
            v-model="form.email" 
            @input="playType"
            @focus="handleFocus"
            @blur="handleBlur"
            required
            data-hover-text="Type"
            class="bg-transparent border-b-2 border-white/20 text-accent font-medium focus:outline-none focus:border-accent transition-colors text-center min-w-[300px] md:min-w-[550px]"
            :style="{ width: Math.max(300, form.email.length * 40 + 60) + 'px', maxWidth: '100%' }"
            placeholder="Email Address"
          />
        </div>
        
        <span class="inline-block word text-accent">.</span>
      </h2>

      <div class="mt-16 md:mt-24 flex justify-end pt-4" ref="btnContainerRef">
        <button 
          ref="btnRef"
          type="submit" 
          data-hover-text="Send"
          class="w-full md:w-auto px-12 md:px-16 py-5 md:py-6 rounded-full bg-text-primary text-bg-primary font-display font-bold text-lg md:text-xl tracking-widest uppercase hover:bg-accent hover:text-bg-primary transition-all duration-300 overflow-hidden relative group btn-special will-change-transform submit-btn"
          :disabled="isSubmitting"
        >
          <span class="relative z-10">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
          <div class="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useSound } from '~/composables/useSound'
import { useMagnetic } from '~/composables/useMagnetic'

const { playType, playSuccess, playClick } = useSound()

const containerRef = ref<HTMLElement | null>(null)
const textWrapperRef = ref<HTMLElement | null>(null)
const btnRef = ref<HTMLElement | null>(null)
const messageRef = ref<HTMLTextAreaElement | null>(null)

useMagnetic(btnRef, 0.4)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const success = ref(false)
const isFocused = ref(false)

const handleFocus = () => isFocused.value = true
const handleBlur = () => isFocused.value = false

const autoResize = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  target.style.height = 'auto'
  target.style.height = target.scrollHeight + 'px'
  playType()
}

const handleSubmit = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  playClick() // from useSound if we want a nice click sound, assuming playType is there
  
  // 1. Text collapses and fades out
  gsap.to('.word, input, textarea', {
    y: 20,
    opacity: 0,
    scale: 0.9,
    stagger: 0.02,
    duration: 0.6,
    ease: 'power3.in'
  })
  
  // 2. Button transforms into a "paper airplane" and shoots off
  const tl = gsap.timeline({
    onComplete: () => {
      success.value = true
      isSubmitting.value = false
      playSuccess()
      
      gsap.fromTo('.success-msg', 
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'elastic.out(1, 0.7)', stagger: 0.1 }
      )
      
      // Reset form silently in background
      setTimeout(() => {
        form.name = ''
        form.email = ''
        form.message = ''
        success.value = false
        if (messageRef.value) messageRef.value.style.height = 'auto'
        
        // Reset positions
        gsap.set('.word, input, textarea', { y: 0, opacity: 1, scale: 1 })
        gsap.set(btnRef.value, { x: 0, scale: 1 })
      }, 5000)
    }
  })
  
  // Button takes off
  tl.to(btnRef.value, {
    scale: 0.8,
    duration: 0.4,
    ease: 'back.in(1.5)',
    delay: 0.4
  })
  .to(btnRef.value, {
    x: '150vw',
    rotation: 15,
    duration: 0.8,
    ease: 'power4.inOut'
  })

  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 1500))
}

// 3D Parallax Mouse Handler
const handleMouseMove = (e: MouseEvent) => {
  if (!textWrapperRef.value || window.innerWidth < 768) return // Disable on mobile
  
  const x = (e.clientX / window.innerWidth - 0.5) * 2 // -1 to 1
  const y = (e.clientY / window.innerHeight - 0.5) * 2 // -1 to 1
  
  gsap.to(textWrapperRef.value, {
    rotateX: -y * 8, // Max 8 degrees tilt
    rotateY: x * 8,
    duration: 1,
    ease: 'power2.out'
  })
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  
  // GSAP Entrance Animation
  const tl = gsap.timeline({ delay: 0.2 })
  
  tl.fromTo('.word', 
    { y: 50, opacity: 0, rotateZ: 5 },
    { y: 0, opacity: 1, rotateZ: 0, duration: 1, ease: 'power4.out', stagger: 0.03 }
  )
  
  tl.fromTo('input, textarea', 
    { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
    { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 },
    "-=0.5"
  )
  
  tl.fromTo('.submit-btn',
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'expo.out' },
    "-=0.5"
  )
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.form-focused .word {
  opacity: 0.2;
}

.word {
  transition: opacity 0.5s ease;
}

input, textarea {
  transition: width 0.2s ease, border-color 0.3s ease;
}

input::placeholder, textarea::placeholder {
  color: rgba(255, 255, 255, 0.15);
  font-weight: 300;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
