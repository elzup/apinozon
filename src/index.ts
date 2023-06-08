import * as functions from 'firebase-functions'
import { ua } from './ua.js'
import { manifest } from './dynamicPwa.js'
import { fanOut, fanOutUnit } from './fanOut.js'
import { https } from './firebase.js'
import { timezoneJp, timezoneUs } from './timezone.js'

export { manifest, fanOut, fanOutUnit, timezoneJp, timezoneUs, ua }

const { info } = functions.logger

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
