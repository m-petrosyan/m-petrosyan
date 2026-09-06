// CV → PDF generator (pdfmake 0.3). Used by the Nitro build hook (nuxt.config.ts)
// and standalone: `node scripts/cv-pdf.cjs`.
// Design mirrors the "Arthur Melikyan" reference resume: Inter font, a thin
// dark accent bar on the right page edge, and uppercase section titles with a
// full-width gold underline. Data comes from data/cv.json.
const { readFileSync, existsSync, writeFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')

const esc = (s) => String(s ?? '')

// palette from the reference PDF
const INK = '#14161C'   // (20,22,28)  main text / headers
const SUB = '#4A4F5A'   // (74,79,90)  secondary text
const MUTE = '#8C919C'  // (140,145,156) meta text
const GOLD = '#FED136'  // (254,209,54) accent

const PAGE_W = 595.28 // A4
const PAGE_H = 841.89
const MARGIN_X = 45
const CONTENT_W = PAGE_W - MARGIN_X * 2

// right-edge accent bar, drawn on every page behind the content
const accentBar = {
  canvas: [
    { type: 'rect', x: PAGE_W - 4, y: 0, w: 3, h: PAGE_H, color: INK },
  ],
  absolutePosition: { x: 0, y: 0 },
}

function sectionTitle(text) {
  return {
    stack: [
      {
        text: esc(text).toUpperCase(),
        fontSize: 11.5,
        bold: true,
        font: 'InterBold',
        color: INK,
        letterSpacing: 1.1,
        margin: [0, 0, 0, 4],
      },
      { canvas: [{ type: 'rect', x: 0, y: 0, w: CONTENT_W, h: 1.1, color: GOLD }], margin: [0, 0, 0, 0] },
    ],
    margin: [0, 16, 0, 12],
  }
}

const bodyStyle = { fontSize: 9.6, lineHeight: 1.4, color: INK }

function skillLineEl(group) {
  return {
    text: [
      { text: esc(group.group) + ': ', fontSize: 9.7, bold: true, color: INK },
      { text: group.items.map(esc).join(', '), fontSize: 9.7, color: INK },
    ],
    margin: [0, 0, 0, 5],
  }
}

// Contact line parts — clickable links, displayed without protocol/www
function contactParts(cv) {
  const b = cv.basics || {}
  const parts = []
  if (b.email) {
    parts.push({ text: esc(b.email), link: 'mailto:' + esc(b.email) })
  }
  if (b.phone) parts.push({ text: esc(b.phone) })
  if (b.location) parts.push({ text: esc(b.location) })
  const clean = (u) => String(u || '').replace(/^https?:\/\//, '').replace(/^www\./, '')
  const links = []
  if (b.website) links.push({ text: clean(b.website), link: esc(b.website) })
  if (b.github) links.push({ text: clean(b.github), link: esc(b.github) })
  if (b.linkedin) links.push({ text: clean(b.linkedin), link: esc(b.linkedin) })
  if (b.telegram) links.push({ text: clean(b.telegram), link: esc(b.telegram) })
  return { parts, links }
}

function joinSep(items, sep = { text: ' | ' }) {
  const out = []
  items.forEach((it, i) => {
    if (i > 0) out.push({ ...sep, text: sep.text })
    out.push(it)
  })
  return out
}

// zero-padding borderless table whose single row never splits across pages —
// used to keep a section title / job heading with its first line of content
const keepLayout = {
  hLineWidth: () => 0,
  vLineWidth: () => 0,
  paddingLeft: () => 0,
  paddingRight: () => 0,
  paddingTop: () => 0,
  paddingBottom: () => 0,
}

function keepTogether(elements) {
  return {
    table: {
      widths: ['*'],
      dontBreakRows: true,
      body: [[{ stack: elements }]],
    },
    layout: keepLayout,
    margin: [0, 0, 0, 0],
  }
}

function buildDocDefinition(cv) {
  const b = cv.basics || {}
  const content = []

  // ---------------------------------------------------------------- header
  content.push({
    stack: [
      { text: esc(b.name), fontSize: 27, bold: true, font: 'InterBold', color: INK },
      { text: esc(b.title), fontSize: 12.5, color: SUB, margin: [0, 5, 0, 0] },
      ...(b.roleBadge
        ? [{ text: esc(b.roleBadge), fontSize: 9.5, color: MUTE, margin: [0, 7, 0, 0] }]
        : []),
      {
        canvas: [{ type: 'rect', x: 0, y: 0, w: 40, h: 2.5, color: GOLD }],
        margin: [0, 10, 0, 8],
      },
    ],
    margin: [0, 0, 0, 6],
  })

  const { parts, links } = contactParts(cv)
  if (parts.length) {
    content.push({
      text: joinSep(parts, { text: ' | ', style: 'contact' }),
      style: 'contact',
      margin: [0, 0, 0, 2],
    })
  }
  if (links.length) {
    content.push({
      text: joinSep(links, { text: ' | ', style: 'contact' }),
      style: 'contact',
      margin: [0, 0, 0, 0],
    })
  }

  // -------------------------------------------------------------- summary
  if (b.summary?.length) {
    const title = sectionTitle('Professional Summary')
    const first = { text: esc(b.summary[0]), style: 'body', margin: [0, 0, 0, 6] }
    content.push(keepTogether([title, first]))
    b.summary.slice(1).forEach((s) => {
      content.push({ text: esc(s), style: 'body', margin: [0, 0, 0, 6] })
    })
    if (b.highlights?.length) {
      content.push({ text: '', margin: [0, 2, 0, 0] })
      b.highlights.forEach((h) => {
        content.push({
          text: [{ text: '•  ', color: SUB, bold: true }, { text: esc(h), style: 'body' }],
          margin: [0, 0, 0, 4],
        })
      })
    }
  }

  // ------------------------------------------------------------ experience
  if (cv.experience?.length) {
    const title = sectionTitle('Professional Experience')
    content.push(keepTogether([title]))
    cv.experience.forEach((job, i) => {
      const rightSide = [job.location, job.period].filter(Boolean).join('  |  ')
      const header = {
        columns: [
          {
            text: [
              { text: esc(job.company), fontSize: 11, bold: true, font: 'InterBold', color: INK },
              job.role ? { text: '  —  ' + esc(job.role), fontSize: 10.5, color: SUB } : {},
            ],
          },
          rightSide
            ? { text: esc(rightSide), fontSize: 9.5, color: MUTE, alignment: 'right' }
            : {},
        ],
        margin: [0, 0, 0, 5],
      }

      const noteEl = job.note
        ? {
            text: esc(job.note),
            fontSize: 8.8,
            italics: true,
            color: MUTE,
            margin: [0, 0, 0, 5],
          }
        : null

      const bullets = job.bullets?.length ? job.bullets : []
      const firstBulletEl = bullets.length
        ? {
            text: [{ text: '•  ', color: SUB }, { text: esc(bullets[0]), style: 'body' }],
            margin: [0, 0, 0, 4],
          }
        : null

      // keep heading + note + first bullet together across page breaks
      content.push(keepTogether([header, noteEl, firstBulletEl].filter(Boolean)))

      bullets.slice(1).forEach((bullet) => {
        content.push({
          text: [{ text: '•  ', color: SUB }, { text: esc(bullet), style: 'body' }],
          margin: [0, 0, 0, 4],
        })
      })

      if (job.stack) {
        content.push({
          text: [
            { text: 'Technologies: ', fontSize: 9, bold: true, color: SUB },
            { text: esc(job.stack), fontSize: 9, color: SUB },
          ],
          margin: [0, 1, 0, i < cv.experience.length - 1 ? 11 : 0],
        })
      }
    })
  }

  // --------------------------------------------------------------- skills
  if (cv.skills?.length) {
    const title = sectionTitle('Technical Skills')
    const groups = cv.skills.filter((g) => g.items?.length)
    const firstGroup = groups.length ? skillLineEl(groups[0]) : null
    content.push(keepTogether([title, firstGroup].filter(Boolean)))
    groups.slice(1).forEach((group) => {
      content.push(skillLineEl(group))
    })
  }

  // ------------------------------------------------------------- education
  if (cv.education?.length) {
    const title = sectionTitle('Education')
    const first = eduLine(cv.education[0])
    content.push(keepTogether([title, first].filter(Boolean)))
    cv.education.slice(1).forEach((ed) => content.push(eduLine(ed)))
  }

  function eduLine(ed) {
    const parts = []
    if (ed.place) parts.push({ text: esc(ed.place), bold: true, font: 'InterBold', color: INK })
    if (ed.title) parts.push({ text: esc(ed.title), color: SUB })
    if (ed.period) parts.push({ text: esc(ed.period), color: MUTE })
    if (!parts.length) return null
    return { text: joinSep(parts, { text: ' — ' }), fontSize: 9.7, margin: [0, 0, 0, 5] }
  }

  // --------------------------------------------------------- certifications
  if (cv.certifications?.length) {
    const title = sectionTitle('Certifications')
    const first = certLine(cv.certifications[0])
    content.push(keepTogether([title, first].filter(Boolean)))
    cv.certifications.slice(1).forEach((c) => content.push(certLine(c)))
  }

  function certLine(c) {
    const parts = []
    if (c.title) parts.push({ text: esc(c.title), bold: true, font: 'InterBold', color: INK })
    if (c.place) parts.push({ text: esc(c.place), color: SUB })
    if (c.period) parts.push({ text: esc(c.period), color: MUTE })
    if (!parts.length) return null
    return { text: joinSep(parts, { text: ', ' }), fontSize: 9.7, margin: [0, 0, 0, 5] }
  }

  // ------------------------------------------------------------- languages
  if (cv.languages?.length) {
    const title = sectionTitle('Languages')
    const line = {
      text: joinSep(
        cv.languages.map((l) => ({
          text: esc(l.name) + (l.proficiency ? ' (' + esc(l.proficiency) + ')' : ''),
        })),
        { text: ', ' }
      ),
      fontSize: 9.7,
      color: INK,
      margin: [0, 0, 0, 4],
    }
    content.push(keepTogether([title, line]))
  }

  return {
    pageSize: { width: PAGE_W, height: PAGE_H },
    pageMargins: [MARGIN_X, 40, MARGIN_X, 40],
    background: [accentBar],
    content,
    styles: {
      body: bodyStyle,
      contact: { fontSize: 8.8, color: SUB },
    },
    defaultStyle: { font: 'Inter', fontSize: 9.6, lineHeight: 1.4, color: INK },
  }
}

function generateCvPdf({ cvPath, publicDir, outputPublicDir } = {}) {
  if (!cvPath || !existsSync(cvPath)) {
    console.warn('[cv] data/cv.json not found — skipping PDF generation')
    return
  }
  const cv = JSON.parse(readFileSync(cvPath, 'utf-8'))

  try {
    const pdfMake = require('pdfmake')
    pdfMake.fonts = {
      Inter: {
        normal: join(__dirname, 'fonts', 'Inter-Regular.ttf'),
        bold: join(__dirname, 'fonts', 'Inter-SemiBold.ttf'),
        italics: join(__dirname, 'fonts', 'Inter-Regular.ttf'),
        bolditalics: join(__dirname, 'fonts', 'Inter-SemiBold.ttf'),
      },
      InterBold: {
        normal: join(__dirname, 'fonts', 'Inter-Bold.ttf'),
        bold: join(__dirname, 'fonts', 'Inter-Bold.ttf'),
        italics: join(__dirname, 'fonts', 'Inter-Bold.ttf'),
        bolditalics: join(__dirname, 'fonts', 'Inter-Bold.ttf'),
      },
    }

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