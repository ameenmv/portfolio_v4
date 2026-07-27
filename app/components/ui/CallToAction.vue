<template>
  <div class="c-cta container mx-auto px-6 md:px-12 mb-32 relative z-20">
    <div class="bg-bg-secondary rounded-[40px] md:rounded-[80px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
      
      <!-- Decorative background -->
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0">
        <div class="absolute -right-[20%] -top-[50%] w-[80%] h-[150%] bg-accent-cool/20 rounded-full blur-[100px]"></div>
      </div>

      <!-- Image side -->
      <div class="w-full md:w-1/3 aspect-[3/4] rounded-[20px] md:rounded-[40px] overflow-hidden bg-bg-elevated relative z-10">
        <NuxtImg v-if="image" :src="image" alt="Call to action" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>

      <!-- Content side -->
      <div class="w-full md:w-2/3 md:pl-12 relative z-10">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-text-primary mb-6 tracking-tighter">
          {{ title }}
        </h2>
        <p v-if="description" class="text-xl md:text-2xl text-text-secondary font-light leading-relaxed mb-8 max-w-2xl">
          {{ description }}
        </p>
        <NuxtLink :to="linkTo" class="inline-flex items-center justify-center h-14 px-8 rounded-full bg-accent text-text-light font-medium text-lg hover:bg-bg-primary hover:text-text-primary hover:border hover:border-accent transition-colors duration-300">
          {{ buttonText }}
        </NuxtLink>
      </div>

      <!-- Full block clickable overlay -->
      <NuxtLink :to="linkTo" class="absolute inset-0 z-20" :aria-label="buttonText"></NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: 'Schedule a chat'
  },
  linkTo: {
    type: String,
    default: '/contact'
  },
  image: {
    type: String,
    default: '/images/projects/smart-learn.png'
  }
})
</script>
