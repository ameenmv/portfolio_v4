<template>
  <div 
    v-if="!isTouchDevice && !isReducedMotion" 
    class="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
  >
    <!-- Outer Ring Container (moves, but does NOT scale) -->
    <div 
      ref="cursorRing" 
      class="absolute top-0 left-0 w-12 h-12 flex items-center justify-center pointer-events-none will-change-transform"
    >
      <!-- Visual Circle (stretches and scales) for default hover -->
      <div 
        v-show="cursorType !== 'project'"
        ref="cursorRingVisual"
        class="absolute inset-0 border border-accent/60 rounded-full mix-blend-difference pointer-events-none will-change-transform"
        :class="{ 'border-transparent bg-white/90 mix-blend-normal': isHovering }"
        style="transition: background-color 0.3s, border-color 0.3s;"
      ></div>

      <!-- Text (does NOT scale) for default hover -->
      <span 
        v-show="cursorType !== 'project'"
        class="text-bg-primary text-[10px] font-bold tracking-widest uppercase opacity-0 pointer-events-none relative z-10 whitespace-nowrap"
        :class="{ 'opacity-100': isHovering }"
        style="transition: opacity 0.3s 0.1s;"
      >
        {{ hoverText }}
      </span>

      <!-- Project Hover Badge (does not stretch) -->
      <div 
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[192px] h-[192px] flex items-center justify-center opacity-0 pointer-events-none transition-all duration-300 ease-out"
        :class="{'opacity-100 scale-100': isHovering && cursorType === 'project', 'scale-50': !isHovering || cursorType !== 'project'}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" class="absolute w-full h-full animate-spin-slow">
          <path fill="#fff" d="M140.1 18.496c2.717 2.113 4.525 4.08 2.889 6.896-1.261 2.168-4.217 3.096-7.736 1.05-3.709-2.155-3.933-5.491-2.496-7.964l1.902 1.105c-.735 1.354-1.115 3.627 1.567 5.186 2.625 1.525 4.132.595 4.718-.413.686-1.18.32-2.257-2.117-4.106-2.898-2.194-3.999-4.284-2.672-6.566 1.216-2.092 3.976-2.727 7.077-.925 3.29 1.912 3.52 4.845 2.317 7.046l-1.845-1.072c.685-1.18.704-3.051-1.483-4.322-2.245-1.305-3.532-.578-4.041.297-.475.818-.589 1.846 1.92 3.788m21.907 8.415 1.706 1.525-10.323 11.547-1.706-1.525 4.517-5.052-5.773-5.161-4.517 5.05-1.706-1.524 10.324-11.546 1.705 1.525-4.516 5.051 5.773 5.162zm11.469 12.88c2.769 3.834 1.56 8.209-1.989 10.772s-8.082 2.337-10.852-1.497-1.56-8.209 1.989-10.772 8.082-2.337 10.852 1.497m-11.271 8.141c1.932 2.675 5.249 2.722 7.942.776s3.692-5.108 1.759-7.784c-1.932-2.675-5.249-2.721-7.942-.776s-3.692 5.11-1.759 7.784m18.721 3.467.897 2.295-10.336 7.037c-.505.34-1.166.645-1.649.857-.123.048-.189.121-.141.244s.146.132.269.084c.492-.192 1.176-.436 1.777-.529l12.321-1.955.897 2.295-10.384 6.914c-.505.34-1.173.624-1.665.816-.123.048-.189.121-.141.244s.146.132.269.084c.5-.172 1.192-.395 1.793-.488l12.369-1.832.897 2.295-15.835 2.029-1.217-3.115 9.459-6.199c.242-.165.697-.39 1.202-.611.123-.048.189-.121.141-.244s-.146-.132-.269-.084c-.521.18-1.008.323-1.298.365l-11.156 1.855-1.217-3.115zm2.899 35.284c4.378-.067 7.961 2.585 8.033 7.359.073 4.795-3.219 6.803-5.878 7.042l-.034-2.266c1.822-.248 4.022-1.711 3.977-4.68-.051-3.345-2.741-5.218-6.063-5.168s-5.954 2.005-5.903 5.349c.045 2.97 2.288 4.365 4.117 4.558l.034 2.265c-2.664-.157-6.016-2.065-6.088-6.86-.073-4.774 3.428-7.533 7.805-7.6m-9.898 28.865 3.87-.501 1.413-7.032-3.376-1.957.502-2.502 14.075 8.572-.693 3.451-16.294 2.471zm7.056-6.526-1.162 5.78 7.923-1.011c.297-.03.573-.064.949-.033.134.004.263.03.293-.121.031-.151-.099-.177-.224-.225-.358-.116-.599-.255-.862-.397zm-2.385 21.243c-1.771 2.951-3.506 4.983-6.498 3.697-2.304-.99-3.581-3.814-1.974-7.553 1.694-3.941 4.979-4.565 7.606-3.436l-.868 2.021c-1.432-.567-3.735-.67-4.959 2.179-1.199 2.79-.094 4.175.977 4.635 1.253.539 2.279.046 3.822-2.596 1.828-3.141 3.771-4.486 6.197-3.443 2.223.955 3.185 3.62 1.769 6.914-1.502 3.497-4.386 4.078-6.716 3.148l.842-1.96c1.254.538 3.114.332 4.113-1.992 1.025-2.386.148-3.577-.782-3.976-.869-.374-1.903-.363-3.529 2.362m-7.21 21.745 4.456-6.548-4.002-2.723-3.663 5.384-1.601-1.089 3.664-5.384-4.002-2.723-4.455 6.548-1.601-1.089 5.743-8.439 12.805 8.713-5.743 8.439zm-34.35 23.254c-3.252 1.123-5.888 1.566-7.354-1.341-1.13-2.239-.295-5.223 3.339-7.057 3.83-1.932 6.748-.3 8.037 2.254l-1.965.991c-.733-1.356-2.431-2.914-5.2-1.516-2.711 1.367-2.753 3.138-2.228 4.179.614 1.218 1.717 1.499 4.596.466 3.42-1.233 5.772-1.015 6.961 1.342 1.09 2.161.116 4.821-3.085 6.436-3.398 1.714-5.981.307-7.17-1.902l1.905-.962c.615 1.218 2.173 2.255 4.432 1.116 2.318-1.17 2.411-2.646 1.955-3.549-.426-.845-1.226-1.501-4.223-.457m-19.019 13.761-2.21.595-4.029-14.955 2.209-.595 1.763 6.543 7.477-2.015-1.763-6.543 2.21-.595 4.029 14.955-2.209.595-1.763-6.543-7.477 2.015zm-17.06 2.564c-4.725.222-7.726-3.182-7.932-7.555s2.462-8.045 7.187-8.268c4.724-.222 7.726 3.183 7.932 7.556s-2.462 8.044-7.187 8.267m-.654-13.889c-3.297.156-5.15 2.908-4.993 6.226.156 3.318 2.26 5.884 5.556 5.729s5.149-2.907 4.992-6.226c-.156-3.318-2.259-5.884-5.555-5.729m-13.04 13.803-2.416-.489-.323-12.499c-.012-.609.09-1.329.172-1.851.026-.129 0-.224-.129-.251-.13-.026-.19.052-.216.181-.104.518-.27 1.225-.517 1.781l-5.025 11.419-2.415-.489-.194-12.473c-.011-.609.111-1.325.216-1.842.026-.13 0-.225-.13-.251-.129-.026-.19.052-.215.181-.126.513-.313 1.216-.56 1.772l-5.154 11.393-2.416-.489 6.865-14.413 3.277.663.093 11.308c.008.294-.049.798-.136 1.342-.026.129 0 .224.129.25s.19-.051.216-.18c.13-.535.274-1.022.395-1.29l4.479-10.384 3.278.663zm-31.239-16.612c-2.303 3.723-6.468 5.311-10.528 2.799-4.078-2.524-3.995-6.379-2.763-8.747l1.927 1.192c-.774 1.669-.727 4.311 1.799 5.874 2.843 1.759 5.872.503 7.62-2.322s1.52-6.096-1.323-7.856c-2.525-1.562-4.91-.425-6.058 1.012l-1.927-1.193c1.569-2.159 4.982-3.954 9.06-1.43 4.06 2.512 4.497 6.948 2.193 10.671M37.024 151.02l-1.654 3.535 5.176 4.965 3.463-1.799 1.842 1.767-14.786 7.277-2.54-2.436 6.657-15.076zm1.721 9.455-4.255-4.081-3.397 7.228c-.135.267-.254.519-.481.819-.075.11-.167.206-.056.312s.203.012.31-.068c.29-.24.537-.369.798-.515zm-16.65-13.361c-1.552-3.071-2.347-5.622.335-7.468 2.066-1.422 5.136-.998 7.444 2.355 2.432 3.534 1.209 6.646-1.147 8.267l-1.247-1.812c1.243-.909 2.558-2.802.799-5.357-1.721-2.501-3.482-2.304-4.443-1.643-1.123.773-1.253 1.904.16 4.617 1.684 3.222 1.786 5.582-.389 7.079-1.993 1.372-4.76.766-6.794-2.188-2.158-3.135-1.112-5.884.916-7.361l1.21 1.758c-1.123.773-1.94 2.458-.506 4.542 1.472 2.138 2.947 2.031 3.78 1.457.78-.537 1.322-1.417-.117-4.246M7.549 129.395l3.153 7.265 4.44-1.927-2.593-5.973 1.776-.771 2.593 5.974 4.44-1.927-3.153-7.265L19.98 124l4.064 9.364-14.208 6.166-4.064-9.364zm.157-50.869c1.156-3.241 2.458-5.575 5.644-4.903 2.454.518 4.261 3.035 3.421 7.017-.885 4.198-3.983 5.456-6.782 4.865l.454-2.152c1.516.274 3.794-.077 4.434-3.112.627-2.971-.73-4.111-1.87-4.352-1.335-.281-2.244.404-3.236 3.297-1.175 3.44-2.816 5.14-5.399 4.595-2.368-.5-3.835-2.922-3.095-6.431.785-3.724 3.498-4.86 5.966-4.408l-.44 2.088c-1.335-.281-3.119.287-3.641 2.763-.536 2.54.558 3.535 1.549 3.744.925.195 1.937-.019 2.995-3.011M8.932 55.03l.926-2.092 14.162 6.27-.926 2.092-6.196-2.743-3.135 7.081 6.196 2.743-.926 2.092-14.162-6.27.926-2.092 6.196 2.743 3.135-7.08zm8.736-14.879c2.799-3.813 7.333-4.005 10.863-1.415s4.705 6.974 1.907 10.787-7.334 4.006-10.863 1.415c-3.53-2.59-4.706-6.974-1.907-10.787m11.209 8.227c1.953-2.66.978-5.832-1.7-7.797-2.678-1.966-5.996-1.945-7.948.715-1.953 2.66-.978 5.832 1.7 7.798 2.678 1.965 5.995 1.944 7.948-.716m-2.482-18.856 1.905-1.563 9.891 7.65c.48.375.974.909 1.325 1.303.084.102.174.142.276.059.102-.084.08-.18-.003-.282-.335-.408-.779-.984-1.053-1.526l-5.674-11.111 1.905-1.563 9.79 7.733c.478.376.956.923 1.29 1.331.084.102.174.142.276.059.102-.084.08-.18-.003-.282-.318-.422-.745-1.011-1.02-1.554L39.73 18.58l1.904-1.563 6.831 14.43-2.585 2.121-8.822-7.076c-.233-.179-.588-.542-.953-.953-.084-.102-.174-.142-.276-.059-.102.084-.08.18.003.282.332.44.62.858.75 1.121l5.216 10.034-2.585 2.121zM59.01 15.817c-1.432-4.137-.033-8.37 4.478-9.93 4.532-1.57 7.47.93 8.527 3.38l-2.141.741c-.805-1.653-2.883-3.285-5.69-2.314-3.16 1.094-4.098 4.236-3.011 7.375s3.766 5.029 6.926 3.935c2.806-.972 3.43-3.54 3.041-5.337l2.142-.741c.683 2.58-.08 6.36-4.612 7.929-4.512 1.561-8.227-.9-9.66-5.038m30.51.353-1.693-3.516-7.119.87-.796 3.82-2.533.31L81.09 1.597l3.494-.427 7.469 14.69zm-8.413-4.646 5.852-.715-3.45-7.202c-.123-.273-.242-.525-.331-.89-.038-.13-.054-.26-.207-.241-.153.018-.137.15-.143.283.002.377-.053.65-.106.944zm20.85-4.474c3.363.727 5.845 1.717 5.59 4.963-.196 2.5-2.459 4.617-6.517 4.298-4.276-.335-5.924-3.245-5.7-6.097l2.194.173c-.077 1.538.565 3.752 3.658 3.994 3.027.238 3.982-1.254 4.074-2.416.107-1.36-.69-2.173-3.688-2.783-3.562-.722-5.46-2.128-5.253-4.76.19-2.413 2.403-4.181 5.978-3.9 3.794.298 5.271 2.841 5.141 5.347l-2.128-.167c.107-1.36-.686-3.055-3.209-3.254-2.588-.203-3.433 1.01-3.513 2.02-.074.943.269 1.918 3.373 2.582m22.744-.405-7.666-1.99-1.216 4.685 6.303 1.636-.486 1.874-6.303-1.636-1.216 4.684 7.666 1.99-.487 1.874-9.88-2.564 3.891-14.992 9.88 2.565z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="136" height="136" viewBox="0 0 136 136" class="absolute w-[70%] h-[70%]">
          <path fill="#bad6ff" d="M88.714 16.53c21.063-10.817 42.127 9.817 30.517 30.488 22.368 4.391 22.349 37.902 0 41.619 11.425 20.929-9.454 42.266-30.517 30.497-4.089 22.603-37.464 22.372-41.646 0-21.063 11.833-41.201-9.3-30.517-30.497-22.35-4.308-21.785-36.72 0-41.62C6.005 25.784 25.727 5.982 47.068 16.53c4.93-21.91 36.965-22.168 41.646 0"/>
          <path fill="#0b1311" d="M81.156 77.158V54.174H57.143v2.234h20.02L50.787 81.655l1.658 1.586L78.82 57.996v19.161z"/>
        </svg>
      </div>
    </div>

    <!-- Inner Dot -->
    <div 
      ref="cursorDot" 
      class="absolute top-0 left-0 w-2 h-2 bg-accent rounded-full mix-blend-difference pointer-events-none will-change-transform"
      :class="{ 'opacity-0 scale-0': isHovering }"
      style="transition: opacity 0.3s, transform 0.3s;"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'
