import { Injectable } from '@angular/core';
import { LocalPersistorBase } from '@local-persistor';
import { RecipeLocalDto } from './Recipe.local-dto';
import { NewRecipe } from '../shared/NewRecipe';
import { RecipeId } from './Recipe.id';
import { ActionLog } from '@sync';

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

  async getActionLogsAsync(): Promise<ActionLog[]> {
    const db = await this.getDatabaseAsync();
    return await db.getAll(this.storeName + '_actionlogs');
  }

  async processLogAsync(actionLog: ActionLog): Promise<void> {
    const db = await this.getDatabaseAsync();
    const recipe: RecipeLocalDto = await db.get(
      this.storeName,
      actionLog.entityId,
    );
    if (!recipe) {
      throw new Error(
        `Could not find, Recipe in LocalPersistor by Id '${actionLog.entityId}'.`,
      );
    }
  }
}
