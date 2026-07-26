<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12 flex items-center justify-between pointer-events-none"
  >
    <!-- Logo (Left) -->
    <div class="pointer-events-auto flex items-center gap-4">
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <img src="/mv.png" alt="Ameen Mohamed Logo" class="h-14 w-auto group-hover:scale-105 transition-transform duration-300" />
        <!-- <span class="font-display font-bold text-xl text-[#1E4137] tracking-tight hidden sm:inline-block">
          ameenmv
        </span> -->
      </NuxtLink>
    </div>

    <!-- Floating Center Nav Pill (Desktop) -->
    <nav class="hidden lg:flex items-center pointer-events-auto bg-white/80 backdrop-blur-md rounded-full px-8 py-3.5 border border-black/5 shadow-sm">
      <ul class="flex items-center gap-8 text-base font-medium text-[#0B1311]">
        <li v-for="link in links" :key="link.name">
          <NuxtLink 
            :to="link.path" 
            class="hover:text-[#1E4137] transition-colors duration-200" 
            active-class="text-[#1E4137] font-semibold"
          >
            {{ link.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- Right CTA Button Group (Desktop - Studio Modular Morphing Arrow Hover) -->
    <div class="hidden lg:flex items-center pointer-events-auto">
      <NuxtLink 
        to="/contact" 
        class="group flex items-center cursor-pointer"
      >
        <!-- Left Circle (Expands on hover) -->
        <div class="w-0 opacity-0 scale-0 group-hover:w-12 group-hover:opacity-100 group-hover:scale-100 group-hover:mr-2.5 h-12 rounded-full bg-[#C2D5F1] text-[#1E4137] flex items-center justify-center transition-all duration-500 ease-out overflow-hidden flex-shrink-0">
          <ArrowUpRight class="w-5 h-5 flex-shrink-0" />
        </div>

        <!-- Main Button Label -->
        <div class="h-12 px-7 rounded-full bg-[#1E4137] text-[#FFF7F0] font-medium text-base flex items-center justify-center transition-all duration-500 ease-out whitespace-nowrap">
          Start your project
        </div>

        <!-- Right Circle (Collapses on hover) -->
        <div class="w-12 opacity-100 scale-100 ml-2.5 group-hover:w-0 group-hover:opacity-0 group-hover:scale-0 group-hover:ml-0 h-12 rounded-full bg-[#C2D5F1] text-[#1E4137] flex items-center justify-center transition-all duration-500 ease-out overflow-hidden flex-shrink-0">
          <ArrowUpRight class="w-5 h-5 flex-shrink-0" />
        </div>
      </NuxtLink>
    </div>

    <!-- Mobile Menu Trigger -->
    <div class="lg:hidden pointer-events-auto flex items-center gap-3">
      <button 
        class="h-10 px-5 rounded-full bg-[#1E4137] text-[#FFF7F0] text-sm font-medium flex items-center gap-2"
        @click="isMenuOpen = !isMenuOpen"
        aria-label="Toggle Menu"
      >
        <span>{{ isMenuOpen ? 'Sluiten' : 'Menu' }}</span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <Teleport to="body">
      <div 
        class="fixed inset-0 bg-[#1E4137] text-[#FFF7F0] z-[99] flex flex-col justify-between p-8 transition-all duration-500 lg:hidden"
        :class="isMenuOpen ? 'opacity-100 pointer-events-auto clip-reveal-active' : 'opacity-0 pointer-events-none'"
      >
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="flex items-center gap-3" @click="isMenuOpen = false">
            <img src="/mv.png" alt="Ameen Mohamed Logo" class="h-8 w-auto" />
            <span class="font-display font-bold text-2xl">ameenmv</span>
          </NuxtLink>
          <button @click="isMenuOpen = false" class="text-lg font-medium px-4 py-2 rounded-full bg-white/10">Close</button>
        </div>

        <nav class="flex flex-col gap-6 text-4xl font-display font-medium text-center my-auto">
          <NuxtLink 
            v-for="link in links" 
            :key="link.name" 
            :to="link.path"
            class="hover:text-[#C2D5F1] transition-colors"
            @click="isMenuOpen = false"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <NuxtLink 
          to="/contact" 
          class="w-full py-4 rounded-full bg-[#C2D5F1] text-[#1E4137] font-display font-medium text-lg text-center"
          @click="isMenuOpen = false"
        >
          Start your project →
        </NuxtLink>
      </div>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'

const links = [
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const isMenuOpen = ref(false)
</script>
