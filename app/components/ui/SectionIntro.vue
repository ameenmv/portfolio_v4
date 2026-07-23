<template>
  <div class="flex flex-col gap-4 max-w-4xl" :class="cn(centered ? 'items-center text-center mx-auto' : 'items-start', className)">
    <div class="overflow-hidden">
      <span class="inline-block text-xs md:text-sm font-mono tracking-widest text-accent uppercase font-semibold">
        {{ pretitle }}
      </span>
    </div>
    
    <TextReveal as="h2" class="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter text-text-primary">
      {{ title }}
    </TextReveal>
    
    <TextReveal v-if="description" as="p" class="text-lg md:text-xl text-text-secondary mt-2 max-w-2xl font-light">
      {{ description }}
    </TextReveal>
  </div>
</template>

<script setup lang="ts">
import TextReveal from './TextReveal.vue'
import { cn } from '~/utils/cn'

defineProps({
  pretitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  centered: { type: Boolean, default: false },
  className: { type: String, default: '' }
})
</script>
