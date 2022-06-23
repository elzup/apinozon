import { sha512Hex } from '@elzup/kit'
import { baseTokyo } from './firebase'
import { insert } from './notion'

const SALT = process.env.SECRET_KEY_ALT ?? ''

const hashAuth = (id: string, token: string) => {
  return sha512Hex(id + SALT).substring(30) === token
}

// type UsRequest = {
//   query: {
//     id: string | undefined
//     name: string | undefined
//   }
// } & Request

export const ua = baseTokyo.https.onRequest((req, res) => {
  const { ['user-agent']: userAgent, authorization: token } = req.headers

  if (token === null || token === undefined || userAgent === undefined) {
    res.status(400).send({ message: 'need id, channel, token' }).end()
    return
  }
  const [, id, hs] = token.split('-')

  if (!hashAuth(id, hs)) {
    res.status(401).send({ message: 'need token' }).end()
  }
  insert(id, userAgent)

  res.send(`ok! ${id} got ${userAgent}`)
})
