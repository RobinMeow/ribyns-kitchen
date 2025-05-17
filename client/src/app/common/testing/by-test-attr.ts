import { ComponentFixture } from '@angular/core/testing'

/**
 * Queries the native element of a component fixture for an element with a specific test attribute.
 * This function is useful for finding elements in the component's template that have been marked
 * with custom data-test attributes for testing purposes.
 *
 * @param fixture The ComponentFixture representing the component under test.
 * @param testid The value assigned to the test attribute `data-test="the-value"`.
 * @returns The first matching element found in the component's template, or null if not found.
 *
 * @example
 * // Assumed html: <div data-test="example"></div>
 * const div = queryByTestAttr<HTMLButtonElement>(fixture, 'example');
 * expect(div)toBeTruthy();
 */
export function byTestAttr<T>(
  fixture: ComponentFixture<unknown>,
  testid: string
): T {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return fixture.nativeElement.querySelector(`[data-test="${testid}"]`) as T
}
