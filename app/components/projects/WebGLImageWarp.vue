<template>
  <div ref="containerRef" class="w-full h-full absolute inset-0 overflow-hidden bg-bg-elevated">
    <!-- Fallback if WebGL fails or reduced motion -->
    <img 
      v-if="fallback" 
      :src="src" 
      :alt="alt" 
      class="w-full h-full object-cover transition-transform duration-700"
      :class="{ 'scale-105': isHovered }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { useReducedMotion } from '~/composables/useReducedMotion'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  isHovered: { type: Boolean, default: false }
})

const { isReducedMotion } = useReducedMotion()
const containerRef = ref<HTMLElement | null>(null)
const fallback = ref(false)

let scene: THREE.Scene, camera: THREE.OrthographicCamera, renderer: THREE.WebGLRenderer
let material: THREE.ShaderMaterial, plane: THREE.Mesh
let animationFrameId: number

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Liquid ripple effect: distortion increases based on hover
    float distortion = sin(uv.y * 15.0 + uTime * 2.0) * 0.03 * uHover;
    uv.x += distortion;
    
    // RGB Split/Chromatic Aberration based on hover intensity
    float offset = 0.02 * uHover;
    
    float r = texture2D(tDiffuse, uv + vec2(offset, 0.0)).r;
    float g = texture2D(tDiffuse, uv).g;
    float b = texture2D(tDiffuse, uv - vec2(offset, 0.0)).b;
    
    // Zoom effect on hover
    vec2 zoomedUv = (uv - 0.5) * (1.0 - (0.05 * uHover)) + 0.5;
    vec4 texColor = texture2D(tDiffuse, zoomedUv);
    
    // Mix the RGB split with the base texture
    vec3 finalColor = mix(texColor.rgb, vec3(r, g, b), uHover * 0.8);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

onMounted(() => {
  if (isReducedMotion.value || !containerRef.value) {
    fallback.value = true
    return
  }

  initWebGL()
})

const initWebGL = () => {
  const width = containerRef.value!.clientWidth
  const height = containerRef.value!.clientHeight

  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000)
  camera.position.z = 1

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.value!.appendChild(renderer.domElement)
  } catch (e) {
    console.error("WebGL not supported, using fallback")
    fallback.value = true
    return
  }

  // Load Texture
  const textureLoader = new THREE.TextureLoader()
  textureLoader.load(
    props.src, 
    (texture) => {
      // Setup Shader
      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          tDiffuse: { value: texture },
          uHover: { value: 0 },
          uTime: { value: 0 }
        }
      })

      const geometry = new THREE.PlaneGeometry(width, height)
      plane = new THREE.Mesh(geometry, material)
      scene.add(plane)

      // Initial scale to cover (like object-fit: cover)
      const imageAspect = texture.image.width / texture.image.height
      const containerAspect = width / height
      
      if (containerAspect > imageAspect) {
        plane.scale.set(1, containerAspect / imageAspect, 1)
      } else {
        plane.scale.set(imageAspect / containerAspect, 1, 1)
      }

      render()
    },
    undefined,
    (err) => {
      console.error("Error loading texture for WebGL:", err)
      fallback.value = true
    }
  )

  const handleResize = () => {
    if (!containerRef.value || !renderer || !camera) return
    const newW = containerRef.value.clientWidth
    const newH = containerRef.value.clientHeight
    
    renderer.setSize(newW, newH)
    camera.left = newW / -2
    camera.right = newW / 2
    camera.top = newH / 2
    camera.bottom = newH / -2
    camera.updateProjectionMatrix()
    
    if (plane) {
      plane.geometry.dispose()
      plane.geometry = new THREE.PlaneGeometry(newW, newH)
      
      // Update aspect ratio covering
      if (material && material.uniforms.tDiffuse.value) {
        const tex = material.uniforms.tDiffuse.value
        const imgAspect = tex.image.width / tex.image.height
        const contAspect = newW / newH
        if (contAspect > imgAspect) {
          plane.scale.set(1, contAspect / imgAspect, 1)
        } else {
          plane.scale.set(imgAspect / contAspect, 1, 1)
        }
      }
    }
  }
  
  window.addEventListener('resize', handleResize)
}

watch(() => props.isHovered, (hovered) => {
  if (material) {
    gsap.to(material.uniforms.uHover, { 
      value: hovered ? 1 : 0, 
      duration: 1.2, 
      ease: "power3.out" 
    })
  }
})

const render = () => {
  if (!isReducedMotion.value) {
    animationFrameId = requestAnimationFrame(render)
    if (material) {
      material.uniforms.uTime.value += 0.015
    }
    renderer.render(scene, camera)
  }
}

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (renderer) renderer.dispose()
  if (material) material.dispose()
  if (plane && plane.geometry) plane.geometry.dispose()
})
</script>
