/**
 * prints out a message in red, to the console, if the condition is not met, and throw an error to break code flow.
 * @param condition the condition to check against
 * @param message the message to print out if the condition is not met.
 * @note Also removes itself from the stack trace.
 */
export function True(condition: boolean, message: string) {
  logIfRecommendedMessageFormatIsNotMet(message);
  if (!condition) {
    logAssertion(message);
    const err = new DomainAssertionError(message);
    const stackTrace = err.stack!;
    let arr = stackTrace.split('\n');
    arr.splice(1, 1);
    err.stack = arr.join('\n');
    throw err;
  }
}
