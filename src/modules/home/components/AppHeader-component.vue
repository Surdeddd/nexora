<template>
  <header ref="headerRef" class="app-header fixed top-10 left-0 w-full flex justify-center items-center">
    <a href="/" aria-label="Главная страница nexora">
      <BrandMark-component
        ref="brandRef"
        size="lg"
        align="center"
      />
    </a>
  </header>
</template>
  
  <script setup lang="ts">
  import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import BrandMarkComponent from '~/components/BrandMark-component.vue';
  
  const brandRef = ref<InstanceType<typeof BrandMarkComponent> | null>(null);
  const headerRef = ref<HTMLElement | null>(null);
  
  let headerScrollTrigger: any = null;

  onMounted(async () => {
    await nextTick()
    
    if (!brandRef.value) return

    const { gsap } = await import('gsap')

    const nEl = brandRef.value.nRef
    const eEl = brandRef.value.eRef
    const xEl = brandRef.value.xRef
    const oEl = brandRef.value.oRef
    const rEl = brandRef.value.rRef
    const aEl = brandRef.value.aRef

    const letters = [nEl, eEl, xEl, oEl, rEl, aEl].filter((el): el is HTMLElement => el !== null)

    if (letters.length === 0) return

    letters.forEach((letter) => {
      gsap.set(letter, {
        opacity: 0,
        scale: 0.8,
        filter: 'blur(20px) brightness(2)',
        transformOrigin: 'center center',
      })
    })

    const masterTl = gsap.timeline({ delay: 0.4 })

    letters.forEach((letter, index) => {
      masterTl.to(
        letter,
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) brightness(1)',
          duration: 0.8,
          ease: 'power3.out',
        },
        index * 0.06
      )
    })

    if (nEl) {
      masterTl.to(
        nEl,
        {
          filter: 'brightness(1.3) drop-shadow(0 0 10px rgba(124, 58, 237, 0.6))',
          duration: 0.4,
          ease: 'power2.inOut',
        },
        '-=0.3'
      )
      .to(
        nEl,
        {
          filter: 'brightness(1) drop-shadow(0 0 0px rgba(124, 58, 237, 0))',
          duration: 0.5,
          ease: 'power2.inOut',
        }
      )
    }

    masterTl.to(letters, {
      filter: 'brightness(1.15)',
      duration: 0.3,
      ease: 'power2.out',
      stagger: {
        amount: 0.2,
        from: 'start',
      },
    }, '-=0.2')
    .to(letters, {
      filter: 'brightness(1)',
      duration: 0.4,
      ease: 'power2.inOut',
      stagger: {
        amount: 0.2,
        from: 'start',
      },
    })

    masterTl.to(letters, {
      filter: 'brightness(1.1) drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))',
      duration: 0.5,
      ease: 'sine.inOut',
    }, '-=0.1')
    .to(letters, {
      filter: 'brightness(1) drop-shadow(0 0 0px rgba(34, 211, 238, 0))',
      duration: 0.6,
      ease: 'sine.inOut',
    })

    setTimeout(() => {
      setupHeaderScrollHide(gsap)
    }, 500)
  })

  const setupHeaderScrollHide = async (gsapInstance: any) => {
    if (!headerRef.value) return

    const { ScrollTrigger } = await import('gsap/ScrollTrigger')
    
    gsapInstance.registerPlugin(ScrollTrigger)

    const videoSection = document.querySelector('.video-section') as HTMLElement
    if (!videoSection) return

    headerScrollTrigger = ScrollTrigger.create({
      trigger: videoSection,
      start: 'bottom top',
      onEnter: () => {
        gsapInstance.to(headerRef.value, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          ease: 'power2.in',
        })
      },
      onLeaveBack: () => {
        gsapInstance.to(headerRef.value, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        })
      },
    })
  }

  onBeforeUnmount(() => {
    if (headerScrollTrigger) {
      headerScrollTrigger.kill()
    }
  })
  
  defineExpose({ brandRef });
  </script>
  
<style scoped lang="scss">
.app-header {
  height: 88px;
  z-index: 100;
  pointer-events: none;
  min-width: 320px;
  max-width: 100vw;
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  overflow: hidden;
  left: 0;
  right: 0;

  @media (max-width: 768px) {
    top: 24px;
    height: 64px;
    padding: 0 12px;
  }

  @media (max-width: 480px) {
    top: 16px;
    height: 56px;
    padding: 0 8px;
  }

  @media (max-width: 360px) {
    top: 12px;
    height: 48px;
    padding: 0 4px;
  }
}

.app-header a {
  display: block;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  text-align: center;
}

.app-header :deep(.brand-mark) {
  pointer-events: auto;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  display: inline-block;
}
</style>