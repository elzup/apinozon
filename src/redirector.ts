import { log } from 'firebase-functions/logger'
import { https } from './firebase.js'

export const redirector = https.onRequest((req, res) => {
  const url = req.query.url as string
  log('redirector', { url })
  if (typeof url !== 'string') {
    res.status(400).send('url is not string')
    return
  }

  res.send(`
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>認証ページ</title>
	<script type="text/javascript">
	setTimeout(() => {
		location.href='${url}' }, 1000)
	</script>
</head>
<body style="padding: 8px">
認証中...
</body>
</html>
`)
})
