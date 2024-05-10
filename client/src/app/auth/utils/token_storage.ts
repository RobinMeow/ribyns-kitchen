import { Injectable } from '@angular/core'
import { assert } from '@common/assertions'

const key = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenStorage {
  store(token: string): void {
    assert(token, 'Token is required.')
    localStorage.setItem(key, token)
  }

  retrieve(): string | null {
    return localStorage.getItem(key)
  }

  clear(): void {
    localStorage.removeItem(key)
  }
}
