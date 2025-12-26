<template>
  <div
    ref="cursorRef"
    class="custom-cursor"
    :class="{ 'custom-cursor--hover': isHovering, 'custom-cursor--hidden': !isVisible }"
  >
    <div class="custom-cursor__dot"></div>
    <div class="custom-cursor__ring"></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  container?: HTMLElement | null
}

const props = withDefaults(defineProps<Props>(), {
  container: null,
})

const cursorRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const isHovering = ref(false)
const isDesktop = ref(false)
function isMobileDevice(): boolean {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
  
  
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  return mobileRegex.test(userAgent)
}

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0
let animationFrame: number | null = null
let containerElement: HTMLElement | null = null
function animateCursor() {
  if (!cursorRef.value) {
    animationFrame = null
    return
  }

  
  cursorX += (mouseX - cursorX) * 0.15
  cursorY += (mouseY - cursorY) * 0.15

  cursorRef.value.style.left = `${cursorX}px`
  cursorRef.value.style.top = `${cursorY}px`

  animationFrame = requestAnimationFrame(animateCursor)
}

function isInsideContainer(x: number, y: number): boolean {
  if (!containerElement) return false
  const rect = containerElement.getBoundingClientRect()
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
}

function handleMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY

  
  if (containerElement) {
    const inside = isInsideContainer(mouseX, mouseY)
    isVisible.value = inside
    
    if (inside && !animationFrame) {
      animateCursor()
    } else if (!inside && animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
  } else {
    
    isVisible.value = true
    if (!animationFrame) {
      animateCursor()
    }
  }
}

function handleMouseOver(e: MouseEvent) {
  if (!isVisible.value) return
  
  const target = e.target as HTMLElement
  
  const isInteractive =
    target.tagName === 'A' ||
    target.tagName === 'BUTTON' ||
    !!target.closest('a') ||
    !!target.closest('button') ||
    window.getComputedStyle(target).cursor === 'pointer'

  isHovering.value = isInteractive
}

function initCursor() {
  if (!containerElement || !isDesktop.value) return

  containerElement.style.cursor = 'none'
  
  
  const rect = containerElement.getBoundingClientRect()
  if (
    mouseX >= rect.left &&
    mouseX <= rect.right &&
    mouseY >= rect.top &&
    mouseY <= rect.bottom
  ) {
    isVisible.value = true
    if (!animationFrame) {
      animateCursor()
    }
  }
}

watch(
  () => props.container,
  async (newContainer) => {
    
    if (containerElement && isDesktop.value) {
      containerElement.style.cursor = 'auto'
    }
    
    containerElement = newContainer || null
    
    if (containerElement && isDesktop.value) {
      containerElement.style.cursor = 'none'
      await nextTick()
      initCursor()
    } else {
      isVisible.value = false
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        animationFrame = null
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  
  isDesktop.value = !isMobileDevice()
  
  if (!isDesktop.value) {
    return 
  }

  
  document.body.style.cursor = 'none'
  if (containerElement) {
    containerElement.style.cursor = 'none'
  }

  
  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mouseover', handleMouseOver)

  
  if (containerElement) {
    initCursor()
  }
})

onUnmounted(() => {
  
  document.body.style.cursor = 'auto'
  if (containerElement) {
    containerElement.style.cursor = 'auto'
  }

  
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mouseover', handleMouseOver)

  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame)
    animationFrame = null
  }
})
</script>

<style scoped lang="scss">
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  will-change: transform, opacity;
  opacity: 1;
  transition: opacity 0.2s ease;

  &--hidden {
    opacity: 0;
    pointer-events: none;
  }

  &__dot {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 6px;
    background: var(--color-accent-primary, #7C3AED);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
    box-shadow: 0 0 10px var(--color-accent-primary, #7C3AED);
  }

  &__ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border: 2px solid var(--color-accent-secondary, #22D3EE);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, border-width 0.3s ease;
    box-shadow: 0 0 20px var(--color-accent-secondary, #22D3EE);
  }

  &--hover {
    .custom-cursor__dot {
      width: 12px;
      height: 12px;
      background: var(--color-accent-primary, #7C3AED);
      box-shadow: 0 0 15px var(--color-accent-primary, #7C3AED);
    }

    .custom-cursor__ring {
      width: 60px;
      height: 60px;
      border-color: var(--color-accent-secondary, #22D3EE);
      border-width: 1px;
      box-shadow: 0 0 25px var(--color-accent-secondary, #22D3EE);
    }
  }
}
@media (max-width: 768px) {
  .custom-cursor {
    display: none !important;
  }
}
</style>
