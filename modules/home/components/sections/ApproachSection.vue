<template>
  <section ref="section" class="approach-section h-screen relative py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24 lg:px-12">
    <CustomCursorComponent v-if="section" :container="section" />
    <div class="approach-section__container max-w-[1400px] mx-auto">
      
      
      <div ref="topSection" class="approach-section__top mb-16 sm:mb-20 md:mb-24 lg:mb-32 relative">
        
        <h2 ref="topTitle" class="approach-section__title approach-section__title--top text-white mb-4 sm:mb-5 md:mb-6 whitespace-nowrap overflow-hidden">
          ПОДХОД К РАЗРАБОТКЕ САЙТОВ
        </h2>
        
        
        <div class="approach-section__content-wrapper relative">
          
          <div class="approach-section__panel-wrapper approach-section__panel-wrapper--left relative z-10 lg:max-w-[600px] xl:max-w-[700px]">
            <LiquidGlassComponent class="approach-section__text-block w-full">
              <div ref="topText" class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <p class="text-secondary text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                  Мы специализируемся на разработке цифровых продуктов, ориентированных на результат.
                  Объединяем дизайн, разработку и техническую экспертизу, чтобы создавать сайты и сервисы,
                  которые действительно работают.
                  Каждый проект начинается с анализа целей и задач клиента. Это позволяет нам предлагать
                  оптимальные решения и выстраивать долгосрочное сотрудничество.
                </p>
              </div>
            </LiquidGlassComponent>
          </div>
          
          
          <div ref="topBulb" class="approach-section__bulb absolute right-0 top-1/2 transform -translate-y-1/2 z-20">
            <div class="bulb-icon relative">
              
              <div class="bulb-icon__glow absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-accent-secondary)] to-[var(--color-accent-primary)] opacity-30 blur-2xl"></div>
              
              <img
                src="@/assets/img/bulb.png"
                alt="Лампочка - символ идей и инноваций nexora"
                class="bulb-icon__image w-full h-full object-contain"
                loading="lazy"
                fetchpriority="low"
              />
            </div>
          </div>
        </div>
      </div>

      
      <div ref="bottomSection" class="approach-section__bottom relative">
        
        <h2 ref="bottomTitle" class="approach-section__title approach-section__title--bottom text-white mb-4 sm:mb-5 md:mb-6 text-right whitespace-nowrap overflow-hidden">
          <span class="normal">ЦИФРО</span><span class="styled">вая</span> команда <span class="styled">полноГО</span> <span class="normal">Цикла</span>
        </h2>
        
        
        <div class="approach-section__panel-wrapper approach-section__panel-wrapper--right flex justify-end">
          <LiquidGlassComponent class="approach-section__text-block lg:max-w-[600px] xl:max-w-[700px] w-full">
            <div ref="bottomText" class="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
              <p class="text-secondary text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Мы рассматриваем разработку сайтов как процесс создания цифровой системы, а не отдельного
                экрана или страницы. В работе уделяем внимание архитектуре проекта, пользовательскому опыту,
                производительности и дальнейшему развитию продукта.
                Наш подход позволяет создавать сайты, которые легко масштабируются, быстро загружаются и
                остаются удобными при росте функциональности и аудитории.
              </p>
            </div>
          </LiquidGlassComponent>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CustomCursorComponent from '~/components/CustomCursor-component.vue'
import LiquidGlassComponent from '~/components/LiquidGlass-component.vue'

const section = ref<HTMLElement | null>(null)
const topTitle = ref<HTMLElement | null>(null)
const topText = ref<HTMLElement | null>(null)
const topBulb = ref<HTMLElement | null>(null)
const bottomTitle = ref<HTMLElement | null>(null)
const bottomText = ref<HTMLElement | null>(null)

