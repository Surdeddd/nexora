<template>
  <ClientOnly>
    <CustomCursorComponent />
    <AppHeader-component />
    <main>
      <HeroSectionComponent />
      <VideoSectionComponent />
      <DevelopmentDirectionsSection />
      <ApproachSection />
      <ServicesSection />
      <InteractiveDiagramSection />
    </main>
    <AppFooterComponent />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import CustomCursorComponent from '~/components/CustomCursor-component.vue';
import { structuredData } from '~/constants/structuredData';
import AppFooterComponent from '~/modules/home/components/AppFooter-component.vue';
import AppHeaderComponent from '~/modules/home/components/AppHeader-component.vue';
import ApproachSection from '~/modules/home/components/sections/ApproachSection.vue';
import DevelopmentDirectionsSection from '~/modules/home/components/sections/DevelopmentDirectionsSection.vue';
import HeroSectionComponent from '~/modules/home/components/sections/HeroSection-component.vue';
import InteractiveDiagramSection from '~/modules/home/components/sections/InteractiveDiagramSection.vue';
import ServicesSection from '~/modules/home/components/sections/ServicesSection.vue';
import VideoSectionComponent from '~/modules/home/components/sections/VideoSection-component.vue';

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData),
    },
  ],
});

</script>
<style lang="scss" scoped>
  .text{
    font-family: var(--font-family-base);
    color:var(--color-accent-primary);
    font-size: 62px;
  }
</style>
