<template>
  <div class="w-full h-full relative cursor-grab active:cursor-grabbing bg-black">
    <!-- WebGL Canvas -->
    <canvas ref="canvasRef" class="w-full h-full absolute inset-0 z-0 touch-none outline-none"></canvas>
    
    <!-- Drag indicator -->
    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none opacity-40 z-10 transition-opacity duration-500">
      <div class="flex items-center gap-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="animate-pulse">
          <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="text-[10px] font-mono tracking-[0.3em] text-white uppercase">Drag & Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="animate-pulse">
          <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { WebGLVisualiser } from './WebGLVisualiser'

const props = defineProps<{ projects: any[] }>()
const router = useRouter()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let visualiser: WebGLVisualiser | null = null

onMounted(() => {
  if (canvasRef.value && props.projects.length > 0) {
    visualiser = new WebGLVisualiser(canvasRef.value, props.projects, (slug) => {
      // Navigate to project when clicked
      router.push(`/projects/${slug}`)
    })
  }
})

onBeforeUnmount(() => {
  if (visualiser) {
    visualiser.destroy()
  }
})
</script>
