import * as functions from 'firebase-functions'

const { info } = functions.logger

export const helloWorld = functions.https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })
  res.send('anozon hello')
})
