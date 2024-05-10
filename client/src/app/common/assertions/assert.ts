/**
 * Asserts that a condition is true. Throws an error with the given message if the condition is false.
 *
 * @param condition The condition to assert. If false, an error will be thrown.
 * @param msg An error message to include in the thrown error.
 *
 * @example
 * // Usage example for condition true
 * const value = 10;
 * assert(value > 0, 'Value must be positive.');
 * console.log('Value is positive');
 *
 * // Output:
 * // Value is positive.
 *
 * // Usage example for condition false
 * const value = 10;
 * try {
 *   assert(value < 0, 'Value must be negative.')
 * } catch (error) {
 *   console.error(error)
 * }
 * // Output:
 * // Value must be negative.
 *
 * // Usage for types
 * const value: number = Number('10') // type is number
 * assert(value === 10, 'Value must be 10.')
 * if (value + 5) { // hovering over value will show '10' and not 'number'
 *   // ...
 * }
 *
 * // Usage for type narrowing
 * const value: { name: string; } | null = null
 * assert(value !== null, 'Value may not be null.') // will throw an error
 * console.log(value.name); // Non-null assertion operator not required onwards
 *
 * @__PURE__
 */
export function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) throw new Error(msg)
}
