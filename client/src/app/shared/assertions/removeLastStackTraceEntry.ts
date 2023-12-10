import { DomainAssertionError } from './DomainAssertionError';

export function removeLastStackTraceEntry(err: DomainAssertionError): void {
  const stackTrace = err.stack!;
  let arr = stackTrace.split('\n');
  arr.splice(1, 1);
  err.stack = arr.join('\n');
}
