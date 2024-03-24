import { RecipeBase } from '../util/RecipeBase';

export interface RecipeApiDto extends RecipeBase {
  readonly id: string;
  readonly title: string;
  readonly createdAt: Date;
}
