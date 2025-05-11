import { ConstraintsFakeBuilder } from './constraints_fake_builder'

describe('ConstraintsFakeBuilder should', () => {
  let builder: ConstraintsFakeBuilder

  beforeEach(() => {
    builder = new ConstraintsFakeBuilder('fieldName')
  })

  it('create', () => {
    expect(builder).toBeDefined()
  })

  it('set required constraint', () => {
    const constraints = builder.required().build()
    expect(constraints.required).toBe(true)
  })

  it('set min constraint', () => {
    const constraints = builder.min(5).build()
    expect(constraints.min).toBe(5)
  })

  it('set max constraint', () => {
    const constraints = builder.max(10).build()
    expect(constraints.max).toBe(10)
  })

  it('set all constraints', () => {
    const constraints = builder.min(3).max(6).required().build()
    expect(constraints.min).toBe(3)
    expect(constraints.max).toBe(6)
    expect(constraints.required).toBe(true)
  })

  it('throw when build() is called too early', () => {
    expect(() => builder.build()).toThrowError()
  })
})
