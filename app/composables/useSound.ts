import { ref, onMounted } from 'vue'

// Global state to keep track of mute status across components
const isMuted = ref(true) // Start muted to comply with browser autoplay policies

let audioCtx: AudioContext | null = null

export const useSound = () => {
  const initAudio = () => {
    if (!audioCtx) {
      // Use webkitAudioContext for Safari fallback
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (AudioContextClass) {
        audioCtx = new AudioContextClass()
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
  }

  const toggleMute = () => {
    isMuted.value = !isMuted.value
    if (!isMuted.value) {
      initAudio()
      playClick() // Feedback
    }
  }

  const playTick = () => {
    if (isMuted.value || !audioCtx) return

    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    // High pitch, extremely short duration
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, t)
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05)

    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.1, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(t)
    osc.stop(t + 0.05)
  }

  const playClick = () => {
    if (isMuted.value || !audioCtx) return

    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    // Deeper, slightly longer pitch
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(400, t)
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.1)

    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.2, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(t)
    osc.stop(t + 0.1)
  }

  const playWhoosh = () => {
    if (isMuted.value || !audioCtx) return

    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const filter = audioCtx.createBiquadFilter()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(100, t)
    osc.frequency.linearRampToValueAtTime(20, t + 0.5)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2000, t)
    filter.frequency.exponentialRampToValueAtTime(100, t + 0.5)

    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.1, t + 0.1)
    gain.gain.linearRampToValueAtTime(0.001, t + 0.5)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(t)
    osc.stop(t + 0.5)
  }

  const playType = () => {
    if (isMuted.value || !audioCtx) return

    const t = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.type = 'square'
    // Randomize pitch slightly for typewriter effect
    const pitch = 600 + Math.random() * 200
    osc.frequency.setValueAtTime(pitch, t)
    
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.01, t + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(t)
    osc.stop(t + 0.02)
  }

  const playSuccess = () => {
    if (isMuted.value || !audioCtx) return

    const t = audioCtx.currentTime
    const osc1 = audioCtx.createOscillator()
    const osc2 = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    // Major third harmony ping
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, t) // C5
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(659.25, t) // E5

    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.1, t + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(audioCtx.destination)

    osc1.start(t)
    osc2.start(t)
    osc1.stop(t + 1.0)
    osc2.stop(t + 1.0)
  }

  return {
    isMuted,
    initAudio,
    toggleMute,
    playTick,
    playClick,
    playWhoosh,
    playType,
    playSuccess
  }
}
