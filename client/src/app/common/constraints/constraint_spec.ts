import { Constraint } from './constraint'
import { Validation } from './validation'

describe('Constraint', () => {
  const validationEnums = Object.keys(Validation).map((key) => <Validation>key)
  const dataTypes = ['string', 'number']

  describe(`constructor should work for`, () => {
    validationEnums.forEach((validation) => {
      it(validation, () => {
        const byReferenceValue = {}
        const constraint = new Constraint(validation, byReferenceValue)
        expect(constraint).toBeTruthy()
        expect(constraint.value).toBe(byReferenceValue)
        expect(constraint.validation).toBe(validation)
      })
    })
  })

  describe('getValidator should return ValiadtorFn', () => {
    dataTypes.forEach((dataType) => {
      validationEnums.forEach((validation) => {
        it(`for dataType '${dataType}' and valiadtion '${validation}'`, () => {
          const validator = new Constraint(validation, 1).getValidator(dataType)
          expect(validator).toBeTruthy()
          expect(typeof validator).toBe('function')
        })
      })
    })
  })
})
