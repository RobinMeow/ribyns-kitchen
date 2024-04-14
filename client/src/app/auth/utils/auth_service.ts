import {
  EffectRef,
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal
} from '@angular/core'
import { Credentials } from './credentials'
import { Chef } from './chef'
import { JwtDecoder } from './jwt_decoder'
import { DecodedToken } from './decoded_token'
import { AuthApi } from './auth_api'
import { RegisterChef } from './register_chef'
import { JwtToken } from './jwt_token'
import { assert } from '@common/assertions'
import { ChefValidations } from './chef_validations'

@Injectable({ providedIn: 'root' })
export class AuthService extends AuthApi {
  private readonly tokenDecoder = inject(JwtDecoder)
  private readonly tokenSignal: WritableSignal<string | null | undefined> =
    signal(undefined)
  private readonly isAuthorizedComputed: Signal<boolean> = computed(() => {
    const token = this.tokenSignal()
    return token !== null && token !== undefined
  })

  private readonly onTokenChanged: EffectRef = effect(
    () => {
      const token = this.tokenSignal()

      if (token === undefined) return

      if (token !== null) {
        const decodedToken: DecodedToken = this.tokenDecoder.decode(token)
        this.currentUserSignal.set(new Chef(decodedToken))
        this.tokenStorage.store(token)
      } else {
        this.tokenStorage.clear()
        this.currentUserSignal.set(null)
      }
    },
    {
      allowSignalWrites: true
    }
  )

  private readonly currentUserSignal: WritableSignal<Chef | null> = signal(null)

  constructor() {
    super()
    const token: string | null = this.tokenStorage.retrieve()
    this.tokenSignal.set(token)
  }

  /** sign up also sign you in right away */
  async signUpAsync(registerChef: RegisterChef): Promise<Chef> {
    const name = registerChef.name.trim()
    assert(name, 'Name is requried for sign up.')

    const trimmedPassword = registerChef.password.trim()
    assert(trimmedPassword, 'Password is required for sign up.')
    assert(
      trimmedPassword.length === registerChef.password.length,
      'Password may not contain leading or trailing spaces.'
    )

    if (trimmedPassword.length === 0)
      throw new Error('Password is requried for sign up.')

    let email: string | undefined = registerChef.email?.trim()
    if (email !== undefined && email.length === 0) {
      email = undefined
    }
    const registerChefTrimmed: RegisterChef = {
      name: name,
      password: trimmedPassword,
      email: email
    }

    await super.registerAsync(registerChefTrimmed)
    const chef = await this.signInAsync(registerChef)
    return chef
  }

  async signInAsync(credentials: Credentials): Promise<Chef> {
    assert(credentials.name, 'Login name may not be empty.')
    assert(credentials.password, 'Login password may not be empty.')

    const token: JwtToken = await super.loginAsync(credentials)
    const decodedToken: DecodedToken = this.tokenDecoder.decode(token)
    this.tokenSignal.set(token)

    return new Chef(decodedToken)
  }

  logout(): void {
    assert(
      this.isAuthorizedComputed(),
      'Chef has to be authorized to be able to log out.'
    )
    this.tokenSignal.set(null)
  }

  isAuthorized(): Signal<boolean> {
    return this.isAuthorizedComputed
  }

  public currentUser(): Signal<Chef | null> {
    return this.currentUserSignal.asReadonly()
  }

  async removeAsync(credentials: Credentials): Promise<void> {
    assert(credentials.name, 'Chefname may not be empty.')
    assert(credentials.password, 'Chef password may not be empty.')

    await super.deleteAsync(credentials)
    this.logout()
  }

  override async getValidationsAsync(): Promise<Readonly<ChefValidations>> {
    return await super.getValidationsAsync()
  }
}
