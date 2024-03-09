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
  ChefDto,
  AuthService as GeneratedAuthService,
  RegisterChefDto,
} from '@infrastructure/open-api';
import { Credentials } from './Credentials';
import { TokenStorage } from './token.storage';
import { Chef } from './Chef';
import { JwtDecoderService } from './jwt-decoder.service';
import { DecodedToken } from './DecodedToken';
import { notEmpty_checked, true_checked } from 'src/app/shared/assertions';
import { RegisterChef } from '../feature-register/RegisterChef';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authService = inject(GeneratedAuthService);
  private readonly tokenStorage = inject(TokenStorage);
  private readonly tokenDecoder = inject(JwtDecoderService);
  private readonly tokenSignal: WritableSignal<string | null | undefined> =
    signal(undefined);
  private readonly isAuthorizedComputed: Signal<boolean> = computed(() => {
    const token = this.tokenSignal();
    return token !== null && token !== undefined;
  });

  private readonly onTokenChanged: EffectRef = effect(
    () => {
      const token = this.tokenSignal();

      if (token === undefined) return;

      if (token !== null) {
        const decodedToken: DecodedToken = this.tokenDecoder.decode(token);
        this.currentUserSignal.set(new Chef(decodedToken));
        this.tokenStorage.store(token);
      } else {
        this.tokenStorage.clear();
        this.currentUserSignal.set(null);
      }
    },
    {
      allowSignalWrites: true,
    },
  );

  private readonly currentUserSignal: WritableSignal<Chef | null> =
    signal(null);

  constructor() {
    const token: string | null = this.tokenStorage.retrieve();
    this.tokenSignal.set(token);
  }

  registerAsync(chef: RegisterChef): Promise<ChefDto> {
    const dto: RegisterChefDto = {
      name: chef.name.trim(),
      password: chef.password,
    };

    if (chef.email) {
      dto.email = chef.email.trim();
    }

    return firstValueFrom(this.authService.registerAsync(dto));
  }

  async loginAsync(credentials: Credentials): Promise<void> {
    notEmpty_checked(credentials.name, 'Login name may not be empty.');
    notEmpty_checked(credentials.password, 'Login password may not be empty.');

    const token = await firstValueFrom(
      this.authService.loginAsync(credentials),
    );

    this.tokenSignal.set(token);
  }

  logout(): void {
    true_checked(
      this.isAuthorizedComputed(),
      'Need to be authorized, to log out.',
    );
    this.tokenSignal.set(null);
  }

  isAuthorized(): Signal<boolean> {
    return this.isAuthorizedComputed;
  }

  public currentUser(): Signal<Chef | null> {
    return this.currentUserSignal.asReadonly();
  }

  async removeAsync(credentials: Credentials): Promise<void> {
    notEmpty_checked(credentials.name, 'Chefname may not be empty.');
    notEmpty_checked(credentials.password, 'Chef password may not be empty.');

    return await firstValueFrom(this.authService.deleteAsync(credentials)).then(
      () => {
        this.logout();
      },
    );
  }
}
