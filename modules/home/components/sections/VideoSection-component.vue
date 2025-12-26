<template>
  <section
    ref="sectionRef"
    class="video-section"
    data-scroll-section
    aria-label="Видео секция"
  >
    <div class="video-section__container">
      <!-- overlay используется для fade-in вместо opacity у video -->
      <div
        ref="overlayRef"
        class="video-section__overlay"
        aria-hidden="true"
      ></div>

      <video
        ref="videoRef"
        class="video-section__video"
        :src="videoSrc"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-label="Демонстрационное видео nexora"
      ></video>
    </div>
  </section>
</template>

<script setup lang="ts">
import videoSrc from '@/assets/video/falling-flower.mp4'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)

let scrollTriggerInstances: any[] = []

onMounted(async () => {
  if (!sectionRef.value || !videoRef.value) return

  const video = videoRef.value

  /**
   * ⚠️ КРИТИЧНО ДЛЯ MOBILE
   * Инициализация видео ДО любых анимаций
   */
  video.muted = true
  video.playsInline = true
  video.setAttribute('playsinline', 'true')

  // Стартуем видео сразу (ScrollTrigger не считается user-gesture)
  video.play().catch(() => {
    // нормально для mobile — браузер может отложить старт
  })

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const isMobile = window.innerWidth <= 768
  const isSmallMobile = window.innerWidth <= 480
  const baseScale = isSmallMobile ? 1.25 : isMobile ? 1.2 : 1.15

  /**
   * ❗ НИКОГДА не ставим opacity: 0 на video
   * Анимируем ТОЛЬКО transform
   */
  gsap.set(video, {
    scale: baseScale * 1.05,
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
  })

  // overlay изначально затемняет видео
  if (overlayRef.value) {
    gsap.set(overlayRef.value, { opacity: 1 })
  }

  /**
   * Fade-in секции
   */
  const fadeInTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      gsap.to(video, {
        scale: baseScale,
        duration: 0.6,
        ease: 'power2.out',
      })

      if (overlayRef.value) {
        gsap.to(overlayRef.value, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    },
  })
  scrollTriggerInstances.push(fadeInTrigger)

  /**
   * Параллакс (без opacity)
   */
  const parallaxTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress
      const parallaxY = (progress - 0.5) * 25

      gsap.set(video, {
        y: parallaxY,
        scale: baseScale,
      })
    },
  })
  scrollTriggerInstances.push(parallaxTrigger)
})

onBeforeUnmount(() => {
  scrollTriggerInstances.forEach((trigger) => trigger?.kill())
  scrollTriggerInstances = []
})
</script>

<style scoped lang="scss">
.video-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var(--color-background-primary);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.video-section__container {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.video-section__overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 20%,
    rgba(0, 0, 0, 0.2) 80%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.video-section__video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  object-position: center;

  /* страховка против mobile-багов */
  opacity: 1 !important;
  visibility: visible !important;
  display: block !important;
}
</style>