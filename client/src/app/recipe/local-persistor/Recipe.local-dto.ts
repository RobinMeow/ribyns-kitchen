import { RecipeBase } from '../util/RecipeBase';

export interface RecipeLocalDto extends RecipeBase {
  readonly id: string;
  readonly title: string;
  readonly createdAt: string;
  /** should by default always be false. */
  readonly synced: boolean;
}