let scrollTriggers: any[] = []
let bulbImage: HTMLElement | null = null
let bulbMouseMoveHandler: ((e: MouseEvent) => void) | null = null
function adjustTitleFontSize(titleElement: HTMLElement | null) {
  if (!titleElement) return

  const maxWidth = titleElement.parentElement?.clientWidth || window.innerWidth
  const titleWidth = titleElement.scrollWidth
  const currentFontSize = parseFloat(getComputedStyle(titleElement).fontSize)

  
  if (titleWidth > maxWidth * 0.9 && currentFontSize > 24) {
    const newFontSize = Math.max(24, currentFontSize * 0.9)
    titleElement.style.fontSize = `${newFontSize}px`
    
    
    setTimeout(() => {
      if (titleElement.scrollWidth > maxWidth * 0.9 && newFontSize > 24) {
        adjustTitleFontSize(titleElement)
      }
    }, 100)
  }
}

onMounted(async () => {
  if (!section.value) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  
  setTimeout(() => {
    adjustTitleFontSize(topTitle.value)
    adjustTitleFontSize(bottomTitle.value)
  }, 100)

  
  if (topTitle.value) {
    gsap.set(topTitle.value, { opacity: 0, y: -30 })
  }
  if (topText.value) {
    gsap.set(topText.value, { opacity: 0, x: -50 })
  }
  if (topBulb.value) {
    gsap.set(topBulb.value, { opacity: 0, scale: 0.5, rotation: -180 })
  }
  if (bottomTitle.value) {
    gsap.set(bottomTitle.value, { opacity: 0, y: -30 })
  }
  if (bottomText.value) {
    gsap.set(bottomText.value, { opacity: 0, y: 50 })
  }
  
  
  bulbImage = topBulb.value?.querySelector('.bulb-icon__image') as HTMLElement
  if (bulbImage && section.value) {
    bulbMouseMoveHandler = (e: MouseEvent) => {
      if (!section.value || !bulbImage) return
      
      const rect = section.value.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15
      
      bulbImage.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(15px)`
    }
    
    section.value.addEventListener('mousemove', bulbMouseMoveHandler)
  }

  
  if (topTitle.value) {
    scrollTriggers.push(
      gsap.to(topTitle.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: topTitle.value,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      })
    )
  }

  
  if (topText.value) {
    scrollTriggers.push(
      gsap.to(topText.value, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: topText.value,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      })
    )
  }

  
  if (topBulb.value) {
    scrollTriggers.push(
      gsap.to(topBulb.value, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: topBulb.value,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      })
    )

    
    
  }

  
  if (bottomTitle.value) {
    scrollTriggers.push(
      gsap.to(bottomTitle.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bottomTitle.value,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      })
    )
  }

  
  if (bottomText.value) {
    scrollTriggers.push(
      gsap.to(bottomText.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bottomText.value,
          start: 'top 95%',
          end: 'top 60%',
          toggleActions: 'play none none none',
        },
      })
    )
  }
})

onUnmounted(() => {
  scrollTriggers.forEach((trigger) => {
    if (trigger && trigger.scrollTrigger) {
      trigger.scrollTrigger.kill()
    }
    if (trigger && trigger.kill) {
      trigger.kill()
    }
  })
  scrollTriggers = []
  
  
  if (bulbMouseMoveHandler && section.value) {
    section.value.removeEventListener('mousemove', bulbMouseMoveHandler)
  }
})
</script>

<style scoped lang="scss">
.approach-section {
  background: var(--color-background-secondary);
  min-width: 320px;
  cursor: none; 
  scroll-snap-align: start;
  scroll-snap-stop: always;

  &__container {
    width: 100%;
  }

  &__title {
    font-family: var(--font-family-brand);
    font-size: 20px;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: 0.02em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 360px) {
      font-size: 24px;
    }

    @media (min-width: 480px) {
      font-size: 28px;
    }

    @media (min-width: 640px) {
      font-size: 38px;
    }

    @media (min-width: 768px) {
      font-size: 48px;
    }

    @media (min-width: 1024px) {
      font-size: 58px;
    }

    @media (min-width: 1280px) {
      font-size: 68px;
    }

    @media (min-width: 1536px) {
      font-size: 78px;
    }

    &--top {
      text-align: left;
    }

    &--bottom {
      text-align: right;

      .styled {
        color: inherit;
        font-family: var(--font-family-brand);
      }
    }
  }

  &__panel-wrapper {
    width: 100%;
    
    @media (min-width: 1024px) {
      width: auto;
    }
  }

  &__text-block {
    transition: all 0.3s ease;
  }

  &__bulb {
    position: absolute;
    left: 580px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 20;
    
    @media (max-width: 1024px) {
      left: auto;
      right: 0;
    }
  }

  &__content-wrapper {
    position: relative;
    min-height: 150px;
    padding-right: 0;
    
    @media (min-width: 480px) {
      min-height: 180px;
      padding-right: 40px;
    }
    
    @media (min-width: 640px) {
      min-height: 200px;
      padding-right: 80px;
    }
    
    @media (min-width: 1024px) {
      min-height: 300px;
      padding-right: 100px;
    }
    
    @media (min-width: 1280px) {
      padding-right: 140px;
    }
  }
}

.text-secondary {
  color: var(--color-text-secondary);
}

.bulb-icon {
  position: relative;
  filter: drop-shadow(0 0 20px rgba(34, 211, 238, 0.5));
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.1s ease-out;

  &__glow {
    animation: pulse 2s ease-in-out infinite;
  }

  &__image {
    filter: 
      drop-shadow(0 15px 30px rgba(124, 58, 237, 0.5))
      drop-shadow(0 30px 60px rgba(34, 211, 238, 0.4))
      drop-shadow(0 0 20px rgba(124, 58, 237, 0.6));
    position: relative;
    z-index: 1;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
    will-change: transform;
  }
}
.approach-section__bulb .bulb-icon {
  width: 80px;
  height: 80px;

  @media (min-width: 360px) {
    width: 96px;
    height: 96px;
  }

  @media (min-width: 480px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 640px) {
    width: 160px;
    height: 160px;
  }

  @media (min-width: 768px) {
    width: 192px;
    height: 192px;
  }

  @media (min-width: 1024px) {
    width: 224px;
    height: 224px;
  }

  @media (min-width: 1280px) {
    width: 256px;
    height: 256px;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}
@media (max-width: 1024px) {
  .approach-section {
    &__title {
      white-space: normal !important;
      overflow: visible !important;
      text-overflow: clip !important;
      
      &--bottom {
        text-align: left;
      }
    }

    &__panel-wrapper {
      &--right {
        justify-content: flex-start !important;
      }
    }

    &__content-wrapper {
      padding-right: 0 !important;
    }

    &__bulb {
      position: relative !important;
      right: auto !important;
      left: auto !important;
      top: auto !important;
      transform: none !important;
      margin-top: var(--spacing-xl);
      display: flex;
      justify-content: center !important;
    }
  }
}
@media (max-width: 768px) {
  .approach-section {
    padding-top: var(--spacing-2xl);
    padding-bottom: var(--spacing-2xl);
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);

    &__top {
      margin-bottom: var(--spacing-2xl);
    }

    &__title {
      margin-bottom: 1rem !important;
    }

    &__text-block {
      :deep(.p-6) {
        padding: var(--spacing-md) !important;
      }
    }
  }
}

@media (max-width: 480px) {
  .approach-section {
    padding-top: var(--spacing-xl);
    padding-bottom: var(--spacing-xl);
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    &__top {
      margin-bottom: var(--spacing-xl);
    }

    &__title {
      margin-bottom: 0.75rem !important;
    }
  }
}

@media (max-width: 360px) {
  .approach-section {
    padding-top: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    padding-left: var(--spacing-sm);
    padding-right: var(--spacing-sm);

    &__top {
      margin-bottom: var(--spacing-lg);
    }

    &__title {
      margin-bottom: var(--spacing-sm) !important;
    }
  }
}
</style>
