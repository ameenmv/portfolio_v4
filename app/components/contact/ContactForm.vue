<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-8">
    <div class="relative group">
      <input 
        type="text" 
        id="name" 
        v-model="form.name" 
        @input="playType"
        required
        class="w-full bg-transparent border-b border-white/20 py-4 px-2 text-text-primary text-lg focus:outline-none focus:border-accent transition-colors peer"
        placeholder=" "
      />
      <label 
        for="name" 
        class="absolute left-2 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-focus:font-mono tracking-widest peer-valid:-top-3 peer-valid:text-xs peer-valid:font-mono peer-valid:tracking-widest"
      >
        Your Name
      </label>
    </div>

    <div class="relative group">
      <input 
        type="email" 
        id="email" 
        v-model="form.email" 
        @input="playType"
        required
        class="w-full bg-transparent border-b border-white/20 py-4 px-2 text-text-primary text-lg focus:outline-none focus:border-accent transition-colors peer"
        placeholder=" "
      />
      <label 
        for="email" 
        class="absolute left-2 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-focus:font-mono tracking-widest peer-valid:-top-3 peer-valid:text-xs peer-valid:font-mono peer-valid:tracking-widest"
      >
        Email Address
      </label>
    </div>

    <div class="relative group">
      <textarea 
        id="message" 
        v-model="form.message" 
        @input="playType"
        required
        rows="4"
        class="w-full bg-transparent border-b border-white/20 py-4 px-2 text-text-primary text-lg focus:outline-none focus:border-accent transition-colors peer resize-none"
        placeholder=" "
      ></textarea>
      <label 
        for="message" 
        class="absolute left-2 top-4 text-text-secondary text-lg transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent peer-focus:font-mono tracking-widest peer-valid:-top-3 peer-valid:text-xs peer-valid:font-mono peer-valid:tracking-widest"
      >
        Your Message
      </label>
    </div>

    <button 
      ref="btnRef"
      type="submit" 
      class="mt-4 w-full md:w-auto self-start px-12 py-4 rounded-full bg-text-primary text-bg-primary font-display font-bold tracking-widest uppercase hover:bg-accent hover:text-bg-primary transition-all duration-300 overflow-hidden relative group btn-special will-change-transform"
      :disabled="isSubmitting"
      data-hover-text="Send"
    >
      <span class="relative z-10">{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
      <div class="absolute inset-0 bg-accent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
    </button>
    
    <p v-if="success" class="text-accent text-sm mt-4 font-mono tracking-widest uppercase">
      Message sent successfully. I'll get back to you soon!
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSound } from '~/composables/useSound'
import { useMagnetic } from '~/composables/useMagnetic'

const { playType, playSuccess } = useSound()
const btnRef = ref<HTMLElement | null>(null)

useMagnetic(btnRef, 0.4)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const success = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate network request since user requested front-end only for now
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  playSuccess()
  
  success.value = true
  isSubmitting.value = false
  
  // Reset form
  form.name = ''
  form.email = ''
  form.message = ''
  
  setTimeout(() => {
    success.value = false
  }, 5000)
}
</script>
