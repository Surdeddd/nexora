<template>
  <section ref="heroRef" class="hero relative w-full h-screen overflow-hidden">
    
    <h1 class="sr-only">nexora - Разработка сайтов и цифровых продуктов</h1>
    
    
    <div class="hero__particles">
      <div class="hero__particle hero__particle--1"></div>
      <div class="hero__particle hero__particle--2"></div>
      <div class="hero__particle hero__particle--3"></div>
      <div class="hero__particle hero__particle--4"></div>
      <div class="hero__particle hero__particle--5"></div>
      <div class="hero__particle hero__particle--6"></div>
      <div class="hero__particle hero__particle--7"></div>
      <div class="hero__particle hero__particle--8"></div>
    </div>

    
    <canvas ref="dustCanvasRef" class="hero__dust-canvas"></canvas>

    
    <div ref="logoRef" class="hero__logo absolute z-20">
      <svg
        width="224"
        height="224"
        viewBox="0 0 224 224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="hero__logo-svg"
      >
        
        <path
          ref="squarePathRef"
          d="M155.75 7H68.25C34.4226 7 7 34.4226 7 68.25V155.75C7 189.577 34.4226 217 68.25 217H155.75C189.577 217 217 189.577 217 155.75V68.25C217 34.4226 189.577 7 155.75 7Z"
          stroke="url(#paint0_linear)"
          stroke-width="14"
          fill="none"
        />
        
        <path
          ref="circlePathRef"
          d="M112 63.875C142.625 63.875 164.5 85.75 164.5 112C164.5 138.25 142.625 160.125 112 160.125C81.375 160.125 59.5 138.25 59.5 112"
          stroke="url(#paint1_linear)"
          stroke-width="18"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
        
        <path
          ref="dotPathRef"
          opacity="0.9"
          d="M112 122.938C118.041 122.938 122.938 118.041 122.938 112C122.938 105.959 118.041 101.062 112 101.062C105.959 101.062 101.062 105.959 101.062 112C101.062 118.041 105.959 122.938 112 122.938Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="7"
            y1="7"
            x2="217"
            y2="217"
            gradientUnits="userSpaceOnUse"
          >
            <stop :stop-color="accentPrimaryColor" />
            <stop offset="1" :stop-color="accentSecondaryColor" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="7.00001"
            y1="7"
            x2="217"
            y2="217"
            gradientUnits="userSpaceOnUse"
          >
            <stop :stop-color="accentPrimaryColor" />
            <stop offset="1" :stop-color="accentSecondaryColor" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    
    <img
      class="hero__flower absolute"
      src="@/assets/img/flower-3d.png"
      alt="3D цветок - декоративный элемент nexora"
      draggable="false"
      aria-hidden="true"
      loading="lazy"
      fetchpriority="low"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const heroRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const squarePathRef = ref<SVGPathElement | null>(null)
const circlePathRef = ref<SVGPathElement | null>(null)
const dotPathRef = ref<SVGPathElement | null>(null)
const dustCanvasRef = ref<HTMLCanvasElement | null>(null)

let drawTimeline: any
let dustAnimationFrame: number | null = null
let flowerMouseMoveHandler: ((e: MouseEvent) => void) | null = null
const accentPrimaryColor = computed(() => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent-primary')
      .trim()
  }
  return '#7C3AED'
})

const accentSecondaryColor = computed(() => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent-secondary')
      .trim()
  }
  return '#22D3EE'
})
interface DustParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

