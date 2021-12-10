/* eslint-disable @typescript-eslint/naming-convention */
import * as functions from 'firebase-functions'

const genManifest = ({
  name,
  short_name,
  src,
  start_url = '/',
}: Record<string, string>) => ({
  name,
  short_name,
  start_url,
  display: 'standalone',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  icons: [
    {
      src,
      sizes: '512x512',
      type: 'image/png',
    },
  ],
})

export const manifest = functions
  .region('asia-northeast1')
  .https.onRequest((req, res) => {
    const o: Record<string, string> = {}

    for (const [k, v] of Object.entries(req.query)) {
      o[k] = v as string
    }
    res.json(genManifest(o)).end()
  })
