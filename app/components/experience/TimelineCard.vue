<template>
  <div class="w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 h-full p-8 md:p-12 border-l border-white/10 flex flex-col justify-center relative group" ref="cardRef">
    <!-- Connecting Timeline Line -->
    <div class="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10 group-hover:bg-accent/30 transition-colors duration-500"></div>
    <div class="absolute top-1/2 left-0 w-4 h-4 rounded-full bg-bg-elevated border-2 border-accent -translate-y-1/2 -translate-x-[9px] shadow-[0_0_15px_rgba(0,220,130,0.5)] z-10 group-hover:bg-accent transition-colors duration-300"></div>
    
    <div class="bg-bg-elevated p-8 md:p-10 rounded-2xl border border-white/5 group-hover:border-accent/30 transition-colors duration-500 z-20">
      <div class="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h3 class="text-2xl md:text-3xl font-display font-bold text-text-primary">{{ role }}</h3>
          <h4 class="text-lg md:text-xl text-accent font-medium mt-2">{{ company }}</h4>
        </div>
        <span class="px-3 py-1 rounded-full bg-bg-primary border border-white/5 text-text-secondary text-[10px] md:text-xs font-mono tracking-widest whitespace-nowrap">
          {{ date }}
        </span>
      </div>
      
      <ul class="space-y-4 text-text-secondary md:text-lg font-light leading-relaxed">
        <li v-for="(achievement, i) in achievements" :key="i" class="flex items-start gap-3">
          <span class="text-accent mt-1">▹</span>
          <span>{{ achievement }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  role: { type: String, required: true },
  company: { type: String, required: true },
  date: { type: String, required: true },
  achievements: { type: Array as () => string[], required: true }
})

const cardRef = ref<HTMLElement | null>(null)
</script>
