<template>
  <div class="page-contact min-h-screen bg-bg-primary pt-[var(--header-height)]">
    
    <PageIntro 
      pretitle="Contact"
      title="Let's work together."
      description="Whether you have a project in mind, need technical mentorship, or just want to say hi, my inbox is always open."
      bgClass="bg-[#1E4137] text-white pt-32 pb-24 -mt-[var(--header-height)]"
    />

    <section class="py-16 md:py-32 px-6 md:px-12 relative overflow-hidden z-20">
      <!-- Decorative background -->
      <div class="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div class="container mx-auto relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <!-- Left: Text -->
          <div class="flex flex-col justify-center">
            
            <div class="space-y-12">
              <a href="mailto:ameeenmv@gmail.com" class="block group w-fit" data-hover-text="Email">
                <span class="text-sm font-mono tracking-widest text-text-secondary block mb-2 uppercase">Email</span>
                <span class="text-3xl md:text-5xl font-display font-medium text-text-primary group-hover:text-accent transition-colors duration-300">ameeenmv@gmail.com</span>
              </a>
              
              <div>
                <span class="text-sm font-mono tracking-widest text-text-secondary block mb-4 uppercase">Social</span>
                <div class="flex flex-col gap-4 text-xl md:text-2xl font-light">
                  <a href="https://github.com/ameeenmv" target="_blank" class="text-text-primary hover:text-accent transition-colors w-fit" data-hover-text="GitHub">GitHub</a>
                  <a href="https://linkedin.com/in/ameeenmv" target="_blank" class="text-text-primary hover:text-accent transition-colors w-fit" data-hover-text="LinkedIn">LinkedIn</a>
                  <a href="https://youtube.com/@ameeenmv" target="_blank" class="text-text-primary hover:text-accent transition-colors w-fit" data-hover-text="YouTube">YouTube</a>
                </div>
              </div>
              
              <div class="pt-8">
                <a href="/resume.pdf" download class="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-accent text-text-primary hover:text-accent transition-colors duration-300 font-mono text-sm tracking-widest uppercase group" data-hover-text="Download">
                  Download Resume
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-y-1 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
              </div>
            </div>
          </div>
          
          <!-- Right: Form -->
          <div class="bg-bg-secondary rounded-[40px] md:rounded-[80px] p-8 md:p-16 border border-white/5 relative shadow-2xl">
            <h3 class="text-3xl font-display font-medium text-text-primary mb-8">Send a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from '#imports'
import PageIntro from '~/components/ui/PageIntro.vue'
import ContactForm from '~/components/contact/ContactForm.vue'

useHead({
  title: 'Contact | Ameen Mohamed'
})

useSeoMeta({
  title: 'Contact | Ameen Mohamed',
  description: 'Get in touch with Ameen Mohamed.',
})
</script>
