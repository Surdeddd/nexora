<template>
    <section ref="section" class="services">
      <div class="services__container">
        <h2 ref="title" class="services__title">УСЛУГИ</h2>
  
        <div ref="list" class="services__list">
          <div
            v-for="(service, i) in services"
            :key="service.id"
            :ref="el => setItemRef(el, i)"
            class="services__item"
            :class="{
              'services__item--blue': service.highlight === 'blue',
              'services__item--purple': service.highlight === 'purple',
            }"
            @mouseenter="handleItemEnter(i)"
            @click="handleServiceClick(service.slug, i)"
          >
            <span class="services__number">{{ service.number }}</span>
            <span class="services__text">{{ service.text }}</span>
          </div>
        </div>
      </div>
    </section>
  </template>
  <script setup lang="ts">
    import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
    
    const router = useRouter()
    
    const section = ref<HTMLElement | null>(null)
    const list = ref<HTMLElement | null>(null)
    const title = ref<HTMLElement | null>(null)
    
    const items = ref<HTMLElement[]>([])
    const revealedItems = ref<Set<number>>(new Set())
    
    const setItemRef = (el: any, i: number) => {
      if (el) {
        const element = (el as any).$el || el
        if (element instanceof HTMLElement) {
          items.value[i] = element
        }
      }
    }
    
    import { servicesData } from '~/constants/services'
    
    const services = servicesData
    
    let ctx: any
    
    const handleItemEnter = async (index: number) => {
      const item = items.value[index]
      if (!item || revealedItems.value.has(index)) return
      
      const { gsap } = await import('gsap')
      const textEl = item.querySelector('.services__text') as HTMLElement
      
      if (textEl) {
        revealedItems.value.add(index)
        gsap.to(textEl, {
          filter: 'blur(0px)',
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }
    
    const handleServiceClick = async (slug: string, index: number) => {
      const item = items.value[index]
      if (!item) return
      
      const { gsap } = await import('gsap')
      
      const overlay = document.createElement('div')
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--color-background-primary);
        z-index: 9999;
        opacity: 0;
        pointer-events: none;
      `
      document.body.appendChild(overlay)
      
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(`/services/${slug}`).then(() => {
            setTimeout(() => {
              if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay)
              }
            }, 100)
          })
        },
      })
      
      tl.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      })
        .to(
          item,
          {
            scale: 1.15,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          '-=0.2'
        )
    }
    
    onMounted(async () => {
      await nextTick()
    
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
    
      if (!section.value) return
      
      ctx = gsap.context(() => {
        gsap.from(title.value, {
          opacity: 0,
          y: -40,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title.value,
            start: 'top 80%',
          },
        })
    
        const cols =
          window.innerWidth >= 1024 ? 3 :
          window.innerWidth >= 640 ? 2 : 1
    
        const gapX = 24
        const gapY = 28
        const itemHeight = 44
    
        const containerWidth = list.value!.clientWidth
        const colWidth =
          (containerWidth - gapX * (cols - 1)) / cols
    
        items.value.forEach((el, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
    
          const targetX = col * (colWidth + gapX)
          const targetY = row * (itemHeight + gapY)
    
          const startX =
            (Math.random() - 0.5) * containerWidth * 1.2
          const startY =
            (Math.random() - 0.5) * 600
          const rot = (Math.random() - 0.5) * 30
          const scale = 0.7 + Math.random() * 0.3
    
          gsap.set(el, {
            x: startX,
            y: startY,
            rotation: rot,
            scale,
            opacity: 0.5,
            filter: 'blur(2px)',
          })
          
          const textEl = el.querySelector('.services__text') as HTMLElement
          if (textEl) {
            gsap.set(textEl, {
              filter: 'blur(4px)',
              opacity: 0.8,
            })
          }
    
          const delay = i * 0.02
          
          gsap.to(el, {
            x: targetX,
            y: targetY,
            rotation: 0,
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: list.value,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 0.5,
            },
            delay,
          })
        })
      }, section.value)
    })
    
    onUnmounted(() => {
      ctx?.revert()
    })
    </script>
    <style scoped lang="scss">
    .services {
        min-height: 100vh;
        padding: 200px 16px 40px;
        background: var(--color-background-primary);
        scroll-snap-align: start;
        scroll-snap-stop: always;
      
        @media (min-width: 640px) {
          padding: 240px 24px 50px;
        }
      
        @media (min-width: 1024px) {
          padding: 280px 32px 60px;
        }
      
        &__container {
          max-width: 1400px;
          margin: 0 auto;
        }
      
        &__title {
          font-family: var(--font-family-brand);
          font-size: clamp(36px, 8vw, 112px);
          letter-spacing: 0.12em;
          text-align: center;
          margin-bottom: 60px;
      
          @media (min-width: 640px) {
            margin-bottom: 80px;
            font-size: clamp(48px, 9vw, 96px);
          }
      
          @media (min-width: 1024px) {
            margin-bottom: 100px;
            font-size: clamp(64px, 10vw, 112px);
          }
      
          color: transparent;
          -webkit-text-stroke: 2px var(--color-accent-primary);
          text-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
        }
      
        &__list {
          position: relative;
          height: 600px;
          min-height: 500px;
      
          @media (min-width: 640px) {
            height: 650px;
            min-height: 550px;
          }
      
          @media (min-width: 1024px) {
            height: 700px;
            min-height: 600px;
          }
        }
      
          &__item {
          position: absolute;
          display: flex;
          gap: 12px;
          font-family: monospace;
          font-size: 14px;
          color: var(--color-text-primary);
          will-change: transform;
          pointer-events: auto;
          cursor: pointer;
      
          @media (min-width: 640px) {
            font-size: 16px;
            gap: 14px;
          }
      
          @media (min-width: 1024px) {
            font-size: 18px;
            gap: 16px;
          }
      
          &--blue {
            color: var(--color-accent-secondary);
          }
      
          &--purple {
            color: var(--color-accent-primary);
          }
        }
      
        &__number {
          opacity: 0.6;
          min-width: 48px;
      
          @media (min-width: 640px) {
            min-width: 56px;
          }
      
          @media (min-width: 1024px) {
            min-width: 64px;
          }
        }
        
        &__text {
          will-change: filter, opacity;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
      }
    </style>