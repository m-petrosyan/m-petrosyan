import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineEventHandler(() => {
  const cvPath = join(__dirname, '..', '..', 'data', 'cv.json')
  const data = JSON.parse(readFileSync(cvPath, 'utf-8'))
  return { data }
})
