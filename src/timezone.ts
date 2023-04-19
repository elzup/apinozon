import { formatTime } from '@elzup/kit/lib/formatTime'
import { manifest } from './dynamicPwa'
import { fanOut, fanOutUnit } from './fanOut'
import { baseTokyo, baseUs } from './firebase'

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
