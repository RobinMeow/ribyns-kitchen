import { Injectable } from '@angular/core';
import { notEmpty_checked } from 'src/app/shared/assertions';

const key: string = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  store(token: string): void {
    notEmpty_checked(token, 'token may not be an empty string.');
    localStorage.setItem(key, token);
  }

  retrieve(): string | null {
    return localStorage.getItem(key);
  }

  clear(): void {
    localStorage.removeItem(key);
  }
}
