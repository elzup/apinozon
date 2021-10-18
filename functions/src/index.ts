import * as functions from 'firebase-functions'
import { manifest } from './dynamicPwa'

const { info } = functions.logger

export const helloWorld = functions.https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })
  res.send('anozon hello')
})

export { manifest }
