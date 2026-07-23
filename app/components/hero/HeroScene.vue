<template>
  <TresCanvas window-size alpha antialias clear-color="#0a0a0a">
    <TresPerspectiveCamera :position="[0, 0, 8]" :fov="45" :near="0.1" :far="100" />
    <OrbitControls 
      :enable-zoom="false" 
      :enable-pan="false" 
      :auto-rotate="true" 
      :auto-rotate-speed="0.5"
      :enable-damping="true"
    />
    <HeroGeometry />
    <ParticleField />
    
    <TresAmbientLight :intensity="0.4" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" color="#00DC82" />
    <TresDirectionalLight :position="[-5, -5, -5]" :intensity="1" color="#e8a87c" />
    
    <TresFog color="#0a0a0a" :near="5" :far="20" />
  </TresCanvas>
</template>

<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import HeroGeometry from './HeroGeometry.vue'
import ParticleField from './ParticleField.vue'
</script>
