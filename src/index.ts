import * as functions from 'firebase-functions'
import { manifest } from './dynamicPwa'

const { info } = functions.logger

export const helloWorld = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    info('Hello logs!', { structuredData: true })
    res.send('anozon hello')
  })

export const globalip = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    const ip = req.header('fastly-client-ip')

    res.send(ip)
  })

export { manifest }
