/** @__PURE__ */
export type FieldConstaintsFake = {
  fieldName: string
  min?: number
  max?: number
  required: boolean
}

/** @__PURE__ */
export class ConstraintsFakeBuilder {
  private readonly fake: FieldConstaintsFake = {
    fieldName: '',
    required: false,
    max: undefined,
    min: undefined
  }

  constructor(fieldName: string) {
    this.fake.fieldName = fieldName
  }

  required(): ConstraintsFakeBuilder {
    this.fake.required = true
    return this
  }

  min(value: number): ConstraintsFakeBuilder {
    this.fake.min = value
    return this
  }

  max(value: number): ConstraintsFakeBuilder {
    this.fake.max = value
    return this
  }

  build(): FieldConstaintsFake {
    const f = this.fake
    if (f.required === false && f.max === undefined && f.min === undefined)
      throw new Error(
        'Constraints(Fake)Builder is not meant to be used to create zero constraints.'
      )

    return this.fake
  }
}
