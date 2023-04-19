import { PubSub } from '@google-cloud/pubsub'
import { base, https } from './firebase'

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const FANOUT_UNIT_TOPIC_ID = 'fanout-unit'

const getTopic = async () => {
  const projectId = JSON.parse(process.env.FIREBASE_CONFIG ?? '{}').projectId

  if (projectId === undefined) throw new Error('projectId is undefined')
  const pubsub = new PubSub({ projectId })

  return await pubsub.topic(FANOUT_UNIT_TOPIC_ID)
}

export const fanOut = https.onRequest(async (req, res) => {
  try {
    const topic = await getTopic()

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
  } catch (e) {
    console.log(e)
    res.send('failed').end()
  }
})

export const fanOutUnit = base.pubsub.topic('fanout-unit').onPublish((msg) => {
  console.log(msg.data)
  console.log(msg.json)
})
