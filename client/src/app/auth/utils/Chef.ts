import { DecodedToken } from './DecodedToken';
import { TokenKey } from './TokenKey';

export class Chef {
  readonly name: string;

  constructor(decodedToken: DecodedToken) {
    this.name = decodedToken[TokenKey.Name];
  }
}
