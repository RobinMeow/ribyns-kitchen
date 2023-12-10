import { logAssertion } from './logAssertion';
import { logIfRecommendedMessageFormatIsNotMet } from './logIfRecommendedMessageFormatIsNotMet';

/**
 * prints out a message in red, to the console, if the condition is not met, and throw an error to break code flow.
 * @param str the string to check against
 * @param message the message to print out if the condition is not met.
 * @note Also removes itself from the stack trace.
 */
export function NotEmpty(str: string | undefined | null, message: string) {
  logIfRecommendedMessageFormatIsNotMet(message);
  if (str === null || str === undefined || str.length === 0) {
    logAssertion(message);
    const err = new DomainAssertionError(message);
    const stackTrace = err.stack!;
    let arr = stackTrace.split('\n');
    arr.splice(1, 1);
    err.stack = arr.join('\n');
    throw err;
  }
}
