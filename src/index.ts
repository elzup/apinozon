import * as functions from 'firebase-functions'
import { manifest } from './dynamicPwa'
import { fanOut, fanOutUnit } from './fanOut'
import { https } from './firebase'
import { timezoneJp, timezoneUs } from './timezone'

export { manifest, fanOut, fanOutUnit, timezoneJp, timezoneUs }

const { info } = functions.logger

export const helloWorld = https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })
  res.send('anozon hello')
})

export const globalip = https.onRequest((req, res) => {
  const ip = req.header('fastly-client-ip')

  res.send(ip)
})
