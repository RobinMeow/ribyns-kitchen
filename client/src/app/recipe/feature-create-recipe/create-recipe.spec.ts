import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { CreateRecipe } from './create-recipe';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RecipeApi } from '../util/recipe.api';
import { provideApiBaseUrlTesting } from '@api';

describe('CreateRecipe should', () => {
  let component: CreateRecipe;
  let recipeApi: RecipeApi;
  let fixture: ComponentFixture<CreateRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipe],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        RecipeApi,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recipeApi = TestBed.inject(RecipeApi);
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('not send http reuqest form is submitted invalid', async () => {
    // form is invalid by default
    const addAsyncSpy = spyOn(recipeApi, 'newAsync');

    const submitButton = fixture.nativeElement.querySelector(
      '[data-cy-create-recipe-submit-button]',
    );

    expect(submitButton.disabled).toBe(true);

    submitButton.click();
    expect(addAsyncSpy).not.toHaveBeenCalled();
  });
});
