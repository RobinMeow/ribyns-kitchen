import { FieldConstraints, Validations } from '@common/validations'

export class RecipeValidations {
  private readonly validations: Readonly<Validations>

  constructor(validations: Readonly<Validations>) {
    this.validations = validations
  }

  title(): Readonly<FieldConstraints> {
    return this.validations['title']
  }
}
