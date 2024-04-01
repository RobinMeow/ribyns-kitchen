import { RecipeDto } from './recipe_dto'

export class Recipe {
  constructor(dto: RecipeDto) {
    this.id = dto.id
    this.title = dto.title
  }

  readonly id: string
  readonly title: string /** read-only for now, but prolly will be editable, once the ui is there for it. */
}
