"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manifest = void 0;
const firebase_1 = require("./firebase");
/* eslint-disable @typescript-eslint/naming-convention */
const genManifest = (m) => ({
    name: m.get('name'),
    short_name: m.get('short_name'),
    start_url: m.get('start_url'),
    display: 'standalone',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    icons: [
        {
            src: m.get('name'),
            sizes: '512x512',
            type: 'image/png',
        },
    ],
});
exports.manifest = firebase_1.https.onRequest((req, res) => {
    const m = new Map([
        ['name', 'name'],
        ['short_name', 'name'],
        ['start_url', '/'],
        ['src', 'icon.png'],
    ]);
    for (const [k, v] of Object.entries(req.query)) {
        if (typeof v === 'string')
            m.set(k, v);
    }
    res.json(genManifest(m)).end();
});
//# sourceMappingURL=dynamicPwa.js.map