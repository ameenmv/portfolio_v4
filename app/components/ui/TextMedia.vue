<template>
  <div class="c-text-media mb-16 md:mb-32">
    <div class="container mx-auto px-6 md:px-12">
      <div 
        class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
        :class="layout === 'right' ? 'md:flex-row-reverse' : ''"
      >
        
        <!-- Media Block -->
        <div 
          class="md:col-span-5 lg:col-span-5 rounded-[20px] md:rounded-[40px] overflow-hidden aspect-[3/4]"
          :class="layout === 'right' ? 'md:order-2' : 'md:order-1'"
        >
          <NuxtImg v-if="image" :src="image" :alt="title || 'Media'" class="w-full h-full object-cover" />
        </div>
        
        <!-- Content Block -->
        <div 
          class="md:col-span-7 lg:col-span-7 flex flex-col justify-center"
          :class="layout === 'right' ? 'md:order-1' : 'md:order-2'"
        >
          <div v-if="pretitle" class="mb-4">
            <span class="text-lg md:text-xl font-mono tracking-widest text-text-secondary uppercase">{{ pretitle }}</span>
          </div>
          
          <div v-if="title" class="mb-6">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-text-primary tracking-tight">
              {{ title }}
            </h2>
          </div>
          
          <div class="text-lg md:text-xl text-text-secondary font-light leading-relaxed space-y-6 mb-8">
            <slot />
          </div>

          <div v-if="ctaText" class="mt-4">
            <NuxtLink :to="ctaLink" class="inline-flex items-center justify-center h-12 px-6 rounded-full bg-bg-dark text-text-light font-medium text-sm md:text-base hover:bg-accent-warm hover:text-bg-dark transition-colors duration-300">
              {{ ctaText }}
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  image: {
    type: String,
    required: false
  },
  layout: {
    type: String as () => 'left' | 'right',
    default: 'left' // left means image is on the left
  },
  pretitle: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  ctaText: {
    type: String,
    default: ''
  },
  ctaLink: {
    type: String,
    default: '/contact'
  }
})
</script>
