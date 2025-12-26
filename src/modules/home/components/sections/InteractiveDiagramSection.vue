<template>
  <section ref="section" class="interactive-diagram relative py-16 px-4 sm:py-20 sm:px-6 md:py-24 md:px-8 lg:py-32 lg:px-12">
    <div 
      v-if="sliderValues[0] > 0"
      class="interactive-diagram__particles"
      :style="{ opacity: sliderValues[0] / 100 }"
    >
      <div
        v-for="(style, index) in particleStyles"
        :key="`particle-${index}`"
        class="interactive-diagram__particle"
        :style="style"
      ></div>
    </div>
    
    <div ref="container" class="interactive-diagram__container max-w-[1600px] mx-auto relative">
      <svg
        class="interactive-diagram__lines absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        :viewBox="`0 0 ${svgWidth} ${svgHeight}`"
      >
        <path
          v-if="line1Path"
          :d="line1Path"
          class="interactive-diagram__line interactive-diagram__line--1"
          :stroke="`rgba(248, 250, 252, ${0.3 + (sliderValues[2] / 100) * 0.7})`"
          :stroke-width="1 + (sliderValues[2] / 100) * 0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          :style="{ filter: `drop-shadow(0 0 ${(sliderValues[2] / 100) * 10}px rgba(124, 58, 237, ${0.5 + (sliderValues[2] / 100) * 0.5}))` }"
        />
        <path
          v-if="line2Path"
          :d="line2Path"
          class="interactive-diagram__line interactive-diagram__line--2"
          :stroke="`rgba(248, 250, 252, ${0.3 + (sliderValues[2] / 100) * 0.7})`"
          :stroke-width="1 + (sliderValues[2] / 100) * 0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          :style="{ filter: `drop-shadow(0 0 ${(sliderValues[2] / 100) * 10}px rgba(34, 211, 238, ${0.5 + (sliderValues[2] / 100) * 0.5}))` }"
        />
        <path
          v-if="line3Path"
          :d="line3Path"
          class="interactive-diagram__line interactive-diagram__line--3"
          :stroke="`rgba(248, 250, 252, ${0.3 + (sliderValues[2] / 100) * 0.7})`"
          :stroke-width="1 + (sliderValues[2] / 100) * 0.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
          :style="{ filter: `drop-shadow(0 0 ${(sliderValues[2] / 100) * 10}px rgba(124, 58, 237, ${0.5 + (sliderValues[2] / 100) * 0.5}))` }"
        />
      </svg>

      <div class="interactive-diagram__blocks">
        <div
          ref="settingsBlock"
          class="interactive-diagram__block-wrapper interactive-diagram__block-wrapper--settings"
          :style="settingsBlockStyle"
        >
          <h3 class="interactive-diagram__block-title interactive-diagram__block-title--above">Настройка</h3>
          <LiquidGlassComponent class="interactive-diagram__block interactive-diagram__block--settings">
            <div class="interactive-diagram__block-content interactive-diagram__block-content--centered">
              <div class="interactive-diagram__block-controls">
                <div 
                  ref="slider1Track"
                  class="interactive-diagram__control-item"
                  :class="{ 'is-active': activeControl === 1, 'is-dragging': isDragging === 1 }"
                  @mousedown="startDrag(1, $event)"
                  @touchstart="startDrag(1, $event)"
                >
                  <div class="interactive-diagram__control-track">
                    <div 
                      class="interactive-diagram__control-thumb"
                      :style="{ left: `${sliderValues[0]}%` }"
                    ></div>
                  </div>
                </div>
                <div 
                  ref="slider2Track"
                  class="interactive-diagram__control-item"
                  :class="{ 'is-active': activeControl === 2, 'is-dragging': isDragging === 2 }"
                  @mousedown="startDrag(2, $event)"
                  @touchstart="startDrag(2, $event)"
                >
                  <div class="interactive-diagram__control-track">
                    <div 
                      class="interactive-diagram__control-thumb"
                      :style="{ left: `${sliderValues[1]}%` }"
                    ></div>
                  </div>
                </div>
                <div 
                  ref="slider3Track"
                  class="interactive-diagram__control-item"
                  :class="{ 'is-active': activeControl === 3, 'is-dragging': isDragging === 3 }"
                  @mousedown="startDrag(3, $event)"
                  @touchstart="startDrag(3, $event)"
                >
                  <div class="interactive-diagram__control-track">
                    <div 
                      class="interactive-diagram__control-thumb"
                      :style="{ left: `${sliderValues[2]}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </LiquidGlassComponent>
        </div>

        <div
          ref="servicesBlock"
          class="interactive-diagram__block-wrapper interactive-diagram__block-wrapper--services"
          :style="servicesBlockStyle"
        >
          <LiquidGlassComponent class="interactive-diagram__block">
            <div class="interactive-diagram__block-content">
              <h3 class="interactive-diagram__block-title">Цифровые услуги</h3>
            </div>
          </LiquidGlassComponent>
        </div>

        <div
          ref="businessBlock"
          class="interactive-diagram__block-wrapper interactive-diagram__block-wrapper--business"
          :style="businessBlockStyle"
        >
          <LiquidGlassComponent class="interactive-diagram__block">
            <div class="interactive-diagram__block-content">
              <h3 class="interactive-diagram__block-title">
                разработка<br>для бизнеса
              </h3>
            </div>
          </LiquidGlassComponent>
        </div>

      </div>

      <div
        ref="object3d"
        class="interactive-diagram__3d-object"
        :style="object3dStyle"
      >
        <img
          ref="sphereImageRef"
          src="@/assets/img/sphere-3d.png"
          alt="3D сфера - интерактивный элемент nexora"
          aria-hidden="true"
          loading="lazy"
          class="interactive-diagram__sphere-image"
        />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import LiquidGlassComponent from '~/components/LiquidGlass-component.vue'

