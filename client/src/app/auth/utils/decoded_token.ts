import { TokenKey } from './token_key'

export type DecodedToken = {
  [key in TokenKey]: string
}
