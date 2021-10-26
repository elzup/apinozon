import * as functions from 'firebase-functions'

export const manifest = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    res.json({ todo: 'hello' }).end()
  })
