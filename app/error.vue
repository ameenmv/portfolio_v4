<template>
  <div class="min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center relative overflow-hidden">
    <!-- Grid Background -->
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none" 
         style="background-image: radial-gradient(var(--text-secondary) 1px, transparent 1px); background-size: 40px 40px;">
    </div>
    
    <div class="relative z-10 text-center flex flex-col items-center px-6">
      <div class="relative">
        <h1 class="text-[20vw] md:text-[15vw] font-display font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-primary to-text-secondary mix-blend-difference mb-4">
          {{ error?.statusCode || 404 }}
        </h1>
        
        <!-- Glitch layers -->
        <h1 class="absolute inset-0 text-[20vw] md:text-[15vw] font-display font-black leading-none tracking-tighter text-accent mix-blend-screen opacity-50 animate-pulse" style="transform: translate(-5px, 5px);">
          {{ error?.statusCode || 404 }}
        </h1>
        <h1 class="absolute inset-0 text-[20vw] md:text-[15vw] font-display font-black leading-none tracking-tighter text-[#ff00ff] mix-blend-screen opacity-50 animate-pulse" style="transform: translate(5px, -5px); animation-delay: 100ms;">
          {{ error?.statusCode || 404 }}
        </h1>
      </div>
      
      <p class="text-xl md:text-2xl font-mono text-text-secondary uppercase tracking-widest mb-12">
        {{ error?.message || "This page drifted away." }}
      </p>
      
      <button 
        ref="btnRef"
        @click="handleError" 
        class="btn-special relative overflow-hidden bg-text-primary text-bg-primary px-8 py-4 font-mono font-bold tracking-widest uppercase transition-all duration-300 hover:bg-accent group"
      >
        <span class="relative z-10 flex items-center gap-3">
          <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Home
        </span>
        <div class="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { clearError } from '#imports'
import { useMagnetic } from '~/composables/useMagnetic'

defineProps({
  error: Object
})

const btnRef = ref<HTMLElement | null>(null)
useMagnetic(btnRef, 0.4)

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.btn-special {
  box-shadow: 6px 6px 0px 0px var(--accent);
}
.btn-special:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0px 0px var(--text-primary);
}
.btn-special:active {
  transform: translate(4px, 4px);
  box-shadow: 2px 2px 0px 0px var(--text-primary);
}
</style>
