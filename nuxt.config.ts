// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt',
    '@nuxt/image',
    '@nuxtjs/google-fonts'
  ],

  css: ['~/assets/css/tailwind.css'],

  tres: {
    glsl: true,
  },

  googleFonts: {
    families: {
      'Space Grotesk': [400, 500, 600, 700],
      'Inter': [300, 400, 500, 600]
    },
    display: 'swap'
  },

  app: {
    head: {
      title: 'Ameen Mohamed — Front-End Developer',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Mid-Level Front-End Developer specializing in Vue.js & Nuxt.js ecosystems.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  build: {
    transpile: ['gsap']
  }
})
