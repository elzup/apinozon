import { https } from './firebase'

export const yamabiko = https.onRequest((req, res) => {
  res.send(req.body).end()
})
