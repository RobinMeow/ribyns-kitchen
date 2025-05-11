import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'notUndefined' })
export class NotUndefinedPipe implements PipeTransform {
  transform<T>(obj: T | undefined): T {
    if (obj === undefined) throw new Error('obj may not be undefined.')
    return obj
  }
}
