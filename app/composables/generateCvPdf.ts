// Renders the hidden #cv-pdf-sheet element into an A4 PDF (light, print-friendly),
// sliced into pages automatically if the content is taller than one sheet.
const A4_W = 794 // px @96dpi
const A4_H = 1123

export async function generateCvPdf (sourceEl: HTMLElement): Promise<Blob> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const scale = 2
  const canvas = await html2canvas(sourceEl, {
    scale,
    backgroundColor: '#ffffff',
    logging: false,
    useCORS: true,
    windowWidth: A4_W,
  })

  const pagePxH = A4_H * scale
  const pages = Math.max(1, Math.ceil(canvas.height / pagePxH))
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [A4_W, A4_H],
    compress: true,
    hotfixes: ['px_scaling'],
  })

  for (let i = 0; i < pages; i++) {
    const slice = document.createElement('canvas')
    slice.width = canvas.width
    slice.height = pagePxH
    const ctx = slice.getContext('2d')!
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, slice.width, slice.height)
    ctx.drawImage(canvas, 0, i * pagePxH, canvas.width, pagePxH, 0, 0, canvas.width, pagePxH)

    const img = slice.toDataURL('image/jpeg', 0.92)
    if (i > 0) pdf.addPage()
    pdf.addImage(img, 'JPEG', 0, 0, A4_W, A4_H, undefined, 'FAST')
  }

  return pdf.output('blob')
}
