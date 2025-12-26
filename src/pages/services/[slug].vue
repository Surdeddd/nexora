<template>
  <ClientOnly>
    <CustomCursorComponent />
    
    <main class="service-page" data-no-snap>
      <button
        ref="backButtonRef"
        @click="handleBack"
        class="service-page__back-button"
        aria-label="Вернуться назад"
      >
        <span class="service-page__back-arrow">←</span>
      </button>

      <div v-if="service" class="service-page__content">
        <div ref="logoRef" class="service-page__logo">
          <BrandMark-component size="lg" align="left" orientation="vertical" />
        </div>

        <div class="service-page__right">
          <h1 ref="titleRef" class="service-page__title">
            {{ service.title }}
          </h1>

          <div ref="descriptionRef" class="service-page__description-wrapper">
            <LiquidGlassComponent class="service-page__description-glass">
              <div class="service-page__description">
                <p class="service-page__description-main">
                  {{ service.description }}
                </p>
                
                <div class="service-page__features">
                  <h2 class="service-page__features-title">Основные возможности</h2>
                  <ul class="service-page__features-list">
                    <li
                      v-for="(feature, index) in service.features"
                      :key="index"
                      class="service-page__feature-item"
                    >
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                
                <div class="service-page__details">
                  <h2 class="service-page__details-title">Подробнее об услуге</h2>
                  <div class="service-page__details-content">
                    <p
                      v-for="(detail, index) in service.details"
                      :key="index"
                      class="service-page__detail-item"
                    >
                      {{ detail }}
                    </p>
                  </div>
                </div>
              </div>
            </LiquidGlassComponent>
          </div>
        </div>

        <div ref="flowerRef" class="service-page__flower">
          <img
            src="@/assets/img/flower-3d.png"
            loading="lazy"
            fetchpriority="low"
            alt="3D цветок - декоративный элемент nexora"
            class="service-page__flower-image"
            aria-hidden="true"
          />
        </div>
      </div>

      <div v-else class="service-page__not-found">
        <h1>Услуга не найдена</h1>
        <NuxtLink to="/" class="service-page__back-link">Вернуться на главную</NuxtLink>
      </div>
    </main>

    <AppFooterComponent />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BrandMarkComponent from '~/components/BrandMark-component.vue'
import CustomCursorComponent from '~/components/CustomCursor-component.vue'
import LiquidGlassComponent from '~/components/LiquidGlass-component.vue'
import { getServiceBySlug, type Service } from '~/constants/services'
import AppFooterComponent from '~/modules/home/components/AppFooter-component.vue'

const route = useRoute()
const router = useRouter()

const service = computed<Service | undefined>(() => {
  const slug = route.params.slug as string
  return getServiceBySlug(slug)
})

const backButtonRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const descriptionRef = ref<HTMLElement | null>(null)
const flowerRef = ref<HTMLElement | null>(null)

const handleBack = () => {
  router.push('/')
}

onMounted(async () => {
  if (!service.value) return

  document.documentElement.classList.add('no-snap')
  document.body.style.scrollSnapType = 'none'

  window.scrollTo({ top: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  await nextTick()
  const { gsap } = await import('gsap')

  if (backButtonRef.value) {
    gsap.from(backButtonRef.value, {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.1,
    })
  }

  if (logoRef.value) {
    gsap.from(logoRef.value, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
    })
  }

  if (titleRef.value) {
    gsap.from(titleRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3,
    })
  }

  if (descriptionRef.value) {
    gsap.from(descriptionRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power2.out',
      delay: 0.5,
    })
  }

  if (flowerRef.value) {
    gsap.from(flowerRef.value, {
      opacity: 0,
      scale: 0.8,
      y: 40,
      duration: 1,
      ease: 'power2.out',
      delay: 0.7,
    })
  }
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('no-snap')
  document.body.style.scrollSnapType = ''
})

useHead({
  title: service.value ? `${service.value.title} - nexora` : 'Услуга не найдена - nexora',
  meta: [
    {
      name: 'description',
      content: service.value?.description || 'Страница услуги nexora',
    },
  ],
})
</script>

<style scoped lang="scss">
.service-page {
  position: relative;
  min-height: 100vh;
  background: var(--color-background-primary);
  padding: 100px 24px 80px;

  @media (min-width: 640px) {
    padding: 120px 32px 100px;
  }

  @media (min-width: 1024px) {
    padding: 140px 48px 120px;
  }
}

.service-page__back-button {
  position: fixed;
  top: 40px;
  left: 40px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(248, 250, 252, 0.1);
  border-radius: 50%;
  color: var(--color-text-primary);
  font-family: var(--font-family-base);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(10px);
  opacity: 0.7;

  @media (min-width: 640px) {
    width: 56px;
    height: 56px;
    top: 48px;
    left: 48px;
  }

  @media (min-width: 1024px) {
    width: 64px;
    height: 64px;
    top: 56px;
    left: 56px;
  }

  &:hover {
    opacity: 1;
    border-color: var(--color-accent-primary);
    background: rgba(124, 58, 237, 0.15);
    transform: translateX(-4px) scale(1.05);
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
  }

  &:active {
    transform: translateX(-2px) scale(0.98);
  }
}

