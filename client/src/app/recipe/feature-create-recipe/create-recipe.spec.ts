import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { CreateRecipe } from './create-recipe';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideApiBaseUrlTesting } from '@api';
import { RecipeLocalPersistor } from '../local-persistor/recipe.local-persistor';
import { FormControl, FormGroup } from '@angular/forms';

describe('CreateRecipe should', () => {
  let component: CreateRecipe;
  let recipeLP: RecipeLocalPersistor;
  let fixture: ComponentFixture<CreateRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipe],
      providers: [
        provideNoopAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideApiBaseUrlTesting(),
        { provide: RecipeLocalPersistor, useValue: { async createAsync() {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRecipe);
    recipeLP = TestBed.inject(RecipeLocalPersistor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });

  it('not call createAsync on invalid form', () => {
    spyOn(recipeLP, 'createAsync');
    const submitButton = fixture.nativeElement.querySelector(
      '[data-cy-create-recipe-submit-button]',
    );
    submitButton.click();
    fixture.detectChanges();

    expect(recipeLP.createAsync).not.toHaveBeenCalled();
  });

  it('call createAsync on valid form', () => {
    spyOn(recipeLP, 'createAsync');

    const form: FormGroup<{
      title: FormControl<string>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }> = (component as any).form; // because dom manipulation with dispatchEvent(new Event('input')) shucks

    form.setValue({
      title: 'title',
    });

    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector(
      '[data-cy-create-recipe-submit-button]',
    );
    submitButton.click();
    expect(recipeLP.createAsync).toHaveBeenCalled();
  });
});
