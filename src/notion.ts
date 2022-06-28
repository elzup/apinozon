import got from 'got'

const DB_ID = process.env.NOTION_UA_CHALLANGE_DB
const DB_TOKEN = process.env.NOTION_UA_CHALLANGE_TOKEN

export const insert = async function (name: string, text: string) {
  const body = {
    parent: {
      database_id: DB_ID,
    },
    properties: {
      title: { title: [{ text: { content: name } }] },
      Text: { text: [{ rich_text: { content: text } }] },
    },
  }

  const res = await got
    .post('https://api.notion.com/v1/pages', {
      json: body,
      headers: { authorization: `Bearer ${DB_TOKEN}` },
    })
    .catch((e) => {
      console.log(e)
      return null
    })

  if (!res) return

  console.log(res.body)
}

insert('test', 'test text')
