import { NotUndefinedPipe } from './not_undefined_pipe'

describe('NotUndefinedPipe should', () => {
  let pipe: NotUndefinedPipe

  beforeEach(() => {
    pipe = new NotUndefinedPipe()
  })

  it('create', () => {
    expect(pipe).toBeTruthy()
  })

  it('return input if not undefined', () => {
    const input = 'Hello'
    expect(pipe.transform(input)).toEqual(input)
  })

  it('throw error if input is undefined', () => {
    const input = undefined
    expect(() => pipe.transform(input)).toThrowError(
      'obj may not be undefined.'
    )
  })

  it('remove undefined from type', () => {
    const input: undefined | string = 'Hello'
    const newVal = pipe.transform(input) // if you hover over 'newVal' it shoudl say 'string' without undefined
    expect(typeof newVal === 'string').toBeTrue()
  })
})
