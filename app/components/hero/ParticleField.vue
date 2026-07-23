<template>
  <TresPoints ref="particlesRef">
    <TresBufferGeometry :position="[positions, 3]" />
    <TresPointsMaterial 
      color="#f5f0e8" 
      :size="0.05" 
      :sizeAttenuation="true" 
      :transparent="true" 
      :opacity="0.4" 
    />
  </TresPoints>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import { Points } from 'three'

const count = 400
const positions = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
  // spread particles in a larger area
  positions[i] = (Math.random() - 0.5) * 25
}

const particlesRef = ref<Points>()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (particlesRef.value) {
    particlesRef.value.rotation.y -= delta * 0.05
    particlesRef.value.rotation.x -= delta * 0.02
  }
})
</script>
