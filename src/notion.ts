const DB_ID = process.env.NOTION_UA_CHALLANGE_DB
const DB_TOKEN = process.env.NOTION_UA_CHALLANGE_TOKEN

export const insert = async function (
  name: string,
  text: string,
  tags: string[]
) {
  const body = {
    parent: {
      database_id: DB_ID,
    },
    properties: {
      Name: {
        title: [{ text: { content: name } }],
      },
      UA: {
        rich_text: [{ text: { content: text } }],
      },
      Badges: {
        multi_select: tags.map((name) => ({ name })),
      },
    },
  }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${DB_TOKEN}`,
      ['Notion-Version']: '2021-08-16',
    },
  }).catch((e) => {
    console.log(e)
    return null
  })

  if (res === null) return

  console.log(res.body)
}
