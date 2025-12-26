<template>
    <section ref="section" class="development-directions relative py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:py-10 lg:mx-4 min-h-screen flex flex-col justify-center">
      <div ref="switcher" class="development-directions__switcher flex justify-center mb-4 sm:mb-6 md:mb-8">
        <LiquidGlassComponent class="w-full w-[95%] sm:w-[90%] max-w-[1500px]">
          <div
            ref="track"
            class="glass-switcher w-full relative flex items-center justify-center h-[48px] sm:h-[56px] md:h-[64px] lg:h-[72px]"
          >
            <div ref="title" class="glass-switcher__title relative w-full h-full flex items-center justify-center pointer-events-none px-[50px] sm:px-[60px] md:px-[70px] lg:px-[80px]">
              <span
                class="glass-switcher__title-text glass-switcher__title-text--old absolute inset-0 flex items-center justify-center"
                :style="{ '--p': dragProgress }"
              >
                {{ items[0].title }}
              </span>
              <span
                class="glass-switcher__title-text glass-switcher__title-text--new absolute inset-0 flex items-center justify-center"
                :style="{ '--p': dragProgress }"
              >
                {{ items[1].title }}
              </span>
            </div>
            <div
              ref="handle"
              class="glass-switcher__handle absolute top-[6px] left-[6px] sm:top-[8px] sm:left-[8px] md:top-[10px] md:left-[10px] w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[48px] md:h-[48px] lg:w-[52px] lg:h-[52px] rounded-full cursor-grab"
              :style="{ 
                '--p': dragProgress,
                '--handle-color': handleColor,
                '--handle-shadow-color': handleShadowColor
              }"
            />
          </div>
        </LiquidGlassComponent>
      </div>
      <div ref="content" class="development-directions__content flex justify-center px-2 sm:px-4">
        <div class="cards relative grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-[1400px] min-h-[240px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] h-auto">
          <div class="card card--old absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 h-full">
            <div
              v-for="(img, index) in items[0].images"
              :key="img"
              class="card__image-wrapper"
              @mouseenter="(e) => handleImageHover(e, 'old', index, true)"
              @mouseleave="(e) => handleImageHover(e, 'old', index, false)"
            >
              <img
                :ref="(el) => setImageRef(el, 'old', index)"
                :src="img"
                :alt="`Пример работы nexora - ${items[0].title}`"
                class="card__image w-full h-full block object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px]"
                loading="lazy"
                fetchpriority="low"
              />
            </div>
          </div>
          <div
            class="card card--new absolute inset-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 h-full"
            :style="{ '--p': dragProgress }"
          >
            <div
              v-for="(img, index) in items[1].images"
              :key="img"
              class="card__image-wrapper"
              @mouseenter="(e) => handleImageHover(e, 'new', index, true)"
              @mouseleave="(e) => handleImageHover(e, 'new', index, false)"
            >
              <img
                :ref="(el) => setImageRef(el, 'new', index)"
                :src="img"
                :alt="`Пример работы nexora - ${items[1].title}`"
                class="card__image w-full h-full block object-cover rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[32px]"
                loading="lazy"
                fetchpriority="low"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import gsap from 'gsap'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import LiquidGlassComponent from '~/components/LiquidGlass-component.vue'
import { getCssVar } from '~/utils/getCssVar.utils'
  
  import webBackendInfra from '@/modules/home/assets/images/domains/web-backend-infrastructure.png'
