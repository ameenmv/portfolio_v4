<template>
  <section class="relative w-full min-h-screen bg-bg-secondary py-32 px-6">
    <div class="container mx-auto max-w-5xl">
      <!-- Section Title -->
      <div class="mb-24 flex flex-col items-center">
        <h2 class="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter text-text-primary text-center">
          Building Systems
        </h2>
        <p class="text-xl md:text-2xl text-text-secondary mt-6 font-medium text-center max-w-2xl">
          More than interfaces. I build tools and autonomous servers that solve real engineering problems.
        </p>
      </div>

      <!-- Stacking Cards for Tools -->
      <div class="relative w-full pb-32">
        <StackingCard 
          v-for="(tool, index) in tools" 
          :key="tool.title"
          :title="tool.title"
          :description="tool.description"
          :technologies="tool.technologies"
          :color-class="tool.colorClass"
          :icon="tool.icon"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import StackingCard from '~/components/skills/StackingCard.vue'
// Icons
import { Cpu, Terminal } from 'lucide-vue-next'

const tools = [
  {
    title: 'Athar (أثر)',
    description: 'An autonomous Local-First MCP server that transforms AI-generated solutions into lasting engineering knowledge. It captures code diffs and applies SM-2 Spaced Repetition.',
    technologies: ['Nuxt 4', 'SQLite', 'Node.js', 'Local-First'],
    colorClass: 'bg-gradient-to-br from-accent to-accent-cool',
    icon: shallowRef(Cpu)
  },
  {
    title: 'Sa5er CLI (ساخر)',
    description: 'A 3-Tier Error Handling CLI tool that mocks developers when terminal commands fail. It catches errors and explains them using the persona of a sarcastic Egyptian Senior Developer.',
    technologies: ['CLI', 'Gemini API', 'RTL Logic', 'Caching'],
    colorClass: 'bg-gradient-to-br from-gray-900 to-black border border-white/10',
    icon: shallowRef(Terminal)
  }
]
</script>
