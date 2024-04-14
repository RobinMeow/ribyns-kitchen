import { FieldConstraints, Validations } from '@common/validations'

export class ChefValidations {
  private readonly validations: Readonly<Validations>

  constructor(validations: Readonly<Validations>) {
    this.validations = validations
  }

  name(): Readonly<FieldConstraints> {
    return this.validations['name']
  }

  password(): Readonly<FieldConstraints> {
    return this.validations['password']
  }

  email(): Readonly<FieldConstraints> {
    return this.validations['email']
  }
}
