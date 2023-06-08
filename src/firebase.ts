import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

export const base = functions.region('asia-northeast1')
export const baseTokyo = functions.region('asia-northeast1')
export const baseUs = functions.region('us-central1')
export const https = base.https

admin.initializeApp()

type User = {
  uid: string
}

function assertUser(data: unknown): asserts data is User {
  const d = data as Partial<User> // 補完のためキャスト

  if (!(typeof d?.uid === 'string')) {
    throw new Error('data is not User type')
  }
}

const userConverter: admin.firestore.FirestoreDataConverter<User> = {
  fromFirestore(snap) {
    const data = snap.data()

    assertUser(data)
    return data
  },
  toFirestore: (model: User) => model,
}

export const getUserDoc = (uid: string) => {
  const app = admin.apps[0]

  if (app === null) return

  const db = app.firestore()

  db.doc(`user/${uid}`).withConverter(userConverter)
}
