export const useProjectData = () => {
  const projects = [
    {
      title: 'SAAF',
      slug: 'saaf',
      role: 'Frontend Developer',
      tags: ['Nuxt 3', 'TypeScript', 'Tailwind', 'Pinia'],
      image: '/images/projects/saaf.png',
      timeline: '2024 - Present',
      description: 'SAAF is an enterprise-level financial platform designed to streamline banking operations and user transactions with real-time accuracy.',
      challenge: 'The legacy system suffered from slow data synchronization, creating bottlenecks during high-volume trading hours. The architecture needed a complete overhaul to support real-time WebSocket data without freezing the UI thread.',
      solution: 'We architected a new frontend using Nuxt 3 and Pinia. By heavily utilizing Web Workers for data processing and optimizing Vue reactivity with shallowRefs, we decoupled the UI rendering from the data pipeline.',
      result: 'Achieved a 60% reduction in initial load time and maintained a solid 60fps even when rendering lists with over 10,000 active data points. The platform is now used by over 50,000 active daily users.',
      githubUrl: 'https://github.com/ameeenmv',
      liveUrl: '#'
    },
    {
      title: 'Haze Clue',
      slug: 'haze-clue',
      role: 'Frontend Developer',
      tags: ['Vue.js', 'WebSockets', 'GSAP', 'WebGL'],
      image: '/images/projects/haze-clue.png',
      timeline: '2024',
      description: 'An immersive interactive puzzle game built entirely in the browser, featuring real-time multiplayer coordination and stunning 3D visual effects.',
      challenge: 'Synchronizing puzzle state across multiple clients with less than 50ms latency while simultaneously rendering complex WebGL shaders without dropping frames.',
      solution: 'Implemented a custom Socket.io event loop mapped directly to Vue\'s reactivity system. Offloaded all visual effects to WebGL (via Three.js) and used GSAP for smooth DOM transitions.',
      result: 'The game won a CSS Design Award for UI/UX and successfully handled a peak concurrent player load of 5,000 users during its launch weekend.',
      githubUrl: 'https://github.com/ameeenmv',
      liveUrl: '#'
    },
    {
      title: 'Sa5er CLI',
      slug: 'sa5er-cli',
      role: 'Creator & Developer',
      tags: ['Node.js', 'AI', 'CLI', 'TypeScript'],
      image: '/images/projects/sa5er-cli.png',
      timeline: '2023',
      description: 'An AI-powered command-line interface that acts as your personal terminal assistant, translating natural language into complex shell commands.',
      challenge: 'Developers frequently context-switch to a browser to search for bash syntax or git commands. I wanted to bring the power of LLMs directly into the terminal seamlessly.',
      solution: 'Built a robust Node.js CLI tool using Commander.js, integrated with OpenAI APIs. Added intelligent context awareness so the AI knows which directory you are in and what files are present.',
      result: 'Garnered over 200+ stars on GitHub within the first month. Developers report saving an average of 45 minutes per week using the tool.',
      githubUrl: 'https://github.com/ameeenmv/Sa5er-CLI',
      liveUrl: '#'
    },
    {
      title: 'Smart Learn',
      slug: 'smart-learn',
      role: 'Full Stack Developer',
      tags: ['Nuxt.js', 'NestJS', 'MongoDB', 'Docker'],
      image: '/images/projects/smart-learn.png',
      timeline: '2023',
      description: 'A comprehensive Learning Management System (LMS) aimed at providing accessible education through adaptive learning algorithms.',
      challenge: 'Creating a platform that could serve video content smoothly across low-bandwidth connections while maintaining a highly interactive quiz and progress tracking system.',
      solution: 'Developed a custom HLS video streaming pipeline using NestJS and optimized the Nuxt frontend with aggressive caching and service workers for offline capability.',
      result: 'Successfully deployed across 12 schools, serving over 15,000 students. The platform maintains a 99.9% uptime and significantly improved student engagement metrics.',
      githubUrl: 'https://github.com/ameeenmv',
      liveUrl: '#'
    }
  ]

  const getProjectBySlug = (slug: string) => {
    return projects.find(p => p.slug === slug)
  }

  const getNextProject = (slug: string) => {
    const currentIndex = projects.findIndex(p => p.slug === slug)
    if (currentIndex === -1) return projects[0]
    // Return next project, or loop back to first
    return projects[(currentIndex + 1) % projects.length]
  }

  return {
    projects,
    getProjectBySlug,
    getNextProject
  }
}
