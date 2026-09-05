import { saveCv, isAuthorized } from '../../utils/cv-store'

export default defineEventHandler(async (event) => {
  if (!isAuthorized(event)) {
    throw createError({ statusCode: 403, statusMessage: 'Not authorized' })
  }

  const body = await readBody<any>(event)
  const { data } = (body || {}) as { data?: any }
  if (!data || typeof data !== 'object' || !data.basics || typeof data.basics !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid CV payload' })
  }

  await saveCv(data)
  return { ok: true }
})
