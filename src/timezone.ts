// eslint-disable-next-line import/extensions
import { formatTime } from '@elzup/kit/lib/formatTime.js'
import { manifest } from './dynamicPwa.js'
import { fanOut, fanOutUnit } from './fanOut.js'
import { baseTokyo, baseUs } from './firebase.js'

export { manifest, fanOut, fanOutUnit }

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
