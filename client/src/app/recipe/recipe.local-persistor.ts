import { Injectable } from '@angular/core';
import { CreateRecipeCommand } from './feature-create-recipe/create-recipe.command';
import { openDB } from 'idb';
import { RecipeDto } from './util/RecipeDto';

@Injectable({ providedIn: 'root' })
export class RecipeLocalPersistor {
  private readonly storeName: string = 'recipes';

  async createAsync(cmd: CreateRecipeCommand): Promise<void> {
    const dto: RecipeDto = {
      id: cmd.Id,
      title: cmd.Title,
      createdAt: new Date(),
    };

    const db = await openDB('communitycookbook');

    await db.add(this.storeName, dto);
  }
}
