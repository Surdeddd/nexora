<template>
  <footer ref="footerRef" class="app-footer">

    <div class="app-footer__content">
      <div class="app-footer__logo">
        <BrandMark-component size="lg" align="center" />
      </div>

      <nav class="app-footer__social">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url || undefined"
          :aria-label="social.name"
          class="app-footer__social-link"
          :class="{ 'app-footer__social-link--disabled': !social.url }"
          :target="social.url ? '_blank' : undefined"
          :rel="social.url ? 'noopener noreferrer' : undefined"
          @click="!social.url && $event.preventDefault()"
        >
          <span class="app-footer__social-text">{{ social.name }}</span>
          <img
            :src="social.icon"
            :alt="`${social.name} icon`"
            class="app-footer__social-icon"
          />
        </a>
      </nav>
    </div>

    <div class="app-footer__copyright">
      <span class="app-footer__copyright-year">© 2025</span>
      <span class="app-footer__copyright-brand">nexora</span>
    </div>

    <div class="app-footer__cursor">
      <img
        ref="cursorImageRef"
        src="@/assets/img/cursor-3d.png"
        alt=""
        class="app-footer__cursor-image"
        aria-hidden="true"
        loading="lazy"
        fetchpriority="low"
      />
    </div>
  </footer>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import instagramIcon from '~/assets/icons/instagram.svg'
import telegramIcon from '~/assets/icons/telegram.svg'
import whatsappIcon from '~/assets/icons/whats-app.svg'
import BrandMarkComponent from '~/components/BrandMark-component.vue'

const footerRef = ref<HTMLElement | null>(null)
const cursorImageRef = ref<HTMLImageElement | null>(null)

let cursorMouseMoveHandler: ((e: MouseEvent) => void) | null = null

const socialLinks = [
  {
    name: 'Telegram',
    url: 'https://t.me/surdeddd',
    icon: telegramIcon,
  },
  {
    name: 'WhatsApp',
    url: '',
    icon: whatsappIcon,
  },
  {
    name: 'Instagram',
    url: '',
    icon: instagramIcon,
  },
]

onMounted(() => {
  if (cursorImageRef.value && footerRef.value) {
    cursorMouseMoveHandler = (e: MouseEvent) => {
      if (!footerRef.value || !cursorImageRef.value) return
      
      const rect = footerRef.value.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15
      
      cursorImageRef.value.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(15px)`
    }
    
    footerRef.value.addEventListener('mousemove', cursorMouseMoveHandler)
  }
})

onUnmounted(() => {
  if (cursorMouseMoveHandler && footerRef.value) {
    footerRef.value.removeEventListener('mousemove', cursorMouseMoveHandler)
  }
})
</script>

<style scoped lang="scss">
.app-footer {
  position: relative;
  width: 100%;
  background: var(--color-background-primary);
  padding: 60px 24px 40px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 40px;
  min-height: 400px;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  @media (min-width: 640px) {
    padding: 80px 32px 50px;
    min-height: 450px;
    gap: 50px;
  }

  @media (min-width: 768px) {
    padding: 100px 48px 60px;
    min-height: 500px;
    gap: 60px;
  }

  @media (min-width: 1024px) {
    padding: 120px 64px 80px;
    min-height: 550px;
    gap: 70px;
  }
}

.app-footer__label {
  font-family: var(--font-family-base);
  font-size: 14px;
  color: var(--color-text-primary);
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 2;
  grid-row: 1;

  @media (min-width: 640px) {
    font-size: 15px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
}

.app-footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  grid-row: 2;
  z-index: 2;

  @media (min-width: 640px) {
    gap: 40px;
  }

  @media (min-width: 768px) {
    gap: 48px;
  }

  @media (min-width: 1024px) {
    gap: 56px;
  }
}

.app-footer__logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-footer__social {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    gap: 40px;
  }

  @media (min-width: 768px) {
    gap: 48px;
  }

  @media (min-width: 1024px) {
    gap: 56px;
  }
}

.app-footer__social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-primary);
  text-decoration: none;
  font-family: var(--font-family-base);
  font-size: 16px;
  opacity: 0.7;
  transition: opacity 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  @media (min-width: 640px) {
    font-size: 17px;
    gap: 10px;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    gap: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
    gap: 14px;
  }

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &--disabled {
    cursor: default;
    pointer-events: none;
  }
}

.app-footer__social-text {
  font-weight: 400;
}

.app-footer__social-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  @media (min-width: 640px) {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 768px) {
    width: 22px;
    height: 22px;
  }

  @media (min-width: 1024px) {
    width: 24px;
    height: 24px;
  }

  .app-footer__social-link:hover & {
    opacity: 1;
  }
}

.app-footer__copyright {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--font-family-base);
  font-size: 14px;
  z-index: 2;
  grid-row: 3;

  @media (min-width: 640px) {
    font-size: 15px;
    gap: 10px;
  }

  @media (min-width: 768px) {
    font-size: 16px;
    gap: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
    gap: 14px;
  }
}

.app-footer__copyright-year {
  color: var(--color-text-primary);
  opacity: 0.6;
}

.app-footer__copyright-brand {
  font-family: var(--font-family-brand);
  color: var(--color-text-primary);
  opacity: 0.8;
  letter-spacing: 0.05em;
}

.app-footer__cursor {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  max-width: 500px;
  height: auto;
  z-index: 1;
  pointer-events: none;
  opacity: 0.95;
  transform-origin: bottom right;

  @media (min-width: 640px) {
    width: 45%;
    max-width: 600px;
  }

  @media (min-width: 768px) {
    width: 40%;
    max-width: 700px;
  }

  @media (min-width: 1024px) {
    width: 35%;
    max-width: 800px;
  }

  @media (max-width: 480px) {
    display: none;
  }
}

.app-footer__cursor-image {
  width: 100%;
  height: auto;
  display: block;
  transform-style: preserve-3d;
  perspective: 1000px;
  filter: 
    drop-shadow(0 20px 40px rgba(124, 58, 237, 0.4))
    drop-shadow(0 40px 80px rgba(34, 211, 238, 0.3))
    drop-shadow(0 0 30px rgba(124, 58, 237, 0.3))
    drop-shadow(0 0 60px rgba(34, 211, 238, 0.2));
  transition: transform 0.1s ease-out;
  will-change: transform;
}
</style>