const section = ref<HTMLElement | null>(null)
const container = ref<HTMLElement | null>(null)
const settingsBlock = ref<HTMLElement | null>(null)
const servicesBlock = ref<HTMLElement | null>(null)
const businessBlock = ref<HTMLElement | null>(null)
const object3d = ref<HTMLElement | null>(null)
const sphereImageRef = ref<HTMLImageElement | null>(null)

let sphereMouseMoveHandler: ((e: MouseEvent) => void) | null = null

const slider1Track = ref<HTMLElement | null>(null)
const slider2Track = ref<HTMLElement | null>(null)
const slider3Track = ref<HTMLElement | null>(null)

const svgWidth = ref(0)
const svgHeight = ref(0)

const sliderValues = ref([0, 0, 0])

const activeControl = ref<number | null>(null)
const isDragging = ref<number | null>(null)

function startDrag(sliderIndex: number, event: MouseEvent | TouchEvent) {
  event.preventDefault()
  isDragging.value = sliderIndex
  activeControl.value = sliderIndex
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', handleDrag)
  document.addEventListener('touchend', stopDrag)
}

function handleDrag(event: MouseEvent | TouchEvent) {
  if (isDragging.value === null) return
  
  const sliderIndex = isDragging.value
  const track = sliderIndex === 1 ? slider1Track.value : sliderIndex === 2 ? slider2Track.value : slider3Track.value
  if (!track) return
  
  const trackRect = track.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  
  const relativeX = clientX - trackRect.left
  const percentage = Math.max(0, Math.min(100, (relativeX / trackRect.width) * 100))
  
  sliderValues.value[sliderIndex - 1] = percentage
}

function stopDrag() {
  isDragging.value = null
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('touchend', stopDrag)
}

const particleStyles = ref<Array<Record<string, string>>>([])

function generateParticleStyles(count: number) {
  const styles: Array<Record<string, string>> = []
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 4 + 2
    const left = Math.random() * 100
    const top = Math.random() * 100
    const delay = Math.random() * 5
    const duration = Math.random() * 10 + 10
    
    styles.push({
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    })
  }
  return styles
}

const particleCount = computed(() => {
  return Math.floor(sliderValues.value[0] / 100 * 50)
})

watch(particleCount, (newCount: number) => {
  particleStyles.value = generateParticleStyles(newCount)
}, { immediate: true })

const settingsBlockStyle = computed(() => ({
  filter: `drop-shadow(0 0 ${(sliderValues.value[1] / 100) * 30}px rgba(124, 58, 237, ${0.3 + (sliderValues.value[1] / 100) * 0.4}))`,
}))

