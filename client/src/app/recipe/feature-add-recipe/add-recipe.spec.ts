import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AddRecipe } from './add-recipe';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RecipeApi } from '../util/recipe.api';

describe('AddRecipe should', () => {
  let component: AddRecipe;
  let recipeApi: RecipeApi;
  let fixture: ComponentFixture<AddRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipe],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        RecipeApi,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recipeApi = TestBed.inject(RecipeApi);
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('not send http reuqest form is submitted invalid', async () => {
    // form is invalid by default
    const addAsyncSpy = jest.spyOn(recipeApi, 'newAsync');

    const submitButton = fixture.nativeElement.querySelector(
      '[data-cy-add-recipe-submit-button]',
    );

    expect(submitButton.disabled).toBe(true);

    submitButton.click();
    expect(addAsyncSpy).not.toHaveBeenCalled();
  });
});
