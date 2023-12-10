import { Injectable } from '@angular/core';
import { NotEmpty } from '@assertions';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private readonly _key: string = 'token';

  store(token: string): void {
    NotEmpty(token, 'token may not be an empty string.');
    localStorage.setItem(this._key, token);
  }

  retrieve(): string | null {
    return localStorage.getItem(this._key);
  }

  clear(): void {
    localStorage.removeItem(this._key);
  }
}
