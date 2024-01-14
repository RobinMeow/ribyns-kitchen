import { true_checked } from './true_checked';

/**
 * prints out a message in red, to the console, if the condition is not met, and throw an error to break code flow.
 * @param condition the condition to check against
 * @param message the message to print out if the condition is not met.
 * @note Also removes itself from the stack trace.
 */
export function false_checked(condition: boolean, message: string): void {
  true_checked(!condition, message);
}
