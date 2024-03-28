import { info, log } from 'firebase-functions/logger'
import { manifest } from './dynamicPwa.js'
import { fanOut, fanOutUnit } from './fanOut.js'
import { https } from './firebase.js'
import { timeGaha } from './gacha.js'
import { redirector } from './redirector.js'
import { timezoneJp, timezoneUs } from './timezone.js'
import { ua } from './ua.js'
import { delay } from './dump.js'

export { fanOut, fanOutUnit, manifest, redirector, timezoneJp, timezoneUs, ua, delay }

export const helloWorld = https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })

  res.send('anozon hello')
})

export const globalip = https.onRequest((req, res) => {
  const ip = req.headers['x-forwarded-for']

  res.send(ip)
})

export const unsafe = https.onRequest((req, res) => {
  res.send(`<h1>hello :)</h1><p>only http page</p>`)
})

export const timeGacha = https.onRequest((req, res) => {
  const t = Date.now()
  res.setHeader('Time-Gacha', +t)

  res.send(timeGaha(new Date(t)))
})

export const paring = https.onRequest((req, res) => {
  const { id } = req.query
  const KEY_PAIRS = process.env.KEY_PAIRS || ''
  if (typeof id !== 'string') {
    res.end('id is not string')
    return
  }
  const keys = new Map(
    KEY_PAIRS.trim()
      .split('\n')
      .map((v) => v.split('\t'))
      .map(([a, b]) => [a, b])
  )
  const key = keys.get(id)
  const text = String(key)

  res.end(text)
})

export const dump = https.onRequest((req, res) => {
  info(`summary ${req.method} ${req.url}`)
  log(req)

  res.end('dumped')
})
