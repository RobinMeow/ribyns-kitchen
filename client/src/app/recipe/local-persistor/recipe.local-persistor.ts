import { Injectable } from '@angular/core';
import { LocalPersistorBase } from '@local-persistor';
import { RecipeLocalDto } from './Recipe.local-dto';
import { NewRecipe } from '../shared/NewRecipe';
import { RecipeId } from './Recipe.id';

@Injectable({ providedIn: 'root' })
export class RecipeLocalPersistor extends LocalPersistorBase {
  protected override readonly storeName: string = this.StoreNames.Recipes;

  async createAsync(newRecipe: NewRecipe): Promise<RecipeId> {
    const recipeId: RecipeId = this.newId();

    const dto: RecipeLocalDto = {
      id: recipeId,
      title: newRecipe.title,
      createdAt: this.dateNow(),
      synced: false,
    };

    const db = await this.getDatabaseAsync();
    await db.add(this.storeName, dto);
    return recipeId;
  }
}
