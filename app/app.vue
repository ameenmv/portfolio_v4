<template>
  <NuxtLayout>
    <main id="main-content">
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead, useSeoMeta } from '#imports'

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Ameen Mohamed` : 'Ameen Mohamed | Front-End Developer'
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

useSeoMeta({
  description: 'Ameen Mohamed is a Front-End Developer and Tech Lead from Egypt, specializing in building immersive digital experiences, leading teams, and mentoring developers.',
  ogTitle: 'Ameen Mohamed | Front-End Developer',
  ogDescription: 'Ameen Mohamed is a Front-End Developer and Tech Lead from Egypt, specializing in building immersive digital experiences.',
  ogImage: 'https://ameeen.me/og-image.jpg',
  ogUrl: 'https://ameeen.me',
  twitterTitle: 'Ameen Mohamed | Front-End Developer',
  twitterDescription: 'Front-End Developer and Tech Lead specializing in building immersive digital experiences.',
  twitterImage: 'https://ameeen.me/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>
