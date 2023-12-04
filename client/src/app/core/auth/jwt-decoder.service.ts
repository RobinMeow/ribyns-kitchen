import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedToken } from './DecodedToken';

@Injectable({
  providedIn: 'root',
})
export class JwtDecoderService {
  private readonly _jwtHelperService = new JwtHelperService();

  decode(token: string): DecodedToken {
    const untypedDecodedToken = this._jwtHelperService.decodeToken(token);
    const decodedToken: DecodedToken = untypedDecodedToken;
    return decodedToken;
  }
}
