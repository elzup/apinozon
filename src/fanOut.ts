import * as functions from 'firebase-functions'
import { PubSub } from '@google-cloud/pubsub'
import { base, https } from './firebase'

const { log } = functions.logger

const projectId = JSON.parse(process.env.FIREBASE_CONFIG || '{}').projectId

export const fanOut = https.onRequest(async (req, res) => {
  const pubsub = new PubSub({ projectId })

  // Creates a new topic
  const [topic] = await pubsub.createTopic('fanout-unit')

  for (let i = 1; i <= 3; i++) {
    await topic.publishMessage({
      json: {
        count: i,
      },
    })
  }
  res.send('done').end()
})

export const fanOutUnit = base.pubsub.topic('fanout-unit').onPublish((msg) => {
  log(msg.data)
  log(msg.json)
})