const servicesBlockStyle = computed(() => ({
  filter: `drop-shadow(0 0 ${(sliderValues.value[1] / 100) * 30}px rgba(34, 211, 238, ${0.3 + (sliderValues.value[1] / 100) * 0.4}))`,
}))

const businessBlockStyle = computed(() => ({
  filter: `drop-shadow(0 0 ${(sliderValues.value[1] / 100) * 30}px rgba(124, 58, 237, ${0.3 + (sliderValues.value[1] / 100) * 0.4}))`,
}))

const object3dStyle = computed(() => ({
  filter: `drop-shadow(0 0 ${(sliderValues.value[1] / 100) * 50}px rgba(124, 58, 237, ${0.4 + (sliderValues.value[1] / 100) * 0.5})) drop-shadow(0 0 ${(sliderValues.value[1] / 100) * 80}px rgba(34, 211, 238, ${0.3 + (sliderValues.value[1] / 100) * 0.4}))`,
}))

const line1Path = ref('')
const line2Path = ref('')
const line3Path = ref('')

function getPointOnRect(rect: DOMRect, side: 'left' | 'right' | 'top' | 'bottom', position: number, containerRect: DOMRect) {
  const rectX = rect.left - containerRect.left
  const rectY = rect.top - containerRect.top
  const rectRight = rectX + rect.width
  const rectBottom = rectY + rect.height
  
  switch (side) {
    case 'left':
      return { x: rectX, y: rectY + (rectBottom - rectY) * position }
    case 'right':
      return { x: rectRight, y: rectY + (rectBottom - rectY) * position }
    case 'top':
      return { x: rectX + (rectRight - rectX) * position, y: rectY }
    case 'bottom':
      return { x: rectX + (rectRight - rectX) * position, y: rectBottom }
  }
}

function createBezier(start: { x: number; y: number }, end: { x: number; y: number }) {
  const dx = end.x - start.x
  const dy = end.y - start.y

  const c1 = {
    x: start.x + dx * 0.35,
    y: start.y + dy * 0.1,
  }

  const c2 = {
    x: start.x + dx * 0.65,
    y: start.y + dy * 0.9,
  }

  return `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`
}

