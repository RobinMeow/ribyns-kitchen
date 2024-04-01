import { TestBed } from '@angular/core/testing'

import { TokenStorage } from './token_storage'

describe('TokenStorage should', () => {
  let service: TokenStorage

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(TokenStorage)
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('be created', () => {
    expect(service).toBeTruthy()
  })

  it('store and retrieve a value', () => {
    expect(() => service.store('value')).not.toThrow()
    expect(service.retrieve()).toBe('value')
  })

  it('store only one value', () => {
    expect(() => service.store('value1')).not.toThrow()
    expect(() => service.store('value2')).not.toThrow()
    expect(service.retrieve()).toBe('value2')
  })

  it('clear the value', () => {
    expect(() => {
      service.store('value1')
      service.clear()
    }).not.toThrow()

    expect(service.retrieve()).toBe(null)
  })
})