import webInterfacesUi from '@/modules/home/assets/images/domains/web-interfaces-ui.png'
import webSystemsDesktop from '@/modules/home/assets/images/domains/web-systems-desktop.png'
import webSystemsMobile from '@/modules/home/assets/images/domains/web-systems-mobile.png'
  
  const items = [
    {
      id: 'web-systems',
      title: 'Веб-системы',
      images: [webSystemsDesktop, webSystemsMobile],
    },
    {
      id: 'interfaces',
      title: 'Интерфейсы',
      images: [webInterfacesUi, webBackendInfra],
    },
  ]
  
  const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const getColorValue = (color: string): string => {
    if (color.startsWith('var(')) {
      const varName = color.match(/var\(([^)]+)\)/)?.[1]?.trim()
      if (varName) {
        const cssVarName = varName.startsWith('--') ? varName : `--${varName}`
        return getCssVar(cssVarName as `--${string}`)
      }
    }
    return color
  }
  
  const hex1 = getColorValue(color1).replace('#', '')
  const hex2 = getColorValue(color2).replace('#', '')
    
    const r1 = parseInt(hex1.substring(0, 2), 16)
    const g1 = parseInt(hex1.substring(2, 4), 16)
    const b1 = parseInt(hex1.substring(4, 6), 16)
    
    const r2 = parseInt(hex2.substring(0, 2), 16)
    const g2 = parseInt(hex2.substring(2, 4), 16)
    const b2 = parseInt(hex2.substring(4, 6), 16)
    
    const r = Math.round(r1 + (r2 - r1) * factor)
    const g = Math.round(g1 + (g2 - g1) * factor)
    const b = Math.round(b1 + (b2 - b1) * factor)
    
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`
  }
  
  const dragProgress = ref(0)
  
  const section = ref<HTMLElement | null>(null)
  const switcher = ref<HTMLElement | null>(null)
  const title = ref<HTMLElement | null>(null)
  const content = ref<HTMLElement | null>(null)
  const track = ref<HTMLElement | null>(null)
  const handle = ref<HTMLElement | null>(null)
  
  const oldImages = ref<(HTMLElement | null)[]>([])
  const newImages = ref<(HTMLElement | null)[]>([])
  
  let draggableInstance: any = null
  let resizeHandler: (() => void) | null = null
  let observer: IntersectionObserver | null = null
  let hasAnimated = false
  
  const setImageRef = (el: any, type: 'old' | 'new', index: number) => {
    if (el) {
      if (type === 'old') {
        oldImages.value[index] = el
      } else {
        newImages.value[index] = el
      }
    }
  }

  const handleImageHover = (_e: MouseEvent, type: 'old' | 'new', index: number, isEntering: boolean) => {
    const image = type === 'old' ? oldImages.value[index] : newImages.value[index]
    if (!image) return

    if (isEntering) {
      gsap.to(image, {
        scale: 1.03,
        y: -4,
        duration: 0.5,
        ease: 'power2.out',
      })
      
      gsap.to(image, {
        filter: 'brightness(1.08)',
        boxShadow: '0 20px 40px rgba(124, 58, 237, 0.3), 0 0 30px rgba(34, 211, 238, 0.2)',
        duration: 0.5,
        ease: 'power2.out',
      })
    } else {
      gsap.to(image, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      })
      
      const shadowValue = window.innerWidth >= 1024 
        ? '0 30px 60px rgba(0, 0, 0, 0.6)'
        : window.innerWidth >= 640
        ? '0 20px 40px rgba(0, 0, 0, 0.5)'
        : '0 12px 24px rgba(0, 0, 0, 0.4)'
      
      gsap.to(image, {
        filter: 'brightness(1)',
        boxShadow: shadowValue,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  const handleColor = computed(() => {
  return interpolateColor('var(--color-accent-primary)', 'var(--color-accent-secondary)', dragProgress.value)
  })
  
  const handleShadowColor = computed(() => {
    const color = handleColor.value
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, 0.6)`
  })
  
  const playAnimations = () => {
    if (hasAnimated) return
    hasAnimated = true
    
    if (switcher.value && title.value && handle.value) {
      gsap.to(switcher.value, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1,
      })
      
      gsap.to(title.value, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      })
      
      gsap.to(handle.value, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'back.out(1.7)',
        delay: 0.3,
      })
    }
    
    if (content.value) {
      gsap.to(content.value, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.5,
        onComplete: () => {
          oldImages.value.forEach((img, index) => {
            if (img) {
              gsap.fromTo(
                img,
                { opacity: 0, y: 60, scale: 0.9 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: 'power3.out',
                  delay: index * 0.1,
                }
              )
            }
          })
          
          newImages.value.forEach((img, index) => {
            if (img) {
              gsap.fromTo(
                img,
                { opacity: 0, y: 60, scale: 0.9 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.5,
                  ease: 'power3.out',
                  delay: 0.1 + index * 0.1,
                }
              )
            }
          })
        },
      })
    }
  }
  
  onMounted(async () => {
    if (switcher.value && title.value && handle.value) {
      gsap.set(switcher.value, { opacity: 0, y: -30 })
      gsap.set(title.value, { opacity: 0 })
      gsap.set(handle.value, { opacity: 0, scale: 0 })
    }
    
    if (content.value) {
      gsap.set(content.value, { opacity: 0, y: 40 })
    }
    
    oldImages.value.forEach((img) => {
      if (img) {
        gsap.set(img, { opacity: 0, y: 60, scale: 0.9 })
      }
    })
    
    newImages.value.forEach((img) => {
      if (img) {
        gsap.set(img, { opacity: 0, y: 60, scale: 0.9 })
      }
    })
    
    if (section.value) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              playAnimations()
            }
          })
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -100px 0px',
        }
      )
      
      observer.observe(section.value)
    }
    
    if (!track.value || !handle.value) return
  
  // @ts-ignore - GSAP Draggable import case sensitivity issue
    const Draggable = (await import('gsap/Draggable')).default
    gsap.registerPlugin(Draggable)
  
    const updateBounds = (): number => {
      if (!track.value || !handle.value) return 0
      
      const trackWidth = track.value.clientWidth
      const handleWidth = handle.value.clientWidth
      const maxX = Math.max(0, trackWidth - (handleWidth+20))
      
      return maxX
    }
  
    const maxX = updateBounds()
    if (maxX <= 0) return
    
    gsap.set(handle.value, { x: 0, force3D: true })
  
    draggableInstance = Draggable.create(handle.value, {
      type: 'x',
      bounds: { minX: 0, maxX },
      inertia: true,
      force3D: true,
      immediateRender: true,
  
      onDrag() {
        const currentMaxX = updateBounds()
        if (currentMaxX <= 0) return
        const clampedX = gsap.utils.clamp(0, currentMaxX, this.x)
        const p = gsap.utils.clamp(0, 1, clampedX / currentMaxX)
        dragProgress.value = p
      },
  
      onThrowUpdate() {
        const currentMaxX = updateBounds()
        if (currentMaxX <= 0) return
        const clampedX = gsap.utils.clamp(0, currentMaxX, this.x)
        const p = gsap.utils.clamp(0, 1, clampedX / currentMaxX)
        dragProgress.value = p
      },
  
      onDragEnd() {
        const currentMaxX = updateBounds()
        if (currentMaxX <= 0) return
        const targetIndex = dragProgress.value > 0.5 ? 1 : 0
  
        gsap.to(this.target, {
          x: targetIndex === 1 ? currentMaxX : 0,
          duration: 0.5,
          ease: 'power3.out',
        })
  
        gsap.to(dragProgress, {
          value: targetIndex,
          duration: 0.5,
          ease: 'power3.out',
        })
      },
    })
  
    resizeHandler = () => {
      if (draggableInstance && draggableInstance[0]) {
        const newMaxX = updateBounds()
        if (newMaxX > 0) {
          draggableInstance[0].update()
          draggableInstance[0].applyBounds({ minX: 0, maxX: newMaxX })
        }
      }
    }
  
    window.addEventListener('resize', resizeHandler)
  })
  
  onUnmounted(() => {
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
    }
    if (draggableInstance && draggableInstance[0]) {
      draggableInstance[0].kill()
    }
    if (observer && section.value) {
      observer.unobserve(section.value)
      observer.disconnect()
    }
  })
  </script>
  
  <style scoped lang="scss">
  .development-directions {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
  
  .glass-switcher {
    &__title {
      font-family: var(--font-family-brand);
      font-size: 24px;
      line-height: 1;

      @media (min-width: 640px) {
        font-size: 36px;
      }

      @media (min-width: 768px) {
        font-size: 48px;
      }

      @media (min-width: 1024px) {
        font-size: 62px;
      }
    }

    &__title-text {
      background: linear-gradient(
        90deg,
        var(--color-accent-primary),
        var(--color-accent-secondary)
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;

      &--old {
        clip-path: inset(0 0 0 calc(var(--p) * 100%));
      }

      &--new {
        clip-path: inset(0 calc(100% - (var(--p) * 100%)) 0 0);
      }
    }

    &__handle {
      background: radial-gradient(
        circle at 30% 30%,
        var(--handle-color, var(--color-accent-primary)),
        var(--handle-color, var(--color-accent-primary))
      );
      box-shadow:
        0 0 12px var(--handle-shadow-color, rgba(124, 58, 237, 0.6)),
        0 8px 20px var(--handle-shadow-color, rgba(124, 58, 237, 0.6));
      transition: background 0.1s ease, box-shadow 0.1s ease;

      @media (min-width: 640px) {
        box-shadow:
          0 0 16px var(--handle-shadow-color, rgba(124, 58, 237, 0.6)),
          0 10px 24px var(--handle-shadow-color, rgba(124, 58, 237, 0.6));
      }

      @media (min-width: 1024px) {
        box-shadow:
          0 0 20px var(--handle-shadow-color, rgba(124, 58, 237, 0.6)),
          0 12px 30px var(--handle-shadow-color, rgba(124, 58, 237, 0.6));
      }
    }
  }

  .cards {
    .card {
      align-items: stretch;
      grid-auto-rows: 1fr;

      &--new {
        clip-path: inset(0 calc(100% - (var(--p) * 100%)) 0 0);
      }

      &__image-wrapper {
        overflow: hidden;
        border-radius: 16px;
        cursor: pointer;
        perspective: 1000px;
        transform-style: preserve-3d;

        @media (min-width: 640px) {
          border-radius: 20px;
        }

        @media (min-width: 768px) {
          border-radius: 24px;
        }

        @media (min-width: 1024px) {
          border-radius: 32px;
        }
      }

      &__image {
        min-height: 0;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        transform-origin: center center;
        will-change: transform, filter, box-shadow;
        backface-visibility: hidden;
        transform-style: preserve-3d;

        @media (min-width: 640px) {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        @media (min-width: 1024px) {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  </style>