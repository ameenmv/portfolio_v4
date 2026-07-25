<template>
  <div class="fixed inset-0 z-[100] pointer-events-none" :class="{ 'opacity-0': !isActive }">
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { useReducedMotion } from '~/composables/useReducedMotion'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isActive = ref(false)
const { isReducedMotion } = useReducedMotion()

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.OrthographicCamera
let material: THREE.ShaderMaterial
let frameId: number | null = null

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform float uTime;
  varying vec2 vUv;

  // 2D Noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Aspect ratio correction
    vec2 uv = vUv;
    uv.x *= uResolution.x / uResolution.y;

    // Noise displacement
    float noise = snoise(uv * 3.0 + uTime * 0.5);
    
    // Diagonal sweep mask
    float sweep = vUv.x + vUv.y;
    float mask = smoothstep(uProgress * 2.5 - 0.5, uProgress * 2.5 + 0.5, sweep + noise * 0.3);
    
    // Primary color (bg-primary)
    vec3 color = vec3(0.039, 0.039, 0.039); // #0a0a0a
    
    // Accent edge
    float edge = smoothstep(uProgress * 2.5 - 0.4, uProgress * 2.5 - 0.3, sweep + noise * 0.3) - mask;
    color = mix(color, vec3(0.0, 0.863, 0.51), edge); // #00DC82

    gl_FragColor = vec4(color, 1.0 - mask);
  }
`

const init = () => {
  if (!canvasRef.value) return

  renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    alpha: true,
    antialias: false
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
  scene = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
  camera.position.z = 1

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uProgress: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0 }
    },
    transparent: true
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  resize()
  window.addEventListener('resize', resize)
}

const resize = () => {
  if (renderer && material) {
    renderer.setSize(window.innerWidth, window.innerHeight)
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
  }
}

const render = (time: number) => {
  if (!isActive.value) return
  
  if (material) {
    material.uniforms.uTime.value = time * 0.001
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
  
  frameId = requestAnimationFrame(render)
}

onMounted(() => {
  if (isReducedMotion.value) return
  init()
})

onUnmounted(() => {
  if (frameId) cancelAnimationFrame(frameId)
  window.removeEventListener('resize', resize)
  renderer?.dispose()
  material?.dispose()
})

// Expose animation methods
const animateIn = () => {
  return new Promise((resolve) => {
    if (isReducedMotion.value) {
      resolve(true)
      return
    }
    
    isActive.value = true
    frameId = requestAnimationFrame(render)
    
    gsap.fromTo(material.uniforms.uProgress,
      { value: 0 },
      { 
        value: 1, 
        duration: 1.2, 
        ease: 'power3.inOut',
        onComplete: resolve
      }
    )
  })
}

const animateOut = () => {
  return new Promise((resolve) => {
    if (isReducedMotion.value) {
      resolve(true)
      return
    }
    
    gsap.fromTo(material.uniforms.uProgress,
      { value: 1 },
      { 
        value: 2, // Push mask off screen 
        duration: 1.2, 
        ease: 'power3.inOut',
        onComplete: () => {
          isActive.value = false
          if (frameId) cancelAnimationFrame(frameId)
          resolve(true)
        }
      }
    )
  })
}

defineExpose({
  animateIn,
  animateOut
})
</script>
