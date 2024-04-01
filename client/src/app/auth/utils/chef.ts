import { DecodedToken } from './decoded_token'
import { TokenKey } from './token_key'

export class Chef {
  constructor(decodedToken: DecodedToken) {
    this.name = decodedToken[TokenKey.Name]
  }
  readonly name: string
}
