export default defineNuxtPlugin((nuxtApp) => {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ]
  let konamiIndex = 0

  const handleKeydown = (e: KeyboardEvent) => {
    // Prevent tracking if the user is typing in an input or textarea
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++
      if (konamiIndex === konamiCode.length) {
        triggerEasterEgg()
        konamiIndex = 0
      }
    } else {
      konamiIndex = 0
    }
  }

  const triggerEasterEgg = () => {
    console.log('🎮 KONAMI CODE ACTIVATED 🎮')
    
    // Change accent color to a random neon color temporarily
    const neonColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff00ff']
    const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)]
    
    document.documentElement.style.setProperty('--accent', randomColor)
    
    // Confetti effect via canvas
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.inset = '0'
    canvas.style.pointerEvents = 'none'
    canvas.style.zIndex = '9999'
    document.body.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    const particles: any[] = []
    for(let i = 0; i < 100; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        color: neonColors[Math.floor(Math.random() * neonColors.length)],
        size: Math.random() * 10 + 5
      })
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let active = false
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.5 // gravity
        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
        if (p.y < canvas.height) active = true
      })
      if (active) requestAnimationFrame(animate)
      else {
        document.body.removeChild(canvas)
        // Reset color after 5 seconds
        setTimeout(() => {
          document.documentElement.style.removeProperty('--accent')
        }, 5000)
      }
    }
    animate()
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})
