import { https } from './firebase.js'

/* eslint-disable @typescript-eslint/naming-convention */

const genManifest = (m: Map<string, string>) => ({
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
})

export const manifest = https.onRequest((req, res) => {
  const m: Map<string, string> = new Map([
    ['name', 'name'],
    ['short_name', 'name'],
    ['start_url', '/'],
    ['src', 'icon.png'],
  ])

  for (const [k, v] of Object.entries(req.query)) {
    if (typeof v === 'string') m.set(k, v)
  }
  res.json(genManifest(m)).end()
})
