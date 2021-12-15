import { https } from './firebase'

export const fanOut = https.onRequest((req, res) => {
  res.send('done').end()
})
