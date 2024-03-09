import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { AddRecipeComponent } from './add-recipe.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RecipeService } from '@infrastructure/open-api';

describe('AddRecipeComponent should', () => {
  let component: AddRecipeComponent;
  let recipeService: RecipeService;
  let fixture: ComponentFixture<AddRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRecipeComponent],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        RecipeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    recipeService = TestBed.inject(RecipeService);
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('not send http reuqest form is submitted invalid', async () => {
    // form is invalid by default
    const addAsyncSpy = jest.spyOn(recipeService, 'addAsync');

    const submitButton = fixture.nativeElement.querySelector(
      '[data-cy-add-recipe-submit-button]',
    );

    expect(submitButton.disabled).toBe(true);

    submitButton.click();
    expect(addAsyncSpy).not.toHaveBeenCalled();
  });
});
