import { DomainAssertionError } from './DomainAssertionError'
import { logAssertion } from './logAssertion'
import { logIfRecommendedMessageFormatIsNotMet } from './logIfRecommendedMessageFormatIsNotMet'
import { removeLastStackTraceEntry } from './removeLastStackTraceEntry'

/**
 * prints out a message in red, to the console, if the condition is not met, and throw an error to break code flow.
 * @param condition the condition to check against
 * @param message the message to print out if the condition is not met.
 * @note Also removes itself from the stack trace.
 */
export function true_checked(condition: boolean, message: string) {
  logIfRecommendedMessageFormatIsNotMet(message)
  if (!condition) {
    logAssertion(message)
    const err = new DomainAssertionError(message)
    removeLastStackTraceEntry(err)
    throw err
  }
}
