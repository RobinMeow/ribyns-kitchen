import { firstValueFrom, map } from 'rxjs'

import { Credentials } from '@auth'
import { BaseApi } from '@api'
import { RegisterChef } from './register-chef'
import { ChefDto } from './chef.dto'
import { JwtToken } from './jwt-token'
import { ChefValidations } from './chef.validations'
import { Validations } from '@common/validations'

export abstract class AuthApi extends BaseApi {
  private readonly URL = this.BASE_URL + '/Auth/'

  protected registerAsync(newChef: RegisterChef): Promise<ChefDto> {
    const url = this.URL + 'RegisterAsync'

    const request$ = this.httpClient.post<ChefDto>(url, newChef, {
      headers: this.defaultHeaders
    })

    return firstValueFrom(request$)
  }

  protected loginAsync(credentials: Credentials): Promise<JwtToken> {
    const url = this.URL + 'LoginAsync'

    const request$ = this.httpClient.post<JwtToken>(url, credentials, {
      headers: this.defaultHeaders
    })

    return firstValueFrom(request$)
  }

  protected deleteAsync(credentials: Credentials): Promise<void> {
    const url = this.URL + 'DeleteAsync'

    const request$ = this.httpClient.post<void>(url, credentials, {
      headers: this.defaultHeaders
    })

    return firstValueFrom(request$)
  }

  protected getValidationsAsync(): Promise<Readonly<ChefValidations>> {
    const url = this.URL + 'GetValidationsAsync'

    const request$ = this.httpClient
      .get<Validations>(url, {
        headers: this.defaultHeaders
      })
      .pipe(
        map((validations) => Object.freeze(new ChefValidations(validations)))
      )

    return firstValueFrom(request$)
  }
}