function updateLinePaths() {
  if (
    !container.value ||
    !settingsBlock.value ||
    !servicesBlock.value ||
    !businessBlock.value ||
    !object3d.value
  ) return

  const containerRect = container.value.getBoundingClientRect()
  const windowWidth = window.innerWidth
  
  svgWidth.value = containerRect.width
  svgHeight.value = containerRect.height
  const settingsRect = settingsBlock.value.getBoundingClientRect()
  const servicesRect = servicesBlock.value.getBoundingClientRect()
  const businessRect = businessBlock.value.getBoundingClientRect()
  const objectRect = object3d.value.getBoundingClientRect()

  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  if (isMobile) {
    const s1 = getPointOnRect(settingsRect, 'bottom', 0.8, containerRect)
    const e1 = getPointOnRect(servicesRect, 'top', 0.5, containerRect)
    s1.y += 0.5
    e1.y -= 0.5
    line1Path.value = createBezier(s1, e1)

    line2Path.value = ''

    if (objectRect.top < containerRect.bottom - 100) {
      const s3 = getPointOnRect(settingsRect, 'bottom', 0.5, containerRect)
      const e3 = getPointOnRect(objectRect, 'top', 0.5, containerRect)
      s3.y += 0.5
      e3.y -= 0.5
      line3Path.value = createBezier(s3, e3)
    } else {
      line3Path.value = ''
    }
  } else if (isTablet) {
    const s1 = getPointOnRect(settingsRect, 'right', 0.4, containerRect)
    const e1 = getPointOnRect(servicesRect, 'bottom', 0.5, containerRect)
    s1.x += 0.5
    e1.y += 0.5
    line1Path.value = createBezier(s1, e1)

    const s2 = getPointOnRect(settingsRect, 'left', 0.7, containerRect)
    const e2 = getPointOnRect(businessRect, 'top', 0.6, containerRect)
    s2.x -= 0.5
    e2.y -= 0.5
    line2Path.value = createBezier(s2, e2)

    const s3 = getPointOnRect(settingsRect, 'bottom', 0.5, containerRect)
    const e3 = getPointOnRect(objectRect, 'left', 0.5, containerRect)
    s3.y += 0.5
    e3.x -= 0.5
    line3Path.value = createBezier(s3, e3)
  } else {
    const s1 = getPointOnRect(settingsRect, 'right', 0.35, containerRect)
    const e1 = getPointOnRect(servicesRect, 'bottom', 0.5, containerRect)
    s1.x += 0.5
    e1.y += 0.5
    line1Path.value = createBezier(s1, e1)

    const s2 = getPointOnRect(settingsRect, 'left', 0.65, containerRect)
    const e2 = getPointOnRect(businessRect, 'top', 0.6, containerRect)
    s2.x -= 0.5
    e2.y -= 0.5
    line2Path.value = createBezier(s2, e2)

    const s3 = getPointOnRect(settingsRect, 'bottom', 0.5, containerRect)
    const e3 = getPointOnRect(objectRect, 'left', 0.5, containerRect)
    s3.y += 0.5
    e3.x -= 0.5
    line3Path.value = createBezier(s3, e3)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  
  const { gsap } = await import('gsap')
  
  updateLinePaths()
  
  if (settingsBlock.value) {
    gsap.to(settingsBlock.value, {
      y: -3,
      rotation: 0.5,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }
  
  if (servicesBlock.value) {
    gsap.to(servicesBlock.value, {
      y: -3,
      rotation: 0.5,
      duration: 2.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.3,
    })
  }
  
  if (businessBlock.value) {
    gsap.to(businessBlock.value, {
      y: -3,
      rotation: 0.5,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 0.6,
    })
  }
  
  if (container.value) {
    resizeObserver = new ResizeObserver(() => {
      updateLinePaths()
    })
    resizeObserver.observe(container.value)
  }
  
  window.addEventListener('resize', () => {
    updateLinePaths()
  })
  
  if (sphereImageRef.value && section.value) {
    sphereMouseMoveHandler = (e: MouseEvent) => {
      if (!section.value || !sphereImageRef.value) return
      
      const rect = section.value.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
      
      sphereImageRef.value.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(20px) translateY(-10px) rotate(5deg)`
    }
    
    section.value.addEventListener('mousemove', sphereMouseMoveHandler)
  }
})

onUnmounted(() => {
  if (resizeObserver && container.value) {
    resizeObserver.unobserve(container.value)
    resizeObserver.disconnect()
  }
  window.removeEventListener('resize', updateLinePaths)
  
  if (sphereMouseMoveHandler && section.value) {
    section.value.removeEventListener('mousemove', sphereMouseMoveHandler)
  }
})
</script>

<style scoped lang="scss">
.interactive-diagram {
  background: var(--color-background-secondary);
  min-width: 320px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
  
  @media (max-width: 899px) {
    display: none;
  }
  
  &__particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  }
  
  &__particle {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(124, 58, 237, 0.8) 0%,
      rgba(34, 211, 238, 0.6) 50%,
      transparent 100%
    );
    animation: floatParticle infinite ease-in-out;
    box-shadow: 0 0 10px rgba(124, 58, 237, 0.5);
  }
  
  @keyframes floatParticle {
    0%, 100% {
      transform: translate(0, 0) scale(1);
      opacity: 0.3;
    }
    25% {
      transform: translate(20px, -30px) scale(1.2);
      opacity: 0.6;
    }
    50% {
      transform: translate(-15px, -50px) scale(0.8);
      opacity: 0.4;
    }
    75% {
      transform: translate(30px, -20px) scale(1.1);
      opacity: 0.7;
    }
  }

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__lines {
    overflow: visible;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__line {
    transition: opacity 0.3s ease, stroke-width 0.3s ease;
    stroke-dasharray: 5, 5;
    stroke-dashoffset: 0;
    animation: lineMove 3s linear infinite;
    
    @media (max-width: 640px) {
      stroke-width: 1;
    }
    
    @media (min-width: 640px) and (max-width: 1024px) {
      stroke-width: 1.25;
    }
    
    @media (min-width: 1024px) {
      stroke-width: 1.5;
    }
  }
  
  @keyframes lineMove {
    0% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: 20;
    }
  }

  &__blocks {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__block-wrapper {
    position: absolute;
    transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
    will-change: transform, opacity, filter;

    &--settings {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 15;
    }

    &--services {
      top: 5%;
      right: 8%;
      
      @media (min-width: 640px) {
        top: 4%;
        right: 6%;
      }
      
      @media (min-width: 1024px) {
        top: 3%;
        right: 5%;
      }
    }

    &--business {
      bottom: 8%;
      left: 3%;
      
      @media (min-width: 640px) {
        bottom: 6%;
        left: 2%;
      }
      
      @media (min-width: 1024px) {
        bottom: 5%;
        left: 1%;
      }
    }
  }

  &__block {
    padding: 40px 48px;
    min-width: 320px;
    
    &--settings {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 29px 26px;
      width: 299px;
      min-height: 149px;
    }
    
    @media (min-width: 640px) {
      min-width: 360px;
      padding: 48px 56px;
      
      &--settings {
        width: 299px;
        min-height: 149px;
        padding: 29px 26px;
      }
    }
    
    @media (min-width: 1024px) {
      min-width: 400px;
      padding: 60px 72px;
      
      &--settings {
        width: 299px;
        min-height: 149px;
        padding: 29px 26px;
      }
    }
    
    @media (max-height: 700px) {
      padding: 32px 40px;
      
      &--settings {
        padding: 20px 20px;
        min-height: 120px;
      }
    }
    
    @media (max-height: 600px) {
      padding: 24px 32px;
      
      &--settings {
        padding: 16px 16px;
        min-height: 100px;
      }
    }
  }

  &__block-content {
    position: relative;
    z-index: 1;
    
    &--centered {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100%;
    }
  }

  &__block-title {
    font-family: var(--font-family-brand);
    font-size: 20px;
    font-weight: 400;
    color: var(--color-text-primary);
    line-height: 1.1;
    margin: 0;
    text-transform: none;
    letter-spacing: 0;
    text-align: left;
    
    &--above {
      margin-bottom: 12px;
      text-transform: none;
      text-align: center;
      font-size: 32px;
      color: var(--color-text-primary);
    }
    
    @media (min-width: 640px) {
      font-size: 24px;
      
      &--above {
        font-size: 32px;
      }
    }
    
    @media (min-width: 1024px) {
      font-size: 32px;
      line-height: 1.1;
      
      &--above {
        font-size: 32px;
      }
    }
    
    @media (max-height: 700px) {
      font-size: 18px;
      
      &--above {
        font-size: 24px;
        margin-bottom: 8px;
      }
    }
    
    @media (max-height: 600px) {
      font-size: 16px;
      
      &--above {
        font-size: 20px;
        margin-bottom: 6px;
      }
    }
  }

  &__block-controls {
    display: flex;
    flex-direction: column;
    gap: 11px;
    margin-top: 0;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    
    @media (max-height: 700px) {
      gap: 8px;
    }
    
    @media (max-height: 600px) {
      gap: 6px;
    }
  }

  &__control-item {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 8px 0;
    user-select: none;
    
    &:hover {
      .interactive-diagram__control-track {
        background: rgba(248, 250, 252, 0.8);
      }
      
      .interactive-diagram__control-thumb {
        background: rgba(255, 255, 255, 0.25);
        box-shadow: 0 0 15px rgba(248, 250, 252, 0.5);
      }
    }
    
    &.is-active {
      .interactive-diagram__control-track {
        background: rgba(248, 250, 252, 0.9);
      }
      
      .interactive-diagram__control-thumb {
        background: rgba(255, 255, 255, 0.35);
        box-shadow: 
          0 0 20px rgba(248, 250, 252, 0.6),
          0 0 30px rgba(248, 250, 252, 0.3);
      }
    }
    
    &.is-dragging {
      .interactive-diagram__control-track {
        background: rgba(248, 250, 252, 0.95);
      }
      
      .interactive-diagram__control-thumb {
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 
          0 0 25px rgba(248, 250, 252, 0.7),
          0 0 40px rgba(248, 250, 252, 0.4);
        transform: translateY(-50%) translateX(-50%) scale(1.2);
      }
    }
  }

  &__control-track {
    width: 227px;
    height: 1px;
    background: rgba(248, 250, 252, 0.7);
    position: relative;
    flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    @media (min-width: 640px) {
      width: 240px;
    }
    
    @media (min-width: 1024px) {
      width: 260px;
    }
    
    .interactive-diagram__control-item:hover & {
      background: rgba(248, 250, 252, 0.8);
    }
    
    .interactive-diagram__control-item.is-active &,
    .interactive-diagram__control-item.is-dragging & {
      background: rgba(248, 250, 252, 0.9);
    }
  }

  &__control-thumb {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 24px;
    height: 14px;
    border-radius: 7px;
    background: var(--color-glass-secondary);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 
      0px 2px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: left 0.05s linear;
    cursor: grab;
    user-select: none;
    z-index: 100;
    
    &:active {
      cursor: grabbing;
      transition: none;
    }
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 7px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      opacity: 0.8;
      z-index: 1;
    }
    
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 36px;
      height: 4px;
      background: var(--color-background-secondary);
      z-index: 0;
      border-radius: 2px;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
    }
  }

  &__footer-text {
    font-family: 'Courier New', 'Monaco', 'Menlo', monospace;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    @media (min-width: 640px) {
      font-size: 16px;
    }
  }

  &__3d-object {
    position: absolute;
    width: 200px;
    height: 200px;
    bottom: 12%;
    right: 6%;
    perspective: 1000px;
    transition: all 0.3s ease;
    will-change: transform, filter;
    
    @media (min-width: 1024px) {
      width: 300px;
      height: 300px;
      bottom: 10%;
      right: 3%;
    }
    
    @media (max-height: 700px) {
      width: 150px;
      height: 150px;
      bottom: 8%;
      right: 5%;
      
      @media (min-width: 1024px) {
        width: 200px;
        height: 200px;
        bottom: 6%;
        right: 3%;
      }
    }
    
    @media (max-height: 600px) {
      width: 120px;
      height: 120px;
      bottom: 5%;
      right: 4%;
      
      @media (min-width: 1024px) {
        width: 150px;
        height: 150px;
        bottom: 4%;
        right: 2%;
      }
    }
    
    @media (max-height: 700px) {
      width: 150px;
      height: 150px;
      bottom: 8%;
      right: 5%;
      
      @media (min-width: 1024px) {
        width: 200px;
        height: 200px;
        bottom: 6%;
        right: 3%;
      }
    }
    
    @media (max-height: 600px) {
      width: 120px;
      height: 120px;
      bottom: 5%;
      right: 4%;
      
      @media (min-width: 1024px) {
        width: 150px;
        height: 150px;
        bottom: 4%;
        right: 2%;
      }
    }
  }

  &__sphere-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 30px rgba(124, 58, 237, 0.6)) drop-shadow(0 0 60px rgba(34, 211, 238, 0.4));
    animation: floatSphere 6s ease-in-out infinite;
    transition: transform 0.3s ease, filter 0.3s ease;
  }

  @keyframes floatSphere {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(5deg);
    }
  }

  &__controls {
    display: flex;
    gap: 16px;
    padding: 16px 24px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--color-glass-secondary);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px;
      width: calc(100% - 32px);
      max-width: 300px;
    }
  }

  &__control {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 120px;
    
    @media (max-width: 640px) {
      min-width: 200px;
    }
  }

  &__control-label {
    font-family: var(--font-family-base);
    font-size: 12px;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }

  &__slider {
    width: 100%;
    height: 6px;
    background: var(--color-glass-secondary);
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    transition: background 0.3s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 
        0 0 10px var(--color-accent-primary),
        0 0 20px var(--color-accent-secondary);
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.3);
        box-shadow: 
          0 0 15px var(--color-accent-primary),
          0 0 30px var(--color-accent-secondary);
      }
      
      &:active {
        transform: scale(1.1);
      }
    }
    
    &::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-secondary));
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 
        0 0 10px var(--color-accent-primary),
        0 0 20px var(--color-accent-secondary);
      transition: all 0.2s ease;
      
      &:hover {
        transform: scale(1.3);
        box-shadow: 
          0 0 15px var(--color-accent-primary),
          0 0 30px var(--color-accent-secondary);
      }
      
      &:active {
        transform: scale(1.1);
      }
    }
    
    &::-webkit-slider-runnable-track {
      height: 6px;
      background: var(--color-glass-secondary);
      border-radius: 3px;
    }
    
    &::-moz-range-track {
      height: 6px;
      background: var(--color-glass-secondary);
      border-radius: 3px;
    }
  }
  
}
</style>
