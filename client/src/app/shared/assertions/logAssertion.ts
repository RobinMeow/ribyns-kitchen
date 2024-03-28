export function logAssertion(message: string): void {
  console.log(
    '%c[Assertion]: %c' + message,
    'color: red; font-weight: 600; font-size: 1rem;',
    'color: red;'
  )
}
