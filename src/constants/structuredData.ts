export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'nexora',
  url: 'https://nexorastudio.site',
  logo: 'https://nexorastudio.site/logo.png',
  description:
    'nexora - разработка сайтов, веб-приложений и цифровых продуктов. Создаем современные решения с фокусом на результат и пользовательский опыт.',
  sameAs: [
    'https://t.me/nexora',
    'https://instagram.com/nexora',
    'https://wa.me/nexora',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    availableLanguage: ['Russian'],
  },
  areaServed: {
    '@type': 'Country',
    name: 'Russia',
  },
  service: [
    {
      '@type': 'Service',
      name: 'Разработка сайтов',
      description: 'Создание современных веб-сайтов и веб-приложений',
    },
    {
      '@type': 'Service',
      name: 'UX/UI дизайн',
      description:
        'Проектирование пользовательских интерфейсов и опыта взаимодействия',
    },
    {
      '@type': 'Service',
      name: 'Веб-архитектура',
      description: 'Проектирование архитектуры веб-систем и приложений',
    },
    {
      '@type': 'Service',
      name: 'Дизайн-системы',
      description: 'Создание комплексных дизайн-систем для цифровых продуктов',
    },
  ],
};
