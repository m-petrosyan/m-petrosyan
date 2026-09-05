import { promises as fs } from 'node:fs'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getHeader } from 'h3'

/** Best-effort project root: cwd normally wins (dev server and pm2 both run from the repo). */
function findRoot (): string {
  const cwd = process.cwd()
  const candidates: string[] = [cwd]
  let cur = dirname(fileURLToPath(import.meta.url))
  for (let i = 0; i < 10; i++) {
    candidates.push(cur)
    const next = dirname(cur)
    if (next === cur) break
    cur = next
  }
  for (const c of candidates) {
    try {
      if (existsSync(join(c, 'package.json')) || existsSync(join(c, 'public')) || existsSync(join(c, '.output'))) {
        return c
      }
    } catch { /* keep looking */ }
  }
  return cwd
}

function unique (list: string[]): string[] {
  return [...new Set(list)]
}

const root = findRoot()

/** Every public/ directory that Nuxt could currently be serving from. */
function publicTargets (): string[] {
  const candidates = unique([
    join(process.cwd(), '.output', 'public'),
    join(process.cwd(), 'public'),
    join(root, '.output', 'public'),
    join(root, 'public'),
  ])
  return candidates.filter(c => { try { return existsSync(c) } catch { return false } })
}

function dataFile (): string {
  return join(root, 'data', 'cv.json')
}

export async function loadCv (): Promise<any> {
  try {
    const raw = await fs.readFile(dataFile(), 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function saveCv (data: any): Promise<void> {
  const file = dataFile()
  mkdirSync(dirname(file), { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

/** Persist the PDF into every public dir (source + .output build) so it is always fresh. */
export async function savePdf (buffer: Buffer): Promise<string[]> {
  const written: string[] = []
  const targets = publicTargets().length ? publicTargets() : [join(root, 'public')]
  for (const dir of targets) {
    try {
      mkdirSync(dir, { recursive: true })
      await fs.writeFile(join(dir, 'cv.pdf'), buffer)
      written.push(dir)
    } catch { /* keep going */ }
  }
  return written
}

export function requiresEditKey (): string {
  return process.env.CV_EDIT_KEY || ''
}

export function isAuthorized (event: any): boolean {
  const key = requiresEditKey()
  if (!key) return true // no key configured -> editable (local/dev usage)
  return getHeader(event, 'x-cv-key') === key
}
