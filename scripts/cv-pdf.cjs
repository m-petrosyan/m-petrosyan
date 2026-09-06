// Shared CV → PDF generator (pdfmake). Used both by the Nitro build hook
// (nuxt.config.ts) and standalone: `node scripts/cv-pdf.cjs`
const { readFileSync, existsSync, writeFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')

const esc = (s) => String(s || '')

// Skills are rendered as plain wrapped text (pdfmake cannot draw padded,
// rounded “tag” boxes — text backgrounds always hug the glyphs — so boxes
// render cramped and broken). Bold skill names with gold dot separators keep
// the section readable and echo the tag-cloud look of the website.
function skillLine(items) {
  const parts = []
  items.forEach((s, i) => {
    if (i > 0) parts.push({ text: '   •   ', style: 'skillSep' })
    parts.push({ text: esc(s), style: 'skillName' })
  })
  return parts
}

// Contact rows — small gold square bullet drawn with canvas (Roboto has no
// emoji glyphs, so the old 📧🌐💻🔗✈️ rendered as broken grey boxes).
function contactRow(value) {
  return {
    columns: [
      {
        canvas: [{ type: 'rect', x: 0, y: 4, w: 5, h: 5, color: '#f5c542' }],
        width: 14,
      },
      { text: esc(value), style: 'contactItem' },
    ],
    margin: [10, 2, 10, 2],
  }
}

function buildDocDefinition(cv) {
  const b = cv.basics || {}
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
    content.push({ text: 'Technical Skills', style: 'sectionTitle', pageBreak: 'before', margin: [0, 0, 0, 8] })
    cv.skills.forEach((group, gi) => {
      if (group.group) {
        content.push({
          text: esc(group.group).toUpperCase(),
          style: 'groupLabel',
          margin: [10, 0, 0, 4],
        })
      }
      if (group.items?.length) {
        content.push({
          text: skillLine(group.items),
          margin: [10, 2, 10, gi < cv.skills.length - 1 ? 8 : 10],
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
        margin: [0, 2, 10, 2],
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
  if (b.email) content.push(contactRow(b.email))
  if (b.website) content.push(contactRow(b.website))
  if (b.github) content.push(contactRow(b.github))
  if (b.linkedin) content.push(contactRow(b.linkedin))
  if (b.telegram) content.push(contactRow(b.telegram))

  const docDefinition = {
    content,
    styles: {
      name: { fontSize: 28, bold: true, color: '#0b0f17', font: 'Roboto' },
      title: { fontSize: 14, color: '#555', font: 'Roboto', margin: [0, 4, 0, 0] },
      badge: { fontSize: 10, color: '#0b0f17', background: '#f5c542', bold: true, padding: [4, 8], borderRadius: 3, alignment: 'center', margin: [0, 0, 0, 20], font: 'Roboto' },
      contact: { fontSize: 11, color: '#777', font: 'Roboto' },
      sectionTitle: { fontSize: 13, bold: true, color: '#f5c542', textTransform: 'uppercase', letterSpacing: 1.5, margin: [0, 0, 0, 8], font: 'Roboto' },
      body: { fontSize: 11, color: '#333', font: 'Roboto', lineHeight: 1.4 },
      bullet: { fontSize: 11, color: '#f5c542', font: 'Roboto' },
      role: { fontSize: 13, bold: true, color: '#0b0f17', font: 'Roboto' },
      company: { fontSize: 11, color: '#f5c542', font: 'Roboto' },
      period: { fontSize: 9, color: '#777', font: 'Roboto' },
      stack: { fontSize: 9, color: '#666', font: 'Roboto', italics: true },
      groupLabel: { fontSize: 9, bold: true, color: '#999', textTransform: 'uppercase', letterSpacing: 1, font: 'Roboto' },
      skillName: { fontSize: 10, color: '#1b222d', font: 'Roboto' },
      skillSep: { fontSize: 10, color: '#f5c542', font: 'Roboto' },
      langName: { fontSize: 11, bold: true, color: '#0b0f17', font: 'Roboto' },
      langLevel: { fontSize: 10, color: '#f5c542', font: 'Roboto' },
      langItem: { font: 'Roboto' },
      eduTitle: { fontSize: 11, bold: true, color: '#0b0f17', font: 'Roboto' },
      eduPlace: { fontSize: 9, color: '#aaa', font: 'Roboto' },
      eduPeriod: { fontSize: 10, color: '#777', font: 'Roboto' },
      certTitle: { fontSize: 11, bold: true, color: '#0b0f17', font: 'Roboto' },
      certPlace: { fontSize: 9, color: '#aaa', font: 'Roboto' },
      certPeriod: { fontSize: 10, color: '#777', font: 'Roboto' },
      contactItem: { fontSize: 10, color: '#333', font: 'Roboto' },
    },
    defaultStyle: { font: 'Roboto', fontSize: 11, lineHeight: 1.4 },
  }

  return docDefinition
}

function generateCvPdf({ cvPath, publicDir, outputPublicDir } = {}) {
  if (!cvPath || !existsSync(cvPath)) {
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
        if (publicDir) {
          mkdirSync(publicDir, { recursive: true })
          writeFileSync(join(publicDir, 'cv.pdf'), buf)
          console.log(`[cv] PDF written: ${join(publicDir, 'cv.pdf')} (${buf.length} bytes)`)
        }
        if (outputPublicDir) {
          mkdirSync(outputPublicDir, { recursive: true })
          writeFileSync(join(outputPublicDir, 'cv.pdf'), buf)
          console.log(`[cv] PDF also written to ${join(outputPublicDir, 'cv.pdf')}`)
        }
      })
      doc.end()
    }).catch((err) => {
      console.error('[cv] PDF generation failed:', err.message)
    })
  } catch (err) {
    console.error('[cv] PDF generation error:', err)
  }
}

module.exports = { buildDocDefinition, generateCvPdf }

if (require.main === module) {
  const root = join(__dirname, '..')
  generateCvPdf({
    cvPath: join(root, 'data', 'cv.json'),
    publicDir: join(root, 'public'),
  })
}