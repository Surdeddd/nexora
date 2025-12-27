// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'nexora - Разработка сайтов и цифровых продуктов',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'nexora - разработка сайтов, веб-приложений и цифровых продуктов. Создаем современные решения с фокусом на результат и пользовательский опыт.',
        },
        {
          name: 'keywords',
          content:
            'разработка сайтов, веб-разработка, создание сайтов, разработка веб-приложений, UX дизайн, UI дизайн, веб-архитектура, архитектура веб-приложений, микросервисная архитектура, API разработка, цифровые продукты, интерфейсные продукты, дизайн-системы, компонентная библиотека, корпоративные сайты, корпоративный сайт, веб-сервисы, веб-платформы, SEO оптимизация, продвижение сайтов, технический аудит, аудит сайта, поддержка сайтов, разработка на заказ, веб-студия, дизайн-студия, современные технологии, адаптивный дизайн, мобильная разработка, фронтенд разработка, бэкенд разработка, fullstack разработка, React разработка, Vue.js разработка, Nuxt.js разработка, TypeScript разработка, пользовательский опыт, UX исследования, прототипирование, информационная архитектура, интерфейсный дизайн, брендинг, визуальная идентичность, автоматизация процессов, интеграции, CRM интеграция, производительность сайта, оптимизация скорости, безопасность сайта, масштабируемость, техническая поддержка',
        },
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { name: 'author', content: 'nexora' },
        { name: 'theme-color', content: '#020617' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          property: 'og:title',
          content: 'nexora - Разработка сайтов и цифровых продуктов',
        },
        {
          property: 'og:description',
          content:
            'nexora - разработка сайтов, веб-приложений и цифровых продуктов. Создаем современные решения с фокусом на результат и пользовательский опыт.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://nexorastudio.site' },
        { property: 'og:site_name', content: 'nexora' },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'nexora - Разработка сайтов и цифровых продуктов',
        },
        {
          name: 'twitter:description',
          content:
            'nexora - разработка сайтов, веб-приложений и цифровых продуктов. Создаем современные решения с фокусом на результат и пользовательский опыт.',
        },
      ],
      link: [
        { rel: 'canonical', href: 'https://nexorastudio.site' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  devtools: { enabled: false },

  compatibilityDate: '2025-12-20',

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  typescript: {
    strict: true,
  },

  imports: {
    dirs: ['constants', 'types'],
  },

  experimental: {
    payloadExtraction: true,
  },

  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: id => {
            if (id.includes('node_modules')) {
              if (id.includes('gsap')) {
                return 'gsap';
              }
              return 'vendor';
            }
            return null;
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['gsap'],
    },
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://nexorastudio.site',
    },
  },

  // @ts-ignore - @nuxtjs/sitemap module types
  sitemap: {
    hostname: 'https://nexorastudio.site',
    gzip: true,
    routes: async () => {
      const { servicesData } = await import('./constants/services');
      return servicesData.map(service => `/services/${service.slug}`);
    },
  },
});
