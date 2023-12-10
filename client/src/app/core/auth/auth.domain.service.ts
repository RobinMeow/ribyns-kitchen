import {
  EffectRef,
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  AuthService,
  DeleteChefDto,
  RegisterChefDto,
} from 'src/app/openapi-services';
import { RegisterChef } from './register/RegisterChef';
import { Credentials } from './Credentials';
import { TokenStorage } from './token.storage';
import { Chef } from './Chef';
import { JwtDecoderService } from './jwt-decoder.service';
import { DecodedToken } from './DecodedToken';

@Injectable({
  providedIn: 'root',
})
export class AuthDomainService {
  private readonly _authService = inject(AuthService);
  private readonly _tokenStorage = inject(TokenStorage);
  private readonly _tokenDecoder = inject(JwtDecoderService);
  private readonly _tokenSignal: WritableSignal<string | null | undefined> =
    signal(undefined);
  private readonly _isAuthorizedSignal: Signal<boolean> = computed(() => {
    const token = this._tokenSignal();
    return token !== null && token !== undefined;
  });

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
      name: chef.name.trim(),
      password: chef.password,
    };

    if (chef.email) {
      dto.email = chef.email.trim();
    }

    return firstValueFrom(this._authService.registerAsync(dto));
  }

  async loginAsync(credentials: Credentials): Promise<void> {
    if (credentials.name.length === 0)
      throw new Error('Login name may not be empty.');

    if (credentials.password.length === 0)
      throw new Error('Login password may not be empty.');

    const token = await firstValueFrom(
      this._authService.loginAsync(credentials),
    );

    this._tokenSignal.set(token);
  }

  logout(): void {
    if (!this._isAuthorizedSignal()) {
      throw new Error('Need to be authorized, to log out.');
    }
    this._tokenSignal.set(null);
  }

  isAuthorizedSignal(): Signal<boolean> {
    return this._isAuthorizedSignal;
  }

  public currentUserSignal(): Signal<Chef | null> {
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
