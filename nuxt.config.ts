import { readFileSync, existsSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

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
      close: async () => {
        generatePdf()
      },
    },
  },
})

function generatePdf() {
  const cvPath = join(__dirname, 'data', 'cv.json')
  const publicDir = join(__dirname, 'public')
  const outPath = join(publicDir, 'cv.pdf')

  if (!existsSync(cvPath)) {
    console.warn('[cv] data/cv.json not found — skipping PDF generation')
    return
  }

  const cv = JSON.parse(readFileSync(cvPath, 'utf-8'))

  try {
    const pdfMake = require('pdfmake')
    const Roboto = require('pdfmake/fonts/Roboto.js')
    pdfMake.fonts = Roboto

    const docDefinition = buildDocDefinition(cv)
    const pdf = pdfMake.createPdf(docDefinition)

    pdf.pdfDocumentPromise.then((doc) => {
      const chunks = []
      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => {
        const buf = Buffer.concat(chunks)
        writeFileSync(outPath, buf)
        console.log(`[cv] PDF generated: ${outPath} (${buf.length} bytes)`)
      })
      doc.end()
    }).catch((err) => {
      console.error('[cv] PDF generation failed:', err.message)
    })
  } catch (err) {
    console.error('[cv] PDF generation error:', err)
  }
}

