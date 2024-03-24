import { Injectable } from '@angular/core';
import { CreateRecipeCommand } from './feature-create-recipe/create-recipe.command';
import { LocalPersistorBase } from '@local-persistor';
import { RecipeLocalDto } from './util/Recipe.local-dto';

@Injectable({ providedIn: 'root' })
export class RecipeLocalPersistor extends LocalPersistorBase {
  private readonly storeName: string = this.StoreNames.Recipes;

  async createAsync(cmd: CreateRecipeCommand): Promise<void> {
    // TODO: SYNC we are using the Recipe DTO here but I assume, we need a difference localDto
    const dto: RecipeLocalDto = {
      id: cmd.Id,
      title: cmd.Title,
      createdAt: new Date().toISOString(),
      synced: false,
    };

    const db = await this.getDatabaseAsync();
    await db.add(this.storeName, dto);
  }
}
