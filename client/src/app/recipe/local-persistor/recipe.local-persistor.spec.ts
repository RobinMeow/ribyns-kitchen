import { TestBed } from '@angular/core/testing';

import { RecipeLocalPersistor } from './recipe.local-persistor';
import { NewRecipe } from '../shared/NewRecipe';

describe('RecipeLocalPersistor', () => {
  let recipeLP: RecipeLocalPersistor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    recipeLP = TestBed.inject(RecipeLocalPersistor);
  });

  it('should be created', () => {
    expect(recipeLP).toBeTruthy();
  });

  it('should create a new recipe', async () => {
    const newRecipe: NewRecipe = {
      title: 'title',
    };
    const recipeId = await recipeLP.createAsync(newRecipe);
    expect(recipeId).toBeTruthy();
  });
});
