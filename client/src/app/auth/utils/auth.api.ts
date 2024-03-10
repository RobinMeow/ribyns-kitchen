import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { Credentials } from '@auth';
import { BaseApi } from '@api';
import { RegisterChef } from './RegisterChef';
import { ChefDto } from './ChefDto';
import { JwtToken } from '../JwtToken';

@Injectable({ providedIn: 'root' })
export class AuthApi extends BaseApi {
  private readonly URL = this.BASE_URL + '/Auth/';

  protected registerAsync(newChef: RegisterChef): Promise<ChefDto> {
    const url = this.URL + 'RegisterAsync';

    const request$ = this.httpClient.post<ChefDto>(url, newChef, {
      headers: this.defaultHeaders,
    });

    return firstValueFrom(request$);
  }

  protected loginAsync(credentials: Credentials): Promise<JwtToken> {
    const url = this.URL + 'LoginAsync';

    const request$ = this.httpClient.post<JwtToken>(url, credentials, {
      headers: this.defaultHeaders,
    });

    return firstValueFrom(request$);
  }

  protected deleteAsync(credentials: Credentials): Promise<void> {
    const url = this.URL + 'DeleteAsync';

    const request$ = this.httpClient.post<void>(url, credentials, {
      headers: this.defaultHeaders,
    });

    return firstValueFrom(request$);
  }
}
