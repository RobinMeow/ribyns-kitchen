import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private readonly _key: string = 'token';

  store(token: string): void {
    if (token.length === 0) {
      throw new Error('token may not be an empty string.');
    }
    localStorage.setItem(this._key, token);
  }

  retrieve(): string | null {
    return localStorage.getItem(this._key);
  }

  clear(): void {
    localStorage.removeItem(this._key);
  }
}
