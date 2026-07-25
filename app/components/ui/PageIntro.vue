<template>
  <section :class="['text-center py-16 md:py-24', bgClass]">
    <div class="container mx-auto px-6 md:px-12">
      <h4 v-if="pretitle" class="text-lg md:text-xl font-mono tracking-widest text-text-secondary mb-6 uppercase">
        {{ pretitle }}
      </h4>
      
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-text-primary tracking-tighter mb-8" v-html="title"></h1>
      
      <div v-if="description" class="text-xl md:text-2xl text-text-secondary font-light max-w-3xl mx-auto leading-relaxed">
        <slot>
          <p>{{ description }}</p>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  pretitle: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  bgClass: {
    type: String,
    default: 'mt-20 md:mt-32 mb-16 md:mb-24'
  }
})
</script>
