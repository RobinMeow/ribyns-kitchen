import {
  EffectRef,
  Injectable,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { firstValueFrom, tap } from 'rxjs';
import {
  AuthService,
  DeleteChefDto,
  ProblemDetails,
  RegisterChefDto,
} from 'src/app/openapi-services';
import { RegisterChef } from './register/RegisterChef';
import { Credentials } from './Credentials';
import { TokenStorage } from './token.storage';
import { Chef } from './Chef';
import { JwtDecoderService } from './jwt-decoder.service';
import { DecodedToken } from './DecodedToken';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthDomainService {
  private readonly _authService = inject(AuthService);
  private readonly _tokenStorage = inject(TokenStorage);
  private readonly _tokenDecoder = inject(JwtDecoderService);
  private readonly _tokenSignal: WritableSignal<string | null | undefined> =
    signal(undefined);

  private readonly _onTokenChanged: EffectRef = effect(
    () => {
      const token = this._tokenSignal();

      if (token === undefined) return;

      if (token !== null) {
        const decodedToken: DecodedToken = this._tokenDecoder.decode(token);
        this._currentUserSignal.set(new Chef(decodedToken));
        this._tokenStorage.store(token);
      } else {
        this._tokenStorage.clear();
        this._currentUserSignal.set(null);
      }
    },
    {
      allowSignalWrites: true,
    },
  );

  private readonly _currentUserSignal: WritableSignal<Chef | null> =
    signal(null);

  constructor() {
    const token: string | null = this._tokenStorage.retrieve();
    this._tokenSignal.set(token);
  }

  registerAsync(chef: RegisterChef): Promise<void> {
    const dto: RegisterChefDto = {
      name: chef.name,
      password: chef.password,
    };

    if (chef.email) {
      dto.email = chef.email;
    }

    return firstValueFrom(this._authService.registerAsync(dto));
  }

  async loginAsync(credentials: Credentials): Promise<void> {
    if (credentials.name.length === 0)
      throw new Error('Login name may not be missing.');

    if (credentials.password.length === 0)
      throw new Error('Login password may not be empty.');

    const token = await firstValueFrom(
      this._authService.loginAsync(credentials),
    );

    this._tokenSignal.set(token);
  }

  logout(): void {
    this._tokenSignal.set(null);
  }

  /**
   * @returns the token string when the chef is logged in or null if not.
   * If it is undefined the tokenStorage has not been retrieved yet.
   */
  public getTokenSignal(): Signal<string | null | undefined> {
    return this._tokenSignal.asReadonly();
  }

  public getCurrentUserSignal(): Signal<Chef | null> {
    return this._currentUserSignal.asReadonly();
  }

  async removeAsync(credentials: Credentials): Promise<void> {
    if (credentials.name.length === 0)
      throw new Error('Cannot delete a Chef without name.');

    if (credentials.password.length === 0)
      throw new Error('Cannot delete a Chef without password confirmation.');

    const deleteChefDto: DeleteChefDto = {
      ...credentials,
    };

    return await firstValueFrom(
      this._authService.deleteAsync(deleteChefDto),
    ).then(() => {
      this.logout();
    });
  }
}
