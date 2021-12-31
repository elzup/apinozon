import * as functions from 'firebase-functions'
import { manifest } from './dynamicPwa'
import { fanOut, fanOutUnit } from './fanOut'
import { https, baseTokyo, baseUs } from './firebase'
import { formatTime } from '@elzup/kit/lib/formatTime'

export { manifest, fanOut, fanOutUnit }

const { info } = functions.logger

export const helloWorld = https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })
  res.send('anozon hello')
})

export const timezoneUs = baseUs.https.onRequest((req, res) => {
  const datejp = new Date(
    Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
  )

  res.send({
    date: formatTime(new Date()),
    datejp: formatTime(datejp),
  })
})

export const timezoneJp = baseTokyo.https.onRequest((req, res) => {
  res.send({
    date: formatTime(new Date()),
  })
})