let dustParticles: DustParticle[] = []
function getPathLength(path: SVGPathElement | null): number {
  if (!path) return 0
  return path.getTotalLength()
}
function setupPathDrawing(path: SVGPathElement | null) {
  if (!path) return
  const length = getPathLength(path)
  path.style.strokeDasharray = `${length}`
  path.style.strokeDashoffset = `${length}`
}
function initDustParticles() {
  if (!dustCanvasRef.value || !heroRef.value) return

  const canvas = dustCanvasRef.value
  const rect = heroRef.value.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height

  
  const particleCount = Math.floor((canvas.width * canvas.height) / 15000) 
  dustParticles = []

  for (let i = 0; i < particleCount; i++) {
    dustParticles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, 
      vy: (Math.random() - 0.5) * 0.2, 
      size: Math.random() * 1.5 + 0.5, 
      opacity: Math.random() * 0.4 + 0.1, 
      color: Math.random() > 0.5 ? accentPrimaryColor.value : accentSecondaryColor.value, 
    })
  }
}
function animateDust() {
  if (!dustCanvasRef.value || !heroRef.value) return

  const canvas = dustCanvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  
  dustParticles.forEach((particle) => {
    
    particle.x += particle.vx
    particle.y += particle.vy

    
    if (particle.x < 0) particle.x = canvas.width
    if (particle.x > canvas.width) particle.x = 0
    if (particle.y < 0) particle.y = canvas.height
    if (particle.y > canvas.height) particle.y = 0

    
    ctx.beginPath()
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
    ctx.fillStyle = particle.color
    ctx.globalAlpha = particle.opacity
    ctx.fill()
  })

  
  ctx.globalAlpha = 1

  
  dustAnimationFrame = requestAnimationFrame(animateDust)
}
function handleResize() {
  if (!dustCanvasRef.value || !heroRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  dustCanvasRef.value.width = rect.width
  dustCanvasRef.value.height = rect.height
  initDustParticles()
}

onMounted(async () => {
  if (!heroRef.value || !logoRef.value) return

  const { gsap } = await import('gsap')

  
  initDustParticles()
  if (dustCanvasRef.value) {
    animateDust()
    window.addEventListener('resize', handleResize)
  }

  
  const particles = heroRef.value.querySelectorAll('.hero__particle')
  particles.forEach((particle, index) => {
    gsap.to(particle, {
      y: `+=${30 + index * 10}`,
      x: `+=${20 - index * 5}`,
      duration: 8 + index * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.5,
    })
  })

  
  if (squarePathRef.value) {
    setupPathDrawing(squarePathRef.value)
  }
  if (circlePathRef.value) {
    setupPathDrawing(circlePathRef.value)
  }
  if (dotPathRef.value) {
    gsap.set(dotPathRef.value, { opacity: 0 })
  }

  
  gsap.set(logoRef.value, { opacity: 1 })

  
  drawTimeline = gsap.timeline({ delay: 0.2 })

  
  if (squarePathRef.value) {
    drawTimeline.to(squarePathRef.value, {
      strokeDashoffset: 0,
      duration: 1.0,
      ease: 'none', 
    })
  }

  
  if (circlePathRef.value) {
    drawTimeline.to(
      circlePathRef.value,
      {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'none',
      },
      '-=0.3' 
    )
  }

  
  if (dotPathRef.value) {
    drawTimeline.to(
      dotPathRef.value,
      {
        opacity: 0.9,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.2'
    )
  }
})

onBeforeUnmount(() => {
  drawTimeline?.kill()
  if (dustAnimationFrame !== null) {
    cancelAnimationFrame(dustAnimationFrame)
  }
  window.removeEventListener('resize', handleResize)
  
  if (flowerMouseMoveHandler && heroRef.value) {
    heroRef.value.removeEventListener('mousemove', flowerMouseMoveHandler)
  }
})
</script>

<style scoped lang="scss">
.hero {
  background: var(--color-background-primary);
  min-width: 320px;
  position: relative;
  overflow: hidden;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.hero__particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}
.hero__logo {
  top: 120px;
  right: 5%;
  width: 210px;
  height: 210px;

  transform-origin: center;
  will-change: stroke-dashoffset, opacity;

  user-select: none;
  pointer-events: none;
  z-index: 20;

  
  @media (max-width: 768px) {
    top: 100px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 160px;
  }

  
  @media (max-width: 480px) {
    top: 80px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 140px;
  }

  
  @media (max-width: 360px) {
    top: 70px;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 120px;
  }
}

.hero__logo-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.hero__flower {
  left: 5%;
  bottom: 0;

  max-width: 684px;
  max-height: 463px;
  width: auto;
  height: auto;

  pointer-events: none;
  user-select: none;
  z-index: 10;
  
  transform-style: preserve-3d;
  perspective: 1000px;
  filter: 
    drop-shadow(0 20px 40px rgba(124, 58, 237, 0.4))
    drop-shadow(0 40px 80px rgba(34, 211, 238, 0.3))
    drop-shadow(0 0 30px rgba(124, 58, 237, 0.2));
  transition: transform 0.1s ease-out, filter 0.3s ease;
  will-change: transform;

  @media (max-width: 768px) {
    left: 3%;
    max-width: 500px;
    max-height: 340px;
    filter: 
      drop-shadow(0 15px 30px rgba(124, 58, 237, 0.3))
      drop-shadow(0 30px 60px rgba(34, 211, 238, 0.2));
  }

  @media (max-width: 480px) {
    left: 2%;
    max-width: 350px;
    max-height: 240px;
    filter: 
      drop-shadow(0 10px 20px rgba(124, 58, 237, 0.3))
      drop-shadow(0 20px 40px rgba(34, 211, 238, 0.2));
  }

  @media (max-width: 360px) {
    left: 1%;
    max-width: 280px;
    max-height: 190px;
    filter: 
      drop-shadow(0 8px 16px rgba(124, 58, 237, 0.3))
      drop-shadow(0 16px 32px rgba(34, 211, 238, 0.2));
  }
}
</style>
