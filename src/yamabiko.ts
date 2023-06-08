import { https } from './firebase.js'

export const yamabiko = https.onRequest((req, res) => {
  res.send(req.body).end()
})
