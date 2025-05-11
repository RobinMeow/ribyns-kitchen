import { TestBed } from '@angular/core/testing'
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { MockProvider } from 'ng-mocks'
import { AuthService } from './auth_service'
import { ChefValidations } from './chef_validations'
import { fakeValidations, withField } from '@common/validations/testing'
import { chefValidationsResolver } from './chef_validations_resolver'

describe('chefValidationsResolver should', () => {
  let authService: AuthService
  let route: ActivatedRouteSnapshot
  const state = undefined! as RouterStateSnapshot

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(AuthService), MockProvider(ActivatedRoute)]
    })

    authService = TestBed.inject(AuthService)
    route = TestBed.inject(ActivatedRoute).snapshot
  })

  it('resolve to ChefValidations', async () => {
    const expectedValidations = new ChefValidations(
      fakeValidations([withField('name').required().build()])
    )

    const spy = spyOn(authService, 'getValidationsAsync').and.returnValue(
      Promise.resolve(expectedValidations)
    )

    let actual: ChefValidations
    await TestBed.runInInjectionContext(async () => {
      actual = (await chefValidationsResolver(route, state)) as ChefValidations
    })

    expect(actual!).toEqual(expectedValidations)
    expect(spy).toHaveBeenCalledOnceWith()
  })

  // TODO e2e test which covers feedback on rejected resolver

  it('rejects when api rejects as well', async () => {
    const apiSpy = spyOn(authService, 'getValidationsAsync').and.returnValue(
      Promise.reject(null)
    )

    await TestBed.runInInjectionContext(async () => {
      const promise = chefValidationsResolver(route, state)
      await expectAsync(<Promise<unknown>>promise).toBeRejectedWith(null)
    })

    expect(apiSpy).toHaveBeenCalledOnceWith()
  })
})
