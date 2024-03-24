import { RecipeBase } from './RecipeBase';

export class Recipe {
  constructor(dto: RecipeBase) {
    this.id = dto.id;
    this.title = dto.title;
  }

  readonly id: string;
  readonly title: string; /** read-only for now, but prolly will be editable, once the ui is there for it. */
}
