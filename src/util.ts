import * as crypto from 'crypto'

export const hash = (s: string, algorithm: string) =>
  crypto.createHash(algorithm).update(String(s)).digest().toString('hex')
export const makeHash = (algorithm: string) => (s: string) => hash(s, algorithm)

export const sha512Hex = makeHash('sha512')
