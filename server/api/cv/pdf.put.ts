import { savePdf, isAuthorized } from '../../utils/cv-store'

export default defineEventHandler(async (event) => {
  if (!isAuthorized(event)) {
    throw createError({ statusCode: 403, statusMessage: 'Not authorized' })
  }

  const raw = await readRawBody(event, false) as Buffer | null
  if (!raw || !raw.length) {
    throw createError({ statusCode: 400, statusMessage: 'Empty PDF body' })
  }
  const header = Buffer.from(raw.subarray(0, 4)).toString('latin1')
  if (!header.startsWith('%PDF')) {
    throw createError({ statusCode: 415, statusMessage: 'Body is not a PDF' })
  }

  const written = await savePdf(Buffer.from(raw))
  return { ok: true, written: written.length }
})
