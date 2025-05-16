import { FieldConstraints, Validations } from '@common/validations'

export class RecipeValidations {
  private readonly validations: Readonly<Validations>

  constructor(validations: Readonly<Validations>) {
    this.validations = validations
  }

  name(): Readonly<FieldConstraints> {
    return this.validations['name']
  }
}
