import { Injectable } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { DecodedToken } from './decoded_token'

@Injectable({
  providedIn: 'root'
})
export class JwtDecoder {
  private readonly jwtHelperService = new JwtHelperService() // thrid party library.

  decode(token: string): DecodedToken {
    const untypedDecodedToken = this.jwtHelperService.decodeToken(token)
    const decodedToken: DecodedToken = untypedDecodedToken
    return decodedToken
  }
}
