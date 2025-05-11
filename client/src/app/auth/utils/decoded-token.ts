import { TokenKey } from './token-key'

export type DecodedToken = {
  [key in TokenKey]: string
}
