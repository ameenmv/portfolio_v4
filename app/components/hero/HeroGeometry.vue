<template>
  <TresMesh ref="meshRef" :position="[0, 0, 0]">
    <TresIcosahedronGeometry :args="[2.5, 2]" />
    <TresMeshStandardMaterial 
      color="#00DC82" 
      wireframe 
      :transparent="true" 
      :opacity="0.25" 
    />
  </TresMesh>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLoop } from '@tresjs/core'
import { Mesh } from 'three'

const meshRef = ref<Mesh>()

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const onMouseMove = (e: MouseEvent) => {
  // Normalize mouse coordinates to -1 to +1
  mouseX = (e.clientX / window.innerWidth) * 2 - 1
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (meshRef.value) {
    // Smooth lerp for mouse rotation
    targetX = mouseX * 0.5
    targetY = mouseY * 0.5
    
    // Auto rotation + mouse interaction
    meshRef.value.rotation.y += delta * 0.15 + (targetX - meshRef.value.rotation.y) * 0.05
    meshRef.value.rotation.x += delta * 0.1 + (-targetY - meshRef.value.rotation.x) * 0.05
    
    // Slight bobbing
    meshRef.value.position.y = Math.sin(elapsed * 0.5) * 0.3
  }
})
</script>
