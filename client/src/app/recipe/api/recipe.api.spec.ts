import { provideHttpClient } from '@angular/common/http';
import { RecipeApi } from './recipe.api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideApiBaseUrlTesting } from '@api';
import { MockProvider } from 'ng-mocks';
import { TokenStorage } from 'src/app/auth/utils/token.storage';
import { makeEnvironmentProviders } from '@angular/core';

const provideApiTesting = () => {
  return makeEnvironmentProviders([
    provideHttpClient(),
    provideHttpClientTesting(),
    provideApiBaseUrlTesting(),
    MockProvider(TokenStorage),
  ]);
};

describe('RecipeApiService', () => {
  let recipeApi: RecipeApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeApi, provideApiTesting()],
    });
    recipeApi = TestBed.inject(RecipeApi);
  });

  it('should be created', () => {
    expect(recipeApi).toBeTruthy();
  });

  // dont test newAsync (as it is made private because it is not in use by the app anymore)
});
