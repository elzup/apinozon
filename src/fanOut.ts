import { PubSub } from '@google-cloud/pubsub'
import { base, https } from './firebase'

const projectId = JSON.parse(process.env.FIREBASE_CONFIG || '{}').projectId
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const FANOUT_UNIT_TOPIC_ID = 'fanout-unit'

export const fanOut = https.onRequest(async (req, res) => {
  console.log('started')
  console.log(projectId)

  const pubsub = new PubSub({ projectId })

  // Creates a new topic
  const [topic] = await pubsub.createTopic(FANOUT_UNIT_TOPIC_ID)

  for (let i = 1; i <= 3; i++) {
    console.log(`step ${i}`)
    await topic.publishMessage({
      json: {
        count: i,
      },
    })
  }
  console.log('end')
  res.send('done').end()
})

export const fanOutUnit = base.pubsub.topic('fanout-unit').onPublish((msg) => {
  console.log(msg.data)
  console.log(msg.json)
})
