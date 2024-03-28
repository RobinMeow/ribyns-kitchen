import { Route } from '@angular/router'

export function withRoutes(...routes: Route[][]): Route[] {
  return routes.flat()
}
