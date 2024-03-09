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
import { Credentials } from './Credentials';
import { Chef } from './Chef';
import { JwtDecoder } from './jwt-decoder';
import { DecodedToken } from './DecodedToken';
import { notEmpty_checked, true_checked } from 'src/app/shared/assertions';
import { AuthApi } from './auth.api';
import { RegisterChef } from './RegisterChef';
import { JwtToken } from '../JwtToken';

@Injectable({ providedIn: 'root' })
export class AuthService extends AuthApi {
  private readonly tokenDecoder = inject(JwtDecoder);
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
    super();
    const token: string | null = this.tokenStorage.retrieve();
    this.tokenSignal.set(token);
  }

  /** sign up also sign you in right away */
  async signUpAsync(registerChef: RegisterChef): Promise<Chef> {
    const name = registerChef.name.trim();
    if (name.length === 0) throw new Error('Name is requried for sign up.');

    const password = registerChef.password?.trim();
    if (password.length === 0)
      throw new Error('Password is requried for sign up.');

    let email: string | undefined = registerChef.email?.trim();
    if (email !== undefined && email.length === 0) {
      email = undefined;
    }
    const registerChefTrimmed: RegisterChef = {
      name: name,
      password: password,
      email: email,
    };

    await super.registerAsync(registerChefTrimmed);
    const chef = await this.signInAsync(registerChef);
    return chef;
  }

  async signInAsync(credentials: Credentials): Promise<Chef> {
    notEmpty_checked(credentials.name, 'Login name may not be empty.');
    notEmpty_checked(credentials.password, 'Login password may not be empty.');

    const token: JwtToken = await super.loginAsync(credentials);
    const decodedToken: DecodedToken = this.tokenDecoder.decode(token);
    this.tokenSignal.set(token);

    return new Chef(decodedToken);
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

    await super.deleteAsync(credentials);
    this.logout();
  }
}
