<template>
  <div
    ref="brandMarkRef"
    class="brand-mark"
    :class="[
      `brand-mark--${size}`,
      `brand-mark--${align}`,
      orientation === 'vertical' ? 'brand-mark--vertical' : ''
    ]"
  >
    <span ref="nRef" class="brand-mark__n brand-mark__letter">n</span>
    <span ref="eRef" class="brand-mark__rest brand-mark__letter">e</span>
    <span ref="xRef" class="brand-mark__rest brand-mark__letter">x</span>
    <span ref="oRef" class="brand-mark__rest brand-mark__letter">o</span>
    <span ref="rRef" class="brand-mark__rest brand-mark__letter">r</span>
    <span ref="aRef" class="brand-mark__rest brand-mark__letter">a</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  orientation?: 'horizontal' | 'vertical';
}>(), {
  orientation: 'horizontal',
});

const brandMarkRef = ref<HTMLElement | null>(null)
const nRef = ref<HTMLElement | null>(null)
const eRef = ref<HTMLElement | null>(null)
const xRef = ref<HTMLElement | null>(null)
const oRef = ref<HTMLElement | null>(null)
const rRef = ref<HTMLElement | null>(null)
const aRef = ref<HTMLElement | null>(null)

defineExpose({
  brandMarkRef,
  nRef,
  eRef,
  xRef,
  oRef,
  rRef,
  aRef,
})
</script>

<style scoped lang="scss">
.brand-mark {
  font-family: var(--font-family-brand);
  letter-spacing: 0.06em;
  line-height: 1;
  user-select: none;
  will-change: transform;

  &__letter {
    display: inline-block;
    will-change: transform, opacity;
  }

  &--vertical {
    writing-mode: vertical-lr;
    text-orientation: upright;
    white-space: nowrap;
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
  }

  &__n {
    background: linear-gradient(
      90deg,
      var(--color-accent-primary),
      var(--color-accent-secondary)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  &__rest {
    color: var(--color-text-primary);
  }

  &--lg {
    font-size: clamp(24px, 8vw, 90px);
    max-width: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    letter-spacing: clamp(0.02em, 0.5vw, 0.06em);

    @media (max-width: 768px) {
      font-size: clamp(28px, 10vw, 64px);
    }

    @media (max-width: 480px) {
      font-size: clamp(24px, 12vw, 48px);
    }

    @media (max-width: 360px) {
      font-size: clamp(20px, 10vw, 32px);
    }
    &.brand-mark--vertical {
      font-size: clamp(32px, 5vh, 90px);
      
      @media (max-width: 768px) {
        font-size: clamp(28px, 6vh, 64px);
      }
      
      @media (max-width: 480px) {
        font-size: clamp(24px, 7vh, 48px);
      }
      
      @media (max-width: 360px) {
        font-size: clamp(20px, 8vh, 36px);
      }
    }
  }

  &--md {
    font-size: 40px;

    @media (max-width: 768px) {
      font-size: 32px;
    }

    @media (max-width: 480px) {
      font-size: 28px;
    }

    @media (max-width: 360px) {
      font-size: 24px;
    }
  }

  &--sm {
    font-size: 24px;

    @media (max-width: 480px) {
      font-size: 20px;
    }

    @media (max-width: 360px) {
      font-size: 18px;
    }
  }

  &--center { text-align: center; }
  &--left   { text-align: left; }
  &--right  { text-align: right; }
}
</style>