import { useSound } from '~/composables/useSound'

const { isReducedMotion } = useReducedMotion()
const { playTick, playClick, initAudio } = useSound()
const cursorDot = ref<HTMLElement | null>(null)
const cursorRing = ref<HTMLElement | null>(null)
const cursorRingVisual = ref<HTMLElement | null>(null)
const isTouchDevice = ref(false)
const isHovering = ref(false)
const hoverText = ref('View')
const cursorType = ref('default')

let mouseX = 0
let mouseY = 0
let ringX = 0
let ringY = 0
let dotX = 0
let dotY = 0

// Variables for velocity calculating
let lastMouseX = 0
let lastMouseY = 0
let velX = 0
let velY = 0

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

const onClick = (e: MouseEvent) => {
  // Ensure audio context is initialized on first user interaction
  initAudio()
  
  const target = e.target as HTMLElement
  const clickable = target.closest('a, button, [data-hover-text], [data-cursor-type]')
  if (clickable) {
    playClick()
  }
}

const updateCursor = () => {
  if (isReducedMotion.value) return
  
  // Fast lerp for dot (almost instant)
  dotX += (mouseX - dotX) * 0.8
  dotY += (mouseY - dotY) * 0.8
  
  // Slower lerp for ring (magnetic drag)
  ringX += (mouseX - ringX) * 0.15
  ringY += (mouseY - ringY) * 0.15
  
  // Calculate velocity for ring stretch
  velX = ringX - lastMouseX
  velY = ringY - lastMouseY
  lastMouseX = ringX
  lastMouseY = ringY
  
  const velocity = Math.sqrt(velX * velX + velY * velY)
  const angle = Math.atan2(velY, velX) * (180 / Math.PI)
  
  let targetScaleX = 1
  let targetScaleY = 1
  
  if (isHovering.value) {
    if (cursorType.value === 'project') {
      // Don't stretch the project badge
      targetScaleX = 1
      targetScaleY = 1
    } else {
      targetScaleX = 1.8
      targetScaleY = 1.8
    }
  } else {
    const stretch = Math.min(velocity * 0.03, 0.4)
    targetScaleX = 1 + stretch
    targetScaleY = 1 - (stretch * 0.5)
  }

  if (cursorDot.value) {
    gsap.set(cursorDot.value, { 
      x: dotX, 
      y: dotY 
    })
  }

  if (cursorRing.value && cursorRingVisual.value) {
    // Move the container (without scaling)
    gsap.set(cursorRing.value, { 
      x: ringX, 
      y: ringY
    })
    
    // Scale and rotate the visual circle ONLY (if not project cursor)
    if (cursorRingVisual.value && cursorType.value !== 'project') {
      gsap.set(cursorRingVisual.value, {
        scaleX: targetScaleX,
        scaleY: targetScaleY,
        rotation: velocity > 0.5 && !isHovering.value ? angle : undefined
      })
    }
  }
  
  requestAnimationFrame(updateCursor)
}

const onMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const clickable = target.closest('a, button, [data-hover-text], [data-cursor-type]')
  
  if (clickable) {
    if (!isHovering.value) {
      playTick() // Play tick sound when entering hover state
    }
    isHovering.value = true
    const text = clickable.getAttribute('data-hover-text')
    hoverText.value = text || 'Explore'
    
    // Check for custom cursor type
    const cType = clickable.getAttribute('data-cursor-type')
    if (cType) {
      cursorType.value = cType
    } else {
      cursorType.value = 'default'
    }
  }
}

const onMouseOut = () => {
  isHovering.value = false
  cursorType.value = 'default'
}

onMounted(() => {
  isTouchDevice.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
  
  if (!isTouchDevice.value && !isReducedMotion.value) {
    // Initial center position
    mouseX = window.innerWidth / 2
    mouseY = window.innerHeight / 2
    dotX = mouseX
    dotY = mouseY
    ringX = mouseX
    ringY = mouseY
    lastMouseX = mouseX
    lastMouseY = mouseY
    
    // Explicitly set xPercent/yPercent via GSAP so it doesn't conflict with Tailwind transforms
    if (cursorDot.value && cursorRing.value) {
      gsap.set([cursorDot.value, cursorRing.value], { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY })
    }
    
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('click', onClick)
    
    // Hide default cursor
    document.body.classList.add('hide-default-cursor')
    
    requestAnimationFrame(updateCursor)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
  document.removeEventListener('click', onClick)
  
  document.body.classList.remove('hide-default-cursor')
})
</script>

<style scoped>
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}
</style>
