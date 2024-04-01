import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenStorage } from '../../auth/utils/token_storage'
import { API_BASE_URL } from './api_base_url'

export abstract class BaseApi {
  protected readonly httpClient = inject(HttpClient)
  protected readonly tokenStorage = inject(TokenStorage)
  protected readonly BASE_URL = inject(API_BASE_URL)

  protected readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })

  protected defaultHeadersWithAuth(
    headers: HttpHeaders = this.defaultHeaders
  ): HttpHeaders {
    const token = this.tokenStorage.retrieve()

    if (!token) {
      throw new Error('Failed to retrieve token from TokenStorage.')
    }

    return headers.append('Authorization', token)
  }
}
