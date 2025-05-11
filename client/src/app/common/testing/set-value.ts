/**
 * Sets the value of an HTMLInputElement and triggers an 'input' event.
 * To make testing easier and less boilerplatey.
 *
 * @param input The HTMLInputElement whose value will be updated.
 * @param newValue The new value to set for the input element.
 *
 * @example
 * const inputElement = document.querySelector('input[type="text"]');
 * setValue(inputElement, 'New Value');
 *
 * @__PURE__
 */
export function setValue(input: HTMLInputElement, newValue: string) {
  input.value = newValue
  input.dispatchEvent(new Event('input'))
}
