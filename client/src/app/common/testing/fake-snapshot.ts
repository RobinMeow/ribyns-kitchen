import { ActivatedRouteSnapshot } from '@angular/router'
import { ResolvedDataFake } from './with-resolved-data'

export function fakeSnapshot(
  ...resolvedData: ResolvedDataFake<unknown>[]
): ActivatedRouteSnapshot {
  const data: Record<string, unknown> = {}
  for (const fake of resolvedData) {
    data[fake.key] = fake.data
  }
  return Object.freeze({ data } as ActivatedRouteSnapshot)
}
