import { ActivatedRouteSnapshot } from '@angular/router'
import { ResolvedDataFake } from './with_resolved_data'

/** @__PURE__ */
export function fakeSnapshot(
  ...resolvedData: ResolvedDataFake<unknown>[]
): ActivatedRouteSnapshot {
  const data: { [key: string]: unknown } = {}
  for (const fake of resolvedData) {
    data[fake.key] = fake.data
  }
  return Object.freeze({ data } as ActivatedRouteSnapshot)
}
