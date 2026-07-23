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
import { ref } from 'vue'
import { useLoop } from '@tresjs/core'
import { Mesh } from 'three'

const meshRef = ref<Mesh>()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta, elapsed }) => {
  if (meshRef.value) {
    meshRef.value.rotation.y += delta * 0.15
    meshRef.value.rotation.x += delta * 0.1
    // slight bobbing
    meshRef.value.position.y = Math.sin(elapsed * 0.5) * 0.3
  }
})
</script>
