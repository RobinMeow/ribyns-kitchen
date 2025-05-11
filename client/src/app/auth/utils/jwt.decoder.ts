import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { DecodedToken } from './decoded-token'

@Injectable({ providedIn: 'root' })
export class JwtDecoder {
  private readonly jwtHelperService = new JwtHelperService() // thrid party library.

  decode(token: string): DecodedToken {
    return this.jwtHelperService.decodeToken(token) as DecodedToken
  }
}
