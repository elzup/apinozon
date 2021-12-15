import * as functions from 'firebase-functions'
import { mockReq, mockRes } from 'sinon-express-mock'
import { manifest } from './dynamicPwa'
import { helloWorld } from './index'

test('hello world', async () => {
  const req = {} as functions.Request
  const res = {
    send: (body) => {
      expect(body).toMatchInlineSnapshot(`"anozon hello"`)
    },
  } as functions.Response

  await helloWorld(req, res)
})

test('manifest', async () => {
  const req = mockReq({
    query: {
      name: 'Hogera',
      short_name: 'Hoge',
      src: './icon.png',
      start_url: '/fuga',
    },
  })
  const res = mockRes()

  const toj = (a: object) => JSON.stringify(a, null, '\t')

  await manifest(req, res)

  expect(toj(res.json.getCalls()[0].args)).toMatchInlineSnapshot(`
    "[
    	{
    		\\"name\\": \\"Hogera\\",
    		\\"short_name\\": \\"Hoge\\",
    		\\"start_url\\": \\"/fuga\\",
    		\\"display\\": \\"standalone\\",
    		\\"theme_color\\": \\"#ffffff\\",
    		\\"background_color\\": \\"#ffffff\\",
    		\\"icons\\": [
    			{
    				\\"src\\": \\"Hogera\\",
    				\\"sizes\\": \\"512x512\\",
    				\\"type\\": \\"image/png\\"
    			}
    		]
    	}
    ]"
  `)
})
