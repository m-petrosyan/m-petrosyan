export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    'nuxt-gtag',
  ],
  gtag: {
    id: 'G-3GKMD09B1V',
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Miqayel Petrosyan - Developer Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Developer Portfolio of Miqayel Petrosyan' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg', href: '/favicon.svg' }
      ]
    }
  }
})