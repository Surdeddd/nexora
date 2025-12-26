<template>
  <section ref="sectionRef" class="video-section" data-scroll-section aria-label="Видео секция">
    <div class="video-section__container">
      <div class="video-section__overlay" aria-hidden="true"></div>
      <video
        ref="videoRef"
        class="video-section__video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        aria-label="Демонстрационное видео nexora"
      >
        <source src="/video/falling-flower.mp4" type="video/mp4" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const videoRef = ref<HTMLVideoElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)

let scrollTriggerInstances: any[] = []

onMounted(async () => {
  if (!sectionRef.value || !videoRef.value) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')

  gsap.registerPlugin(ScrollTrigger)

  
  const isMobile = window.innerWidth <= 768
  const isSmallMobile = window.innerWidth <= 480
  const baseScale = isSmallMobile ? 1.25 : isMobile ? 1.2 : 1.15

  
  gsap.set(videoRef.value, {
    opacity: 0,
    scale: baseScale * 1.05, 
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
  })

  
  const fadeInTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    onEnter: () => {
      if (videoRef.value) {
        videoRef.value.play().catch(() => {})
      }
      gsap.to(videoRef.value, {
        opacity: 1,
        scale: baseScale,
        duration: 0.5, 
        ease: 'power2.out',
      })
    },
    once: true,
  })
  scrollTriggerInstances.push(fadeInTrigger)

  
  const parallaxTrigger = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress
      
      const parallaxY = (progress - 0.5) * 25 
      
      gsap.set(videoRef.value, {
        y: parallaxY,
        scale: baseScale,
      })
    },
  })
  scrollTriggerInstances.push(parallaxTrigger)
})

onBeforeUnmount(() => {
  
  scrollTriggerInstances.forEach((trigger) => {
    if (trigger) {
      trigger.kill()
    }
  })
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
  will-change: transform;
}

.video-section__container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-section__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
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
  will-change: transform, opacity;
  
}
</style>
