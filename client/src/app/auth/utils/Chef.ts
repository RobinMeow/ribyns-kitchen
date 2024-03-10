import { DecodedToken } from './DecodedToken';
import { TokenKey } from './TokenKey';

export class Chef {
  constructor(decodedToken: DecodedToken) {
    this.name = decodedToken[TokenKey.Name];
  }
  readonly name: string;
}
