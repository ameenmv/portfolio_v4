<template>
  <div class="absolute z-0 pointer-events-none w-32 h-32 md:w-48 md:h-48" :style="{ top, left, right, bottom }">
    <ClientOnly>
      <TresCanvas alpha clear-color="transparent" window-size="false">
        <TresPerspectiveCamera :position="[0, 0, 5]" :fov="45" />
        <TresMesh ref="meshRef">
          <component :is="geometry" :args="geometryArgs" />
          <TresMeshBasicMaterial 
            :color="color" 
            :wireframe="true" 
            :transparent="true" 
            :opacity="0.15" 
          />
        </TresMesh>
      </TresCanvas>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  type: { type: String, default: 'torus' },
  color: { type: String, default: '#00DC82' },
  top: { type: String, default: 'auto' },
  left: { type: String, default: 'auto' },
  right: { type: String, default: 'auto' },
  bottom: { type: String, default: 'auto' },
  speed: { type: Number, default: 0.5 }
})

const meshRef = ref<any>()
const { isReducedMotion } = useReducedMotion()

const geometry = computed(() => {
  switch (props.type) {
    case 'torus': return 'TresTorusKnotGeometry'
    case 'octahedron': return 'TresOctahedronGeometry'
    case 'cone': return 'TresConeGeometry'
    default: return 'TresTorusKnotGeometry'
  }
})

const geometryArgs = computed(() => {
  switch (props.type) {
    case 'torus': return [1, 0.4, 64, 8]
    case 'octahedron': return [1.5, 0]
    case 'cone': return [1.2, 2.5, 4]
    default: return [1, 0.4, 64, 8]
  }
})

let mouseX = 0
let mouseY = 0
let frameId: number | null = null

const onMouseMove = (e: MouseEvent) => {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1
}

const animate = () => {
  frameId = requestAnimationFrame(animate)
  
  // meshRef.value from Tres might be a proxy, its underlying 3D object is usually available
  // or we can access rotation directly if it exposes it
  const mesh = meshRef.value?.instance || meshRef.value
  
  if (mesh && !isReducedMotion.value) {
    const delta = 0.016 // Approx 60fps
    const elapsed = performance.now() / 1000
    
    // Base rotation
    mesh.rotation.x += delta * 0.2 * props.speed
    mesh.rotation.y += delta * 0.3 * props.speed
    
    // Mouse proximity influence
    mesh.rotation.x += mouseY * 0.02 * props.speed
    mesh.rotation.y += mouseX * 0.02 * props.speed
    
    // Floating
    mesh.position.y = Math.sin(elapsed * props.speed) * 0.5
  }
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  if (frameId) cancelAnimationFrame(frameId)
})
</script>
