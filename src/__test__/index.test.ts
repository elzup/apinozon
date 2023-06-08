import { mockReq, mockRes } from 'sinon-express-mock'
import { manifest } from '../dynamicPwa.js'
import { helloWorld } from '../index.js'
import { yamabiko } from '../yamabiko.js'

test('hello world', async () => {
  const req = mockReq()
  const res = mockRes()

  await helloWorld(req, res)
  const resBody = res.send.getCalls()[0].args[0]

  expect(resBody).toMatch('anozon hello')
})

test('yamabiko', async () => {
  const req = mockReq({ body: 'toshino' })
  const res = mockRes()

  await yamabiko(req, res)

  expect(res.send.getCalls()[0].args[0]).toMatch(`toshino`)
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
    		"name": "Hogera",
    		"short_name": "Hoge",
    		"start_url": "/fuga",
    		"display": "standalone",
    		"theme_color": "#ffffff",
    		"background_color": "#ffffff",
    		"icons": [
    			{
    				"src": "Hogera",
    				"sizes": "512x512",
    				"type": "image/png"
    			}
    		]
    	}
    ]"
  `)
})
