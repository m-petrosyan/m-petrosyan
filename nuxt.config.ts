import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const { generateCvPdf } = require('./scripts/cv-pdf.cjs')

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
  },
  nitro: {
    hooks: {
      // Runs after the public/ -> .output/public/ copy, so we must also write
      // the freshly generated PDF into the output dir — otherwise the built
      // artifact keeps a stale cv.pdf from a previous build.
      compiled: (nitro: any) => {
        generateCvPdf({
          cvPath: join(__dirname, 'data', 'cv.json'),
          publicDir: join(__dirname, 'public'),
          outputPublicDir: nitro?.options?.output?.publicDir,
        })
      },
    },
  },
})