import * as functions from 'firebase-functions'
import { helloWorld } from './index'

test('hello world', async () => {
  const req = {} as any
  const res = {
    send: (body) => {
      expect(body).toMatchInlineSnapshot(`"anozon hello"`)
    },
  } as functions.Response

  await helloWorld(req, res)
})
