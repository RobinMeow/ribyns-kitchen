import { assert } from './assert'

describe('assert should', () => {
  it('throw error for false condition', () => {
    expect(() => assert(false, 'error message')).toThrowError()
  })

  const errorMessages = ['ABC', 'sentence with spaces', '', ' ']
  errorMessages.forEach((testCase: string) => {
    it(`should contain error message '${testCase}' when thrown`, () => {
      expect(() => assert(false, testCase)).toThrowError(testCase)
    })
  })

  it('not throw for true condition', () => {
    expect(() => assert(true, '')).not.toThrowError()
  })

  it('throw for undefined', () => {
    expect(() => assert(undefined, '')).toThrowError()
  })

  it('throw for null', () => {
    expect(() => assert(null, '')).toThrowError()
  })

  it('throw for empty string', () => {
    expect(() => assert('', '')).toThrowError()
  })
})