.service-page__back-arrow {
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  transition: transform 0.3s ease;

  .service-page__back-button:hover & {
    transform: translateX(-2px);
  }
}

.service-page__content {
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 400px);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 40px;
  padding: 0 16px;

  @media (min-width: 640px) {
    padding: 0 24px;
    gap: 32px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    gap: 0;
    align-items: start;
    padding: 0 32px;
  }

  @media (min-width: 1280px) {
    padding: 0 48px;
  }

  @media (min-width: 1536px) {
    padding: 0 64px;
  }
}

.service-page__logo {
  grid-column: 1;
  grid-row: 1;
  padding-left: 0;
  margin-bottom: 20px;

  @media (min-width: 640px) {
    padding-left: 16px;
    margin-bottom: 24px;
  }

  @media (min-width: 1024px) {
    grid-row: 1 / -1;
    align-self: start;
    padding-top: 20px;
    padding-left: 24px;
    margin-bottom: 0;
    margin-right: 40px;
  }

  @media (min-width: 1280px) {
    padding-left: 32px;
    margin-right: 60px;
  }

  @media (min-width: 1536px) {
    padding-left: 48px;
    margin-right: 80px;
  }
}

.service-page__right {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: 1024px) {
    grid-column: 2;
    grid-row: 1;
    gap: 50px;
  }
}

.service-page__title {
  font-family: var(--font-family-brand);
  font-size: clamp(32px, 6vw, 64px);
  color: var(--color-text-primary);
  line-height: 1.2;
  letter-spacing: 0.02em;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: clamp(48px, 7vw, 80px);
  }
}

.service-page__description-wrapper {
  max-width: 800px;

  @media (min-width: 1024px) {
    max-width: 900px;
  }
}

.service-page__description-glass {
  width: 100%;
}

.service-page__description {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (min-width: 640px) {
    padding: 40px;
    gap: 40px;
  }

  @media (min-width: 1024px) {
    padding: 48px;
    gap: 48px;
  }
}

.service-page__description-main {
  font-family: var(--font-family-base);
  font-size: 18px;
  line-height: 1.8;
  color: var(--color-text-primary);
  opacity: 0.9;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 22px;
  }
}

.service-page__features,
.service-page__details {
  margin-top: 0;
}

.service-page__features-title,
.service-page__details-title {
  font-family: var(--font-family-brand);
  font-size: clamp(20px, 3vw, 28px);
  color: var(--color-text-primary);
  margin-bottom: 20px;
  letter-spacing: 0.05em;

  @media (min-width: 1024px) {
    margin-bottom: 24px;
  }
}

.service-page__features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: 640px) {
    gap: 16px;
  }

  @media (min-width: 1024px) {
    gap: 18px;
  }
}

.service-page__feature-item {
  font-family: var(--font-family-base);
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text-primary);
  opacity: 0.85;
  padding-left: 28px;
  position: relative;

  @media (min-width: 640px) {
    font-size: 17px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }

  &::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--color-accent-primary);
    font-weight: bold;
    font-size: 20px;
  }
}

.service-page__details-content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 640px) {
    gap: 24px;
  }

  @media (min-width: 1024px) {
    gap: 28px;
  }
}

.service-page__detail-item {
  font-family: var(--font-family-base);
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-text-primary);
  opacity: 0.85;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 17px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
}

.service-page__flower {
  grid-column: 1;
  grid-row: 3;
  position: relative;
  width: 100%;
  max-width: 400px;
  height: auto;
  z-index: 1;
  pointer-events: none;

  @media (min-width: 1024px) {
    grid-column: 1;
    grid-row: 2;
    align-self: end;
    max-width: 500px;
  }

  @media (min-width: 1280px) {
    max-width: 600px;
  }

  @media (max-width: 768px) {
    display: none;
  }
}

.service-page__flower-image {
  width: 100%;
  height: auto;
  display: block;
  filter: drop-shadow(0 0 30px rgba(124, 58, 237, 0.2))
    drop-shadow(0 0 60px rgba(34, 211, 238, 0.15));
}

.service-page__not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 24px;

  h1 {
    font-family: var(--font-family-brand);
    font-size: clamp(32px, 6vw, 48px);
    color: var(--color-text-primary);
  }
}

.service-page__back-link {
  font-family: var(--font-family-base);
  font-size: 16px;
  color: var(--color-accent-primary);
  text-decoration: none;
  padding: 12px 24px;
  border: 1px solid var(--color-accent-primary);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-accent-primary);
    color: var(--color-background-primary);
  }
}
</style>