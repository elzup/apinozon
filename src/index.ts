import * as functions from 'firebase-functions'
import { https } from './firebase'
import { manifest } from './dynamicPwa'

const { info } = functions.logger

export const helloWorld = https.onRequest((req, res) => {
  info('Hello logs!', { structuredData: true })
  res.send('anozon hello')
})

export const globalip = https.onRequest((req, res) => {
  const ip = req.header('fastly-client-ip')

  res.send(ip)
})

export const wall = https.onRequest((req, res) => {
  res.send(req.query.text).end()
})

export { manifest }
