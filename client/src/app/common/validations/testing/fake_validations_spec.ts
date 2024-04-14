import { FieldConstaintsFake } from './constraints_fake_builder'
import { fakeValidations } from './fake_validations'

describe('fakeValidations should', () => {
  it('return empty validations when no constraints provided', () => {
    const validations = fakeValidations([])
    expect(Object.keys(validations).length).toBe(0)
  })

  it('freeze the returned validations object', () => {
    const validations = fakeValidations([
      { fieldName: 'testField', required: true }
    ])
    expect(Object.isFrozen(validations)).toBe(true)
  })

  it('freeze the individual field constraints', () => {
    const validations = fakeValidations([
      { fieldName: 'testField', required: true }
    ])
    expect(Object.isFrozen(validations['testField'])).toBe(true)
  })

  it('generate validations for each field constraint', () => {
    const constraints: FieldConstaintsFake[] = [
      { fieldName: 'field1', required: true },
      { fieldName: 'field2', required: false, min: 0 },
      { fieldName: 'field3', required: false, max: 10 },
      { fieldName: 'field4', required: false, min: 5, max: 15 }
    ]
    const validations = fakeValidations(constraints)

    expect(validations['field1']).toEqual({
      required: true,
      min: undefined,
      max: undefined
    })
    expect(validations['field2']).toEqual({
      required: false,
      min: 0,
      max: undefined
    })
    expect(validations['field3']).toEqual({
      required: false,
      min: undefined,
      max: 10
    })
    expect(validations['field4']).toEqual({ required: false, min: 5, max: 15 })
  })
})
