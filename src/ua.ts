import { baseTokyo } from './firebase.js'
import { insert } from './notion.js'
import { sha512Hex } from './util.js'

const SALT = process.env.SECRET_KEY_ALT ?? ''

const hashAuth = (id: string, token: string) => {
  // console.log(id + SALT)
  // console.log(sha512Hex(id + SALT).substring(0, 20))
  // console.log(token)

  // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
  return sha512Hex(id + SALT).substring(0, 20) === token
}

export const ua = baseTokyo.https.onRequest(async (req, res) => {
  const { ['user-agent']: userAgent, ['authorization']: token } = req.headers

  if (token === undefined || userAgent === undefined) {
    res.status(400).send({ message: 'need token' }).end()
    return
  }
  const [, id, hs] = token.split('-')

  if (!hashAuth(id, hs)) {
    res.status(401).send({ message: 'auth failed' }).end()
    return
  }
  await insert(id, userAgent, [])

  res.send(`ok! ${id} got ${userAgent}`)
})
