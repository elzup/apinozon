import * as functions from 'firebase-functions'

export const manifest = functions.https.onRequest((req, res) => {
  res.json({ todo: 'hello' }).end()
})
