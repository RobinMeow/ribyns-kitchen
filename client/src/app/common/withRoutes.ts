import { Route } from '@angular/router'

/** @__PURE__ */
export function withRoutes(...routes: Route[][]): Route[] {
  return routes.flat()
}
