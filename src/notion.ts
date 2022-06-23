import got from 'got'

const DB_ID = process.env.NOTION_UA_CHALLANGE_DB

export const insert = async function (name: string, text: string) {
  const body = {
    parent: {
      database_id: DB_ID,
    },
    properties: {
      Name: { title: [{ text: { content: name } }] },
      Description: {
        Text: [{ text: { content: text } }],
      },
    },
  }

  got.post('https://api.notion.com/v1/pages', {
    json: body,
  })
}
