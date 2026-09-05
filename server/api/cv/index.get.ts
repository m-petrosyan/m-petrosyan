import { loadCv, requiresEditKey } from '../../utils/cv-store'

export default defineEventHandler(async () => {
  const data = await loadCv()
  return {
    data,
    needsKey: !!requiresEditKey(),
  }
})
