export class DomainAssertionError extends Error {
  constructor(message: string) {
    super('[DomainAssertionError] ' + message)
  }
}
