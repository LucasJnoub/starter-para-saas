// lib/crypto.js
import { createHash } from 'next-crypto'

export const hashString = (str) => {
  const sha256 = createHash('sha256')
  sha256.update(str)
  return sha256.digest('hex')
}