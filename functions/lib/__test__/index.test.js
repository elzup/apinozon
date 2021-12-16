"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sinon_express_mock_1 = require("sinon-express-mock");
const dynamicPwa_1 = require("../dynamicPwa");
const index_1 = require("../index");
const yamabiko_1 = require("../yamabiko");
test('hello world', async () => {
    const req = sinon_express_mock_1.mockReq();
    const res = sinon_express_mock_1.mockRes();
    await index_1.helloWorld(req, res);
    const resBody = res.send.getCalls()[0].args[0];
    expect(resBody).toMatch('anozon hello');
});
test('yamabiko', async () => {
    const req = sinon_express_mock_1.mockReq({ body: 'toshino' });
    const res = sinon_express_mock_1.mockRes();
    await yamabiko_1.yamabiko(req, res);
    expect(res.send.getCalls()[0].args[0]).toMatch(`toshino`);
});
test('manifest', async () => {
    const req = sinon_express_mock_1.mockReq({
        query: {
            name: 'Hogera',
            short_name: 'Hoge',
            src: './icon.png',
            start_url: '/fuga',
        },
    });
    const res = sinon_express_mock_1.mockRes();
    const toj = (a) => JSON.stringify(a, null, '\t');
    await dynamicPwa_1.manifest(req, res);
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
  `);
});
//# sourceMappingURL=index.test.js.map