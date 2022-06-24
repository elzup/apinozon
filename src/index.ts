import * as functions from 'firebase-functions'
import { ua } from './ua'
import { manifest } from './dynamicPwa'
import { fanOut, fanOutUnit } from './fanOut'
import { https } from './firebase'
import { timezoneJp, timezoneUs } from './timezone'

export { manifest, fanOut, fanOutUnit, timezoneJp, timezoneUs, ua }

const { info } = functions.logger

export const helloWorld = https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })

  res.send('anozon hello')
})

export const globalip = https.onRequest((req, res) => {
  const ip = req.header('fastly-client-ip')

  res.send(ip)
})

export const unsafe = https.onRequest((req, res) => {
  res.send(`<h1>hello :)</h1><p>only http page</p>`)
})
