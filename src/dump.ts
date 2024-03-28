import { info } from 'firebase-functions/logger'
import { onRequest } from 'firebase-functions/v2/https'

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec))

export const delay = onRequest(async (req, res) => {
  const { sec } = req.query
  if (typeof sec !== 'string') {
    res.send(`not setup ?sec=n`)
    return
  }
  let secNum = 0
  try {
    secNum = parseInt(sec)
  } catch (e) {
    res.send(`not setup ?sec=n`)
  }

  await sleep(secNum * 1000)

  info(`delay ${secNum}s`)

  res.send(`delay ${secNum}s`)
})
