import { DecodedToken } from './decoded-token'
import { TokenKey } from './token-key'

export class Chef {
  constructor(decodedToken: DecodedToken) {
    this.name = decodedToken[TokenKey.Name]
  }
  readonly name: string
}
