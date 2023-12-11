export * from './auth.service';
import { AuthService } from './auth.service';
export * from './recipe.service';
import { RecipeService } from './recipe.service';
export const APIS = [AuthService, RecipeService];
