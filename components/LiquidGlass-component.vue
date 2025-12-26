<template>
  <div class="liquid-glass">
    <slot />
  </div>
</template>
<style scoped lang="scss">
.liquid-glass {
  position: relative;
  display: inline-flex;
  align-items: center;
  border-radius: 24px;
  background: var(--color-glass-primary);

  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid var(--color-glass-secondary);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.28),
    inset 0 -1px 1px rgba(0, 0, 0, 0.25),
    0 20px 40px rgba(0, 0, 0, 0.35);

}
.liquid-glass > * {
  position: relative;
  z-index: 1;
}
</style>