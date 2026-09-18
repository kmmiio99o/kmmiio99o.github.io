import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdirSync } from 'node:fs'
import { createServer } from 'node:net'
import { build, preview } from 'vite'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'og.png')
const W = 1200
const H = 630
const SETTLE_MS = 6000

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer()
    srv.once('error', reject)
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address()
      srv.close(() => resolve(port))
    })
  })
}

async function main() {
  const configFile = join(ROOT, 'vite.config.ts')

  console.log('[og] building site…')
  await build({ root: ROOT, configFile, logLevel: 'warn' })

  console.log('[og] serving dist…')
  const port = await freePort()
  const server = await preview({ root: ROOT, configFile, preview: { port, host: '127.0.0.1' } })
  const base = server.resolvedUrls?.local?.[0] ?? `http://127.0.0.1:${port}/`

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  try {
    console.log('[og] screenshotting running site…')
    const page = await browser.newPage()
    await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })
    await page.goto(base, { waitUntil: 'load', timeout: 30000 })
    await page.waitForSelector('.retro-paper', { timeout: 20000 })
    await sleep(SETTLE_MS)

    mkdirSync(join(ROOT, 'public'), { recursive: true })
    await page.screenshot({ path: OUT, type: 'png' })
    console.log(`[og] wrote ${OUT}`)
  } finally {
    await browser.close().catch(() => {})
    await server.close().catch(() => {})
  }
}

main().catch((err) => {
  console.error(`[og] warning: could not generate og.png (${err.message}); keeping existing file`)
  process.exit(0)
})