function buildDocDefinition(cv) {
  const b = cv.basics || {}
  const esc = (s) => String(s || '')

  const content = []

  content.push({
    text: [
      { text: esc(b.name), style: 'name' },
      { text: '\n' },
      { text: esc(b.title), style: 'title' },
    ],
    alignment: 'center',
    margin: [0, 0, 0, 20],
  })

  if (b.roleBadge) {
    content.push({
      text: esc(b.roleBadge),
      style: 'badge',
      alignment: 'center',
      margin: [0, 0, 0, 20],
    })
  }

  const contactParts = []
  if (b.email) contactParts.push(esc(b.email))
  if (b.phone) contactParts.push(esc(b.phone))
  if (b.location) contactParts.push(esc(b.location))
  if (contactParts.length) {
    content.push({
      text: contactParts.join('  |  '),
      style: 'contact',
      alignment: 'center',
      margin: [0, 0, 0, 30],
    })
  }

  if (b.summary?.length) {
    content.push({ text: 'Objective', style: 'sectionTitle', margin: [0, 0, 0, 8] })
    b.summary.forEach((s) => {
      content.push({ text: esc(s), style: 'body', margin: [10, 0, 10, 4] })
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  if (b.highlights?.length) {
    b.highlights.forEach((h) => {
      content.push({
        text: [
          { text: '• ', style: 'bullet' },
          { text: esc(h), style: 'body' },
        ],
        margin: [10, 0, 10, 2],
      })
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  if (cv.experience?.length) {
    content.push({ text: 'Professional Experience', style: 'sectionTitle', margin: [0, 0, 0, 8] })
    cv.experience.forEach((job, i) => {
      content.push({
        text: [
          { text: esc(job.role), style: 'role' },
          { text: ' — ' + esc(job.company), style: 'company' },
        ],
        margin: [10, 0, 10, 2],
      })
      if (job.period) {
        content.push({
          text: esc(job.period),
          style: 'period',
          margin: [10, 0, 10, 4],
        })
      }
      if (job.bullets?.length) {
        job.bullets.forEach((bullet) => {
          content.push({
            text: [
              { text: '• ', style: 'bullet' },
              { text: esc(bullet), style: 'body' },
            ],
            margin: [10, 0, 10, 2],
            indent: 10,
          })
        })
      }
      if (job.stack) {
        content.push({
          text: 'STACK: ' + esc(job.stack),
          style: 'stack',
          margin: [10, 0, 10, 6],
        })
      }
      if (i < cv.experience.length - 1) {
        content.push({ text: '', margin: [0, 0, 0, 8] })
      }
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  if (cv.skills?.length) {
    content.push({ text: 'Technical Skills', style: 'sectionTitle', margin: [0, 0, 0, 8] })
    cv.skills.forEach((group, gi) => {
      if (group.group) {
        content.push({
          text: esc(group.group).toUpperCase(),
          style: 'groupLabel',
          margin: [10, 0, 0, 4],
        })
      }
      if (group.items?.length) {
        const pillElements = group.items.map((s) => ({
          text: esc(s),
          style: 'skillPill',
          margin: [0, 3, 0, 3],
        }))
        content.push({
          columns: pillElements,
          margin: [10, 0, 10, gi < cv.skills.length - 1 ? 6 : 10],
        })
      }
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  if (cv.languages?.length) {
    content.push({ text: 'Languages', style: 'sectionTitle', margin: [0, 0, 0, 8] })
    cv.languages.forEach((l, i) => {
      content.push({
        text: [
          { text: esc(l.name) + '  ', style: 'langName' },
          { text: esc(l.proficiency), style: 'langLevel' },
        ],
        style: 'langItem',
        margin: [10, 2, 10, 2],
      })
      if (i < cv.languages.length - 1) {
        content.push({ text: '', margin: [0, 0, 0, 2] })
      }
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  if (cv.education?.length) {
    content.push({ text: 'Education', style: 'sectionTitle', margin: [0, 0, 0, 8] })
    cv.education.forEach((ed, i) => {
      content.push({
        text: esc(ed.title),
        style: 'eduTitle',
        margin: [10, 0, 0, 2],
      })
      if (ed.place) {
        content.push({
          text: esc(ed.place),
          style: 'eduPlace',
          margin: [10, 0, 0, 2],
        })
      }
      if (ed.period) {
        content.push({
          text: esc(ed.period),
          style: 'eduPeriod',
          margin: [10, 0, 10, 6],
        })
      }
      if (i < cv.education.length - 1) {
        content.push({ text: '', margin: [0, 0, 0, 4] })
      }
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  if (cv.certifications?.length) {
    content.push({ text: 'Certifications', style: 'sectionTitle', margin: [0, 0, 0, 8] })
    cv.certifications.forEach((c, i) => {
      content.push({
        text: esc(c.title),
        style: 'certTitle',
        margin: [10, 0, 0, 2],
      })
      if (c.place) {
        content.push({
          text: esc(c.place),
          style: 'certPlace',
          margin: [10, 0, 0, 2],
        })
      }
      if (c.period) {
        content.push({
          text: esc(c.period),
          style: 'certPeriod',
          margin: [10, 0, 10, 6],
        })
      }
      if (i < cv.certifications.length - 1) {
        content.push({ text: '', margin: [0, 0, 0, 4] })
      }
    })
    content.push({ text: '', margin: [0, 0, 0, 10] })
  }

  content.push({ text: 'Contact', style: 'sectionTitle', margin: [0, 0, 0, 8] })
  if (b.email) content.push({ text: '📧 ' + esc(b.email), style: 'contactItem', margin: [10, 2, 10, 2] })
  if (b.website) content.push({ text: '🌐 ' + esc(b.website), style: 'contactItem', margin: [10, 2, 10, 2] })
  if (b.github) content.push({ text: '💻 ' + esc(b.github), style: 'contactItem', margin: [10, 2, 10, 2] })
  if (b.linkedin) content.push({ text: '🔗 ' + esc(b.linkedin), style: 'contactItem', margin: [10, 2, 10, 2] })
  if (b.telegram) content.push({ text: '✈️ ' + esc(b.telegram), style: 'contactItem', margin: [10, 2, 10, 2] })

  const docDefinition = {
    content,
    styles: {
      name: { fontSize: 28, bold: true, color: '#0b0f17', font: 'Roboto' },
      title: { fontSize: 14, color: '#555', font: 'Roboto', margin: [0, 4, 0, 0] },
      badge: { fontSize: 10, color: '#0b0f17', background: '#f5c542', bold: true, padding: [4, 8], borderRadius: 3, alignment: 'center', margin: [0, 0, 0, 20], font: 'Roboto' },
      contact: { fontSize: 11, color: '#777', font: 'Roboto' },
      sectionTitle: { fontSize: 13, bold: true, color: '#f5c542', textTransform: 'uppercase', letterSpacing: 1.5, border: 1.5, borderColor: '#f5c542', borderBottom: true, borderPadding: 4, margin: [0, 0, 0, 8], font: 'Roboto' },
      body: { fontSize: 11, color: '#333', font: 'Roboto', lineHeight: 1.4 },
      bullet: { fontSize: 11, color: '#f5c542', font: 'Roboto' },
      role: { fontSize: 13, bold: true, color: '#0b0f17', font: 'Roboto' },
      company: { fontSize: 11, color: '#f5c542', font: 'Roboto' },
      period: { fontSize: 9, color: '#777', font: 'Roboto' },
      stack: { fontSize: 9, color: '#666', font: 'Roboto', italics: true },
      groupLabel: { fontSize: 9, bold: true, color: '#999', textTransform: 'uppercase', letterSpacing: 1, font: 'Roboto' },
      skillPill: { fontSize: 9, color: '#fff', background: '#0b0f17', border: 0.5, borderColor: '#1e2430', borderRadius: 3, padding: [3, 6], font: 'Roboto', margin: [0, 2, 0, 2] },
      langName: { fontSize: 11, bold: true, color: '#0b0f17', font: 'Roboto' },
      langLevel: { fontSize: 10, color: '#f5c542', font: 'Roboto' },
      langItem: { font: 'Roboto' },
      eduTitle: { fontSize: 11, bold: true, color: '#0b0f17', font: 'Roboto' },
      eduPlace: { fontSize: 9, color: '#aaa', font: 'Roboto' },
      eduPeriod: { fontSize: 10, color: '#777', font: 'Roboto' },
      certTitle: { fontSize: 11, bold: true, color: '#0b0f17', font: 'Roboto' },
      certPlace: { fontSize: 9, color: '#aaa', font: 'Roboto' },
      certPeriod: { fontSize: 10, color: '#777', font: 'Roboto' },
      contactItem: { fontSize: 10, color: '#333', font: 'Roboto', margin: [10, 2, 10, 2] },
    },
    defaultStyle: { font: 'Roboto', fontSize: 11, lineHeight: 1.4 },
  }

  return docDefinition
}