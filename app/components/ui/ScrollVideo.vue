<template>
  <div class="w-full bg-bg-primary relative" ref="sectionRef">
    <div class="h-screen w-full flex items-center justify-center overflow-hidden" ref="videoContainerRef">
      <video
        ref="videoRef"
        :src="videoSrc"
        class="w-full h-full object-cover"
        playsinline
        muted
        preload="auto"
      ></video>
      
      <div class="absolute inset-0 bg-black/30 pointer-events-none"></div>
      
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 class="text-6xl md:text-8xl font-display font-bold text-white opacity-90 tracking-tighter uppercase" ref="textRef">
          Behind The Code
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const props = defineProps({
  src: { type: String, required: true }
})

const sectionRef = ref<HTMLElement | null>(null)
const videoContainerRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const videoSrc = ref<string>('')

let scrollTween: gsap.core.Tween | null = null
let textTween: gsap.core.Tween | null = null

onMounted(() => {
  const video = videoRef.value
  if (!video || !sectionRef.value) return

  // Function to initialize GSAP ScrollTrigger
  const initScrollTrigger = () => {
    const duration = video.duration || 10
    
    const proxy = { time: 0 }
    
    scrollTween = gsap.to(proxy, {
      time: duration,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: "+=200%", 
        scrub: 0.2,
        pin: true
      },
      onUpdate: () => {
        if (!video.seeking) {
          requestAnimationFrame(() => {
            video.currentTime = proxy.time
          })
        }
      }
    })
    
    textTween = gsap.to(textRef.value, {
      scale: 1.5,
      opacity: 0,
      ease: "power2.in",
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top top",
        end: "+=150%",
        scrub: true
      }
    })
  }

  // Load Video into RAM (Blob) for blazing fast I/O during scrubbing
  fetch(props.src)
    .then(res => res.blob())
    .then(blob => {
      videoSrc.value = URL.createObjectURL(blob)
      
      // Wait for the video to have enough data to know its duration
      if (video.readyState >= 2) {
        initScrollTrigger()
      } else {
        video.addEventListener('loadeddata', initScrollTrigger, { once: true })
      }
    })
    .catch(err => {
      console.error("Failed to load video as blob:", err)
      // Fallback to normal src if fetch fails
      videoSrc.value = props.src
      video.addEventListener('loadeddata', initScrollTrigger, { once: true })
    })
})

onUnmounted(() => {
  if (scrollTween) {
    scrollTween.scrollTrigger?.kill()
    scrollTween.kill()
  }
  if (textTween) {
    textTween.scrollTrigger?.kill()
    textTween.kill()
  }
})
</script>
