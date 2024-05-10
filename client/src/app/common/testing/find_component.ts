import { Type } from '@angular/core'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

/**
 * Find and return the instance of a component within the provided fixture.
 *
 * @param fixture The `ComponentFixture` instance representing the test fixture.
 * @param type The type of the component to find.
 * @returns The instance of the found component.
 * @throws An error if the component is not found within the fixture.
 *
 * @example
 * const fixture = TestBed.createComponent(ParentComponent);
 * fixture.detectChanges();
 * const childComponent = findComponent(fixture, ChildComponent);
 *
 * @__PURE__
 */
export function findComponent<T>(
  fixture: ComponentFixture<unknown>,
  type: Type<T>
): T {
  return fixture.debugElement.query(By.directive(type)).componentInstance
}
