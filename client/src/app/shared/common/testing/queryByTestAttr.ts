import { ComponentFixture } from '@angular/core/testing'

/**
 * @__PURE__
 * Utility function to query elements by data-test attribute.
 * This function is pure as it doesn't modify any external state or have side effects.
 * @param {ComponentFixture<any>} fixture - The fixture for the component being tested.
 * @param {string} selector - The data-test attribute value to query.
 * @returns {T} The DOM element matching the provided data-test attribute.
 */
export function queryByTestAttr<T>(
  fixture: ComponentFixture<unknown>,
  selector: string
): T {
  return fixture.nativeElement.querySelector(`[data-test-${selector}]`)
}
