import { True } from './True';

/**
 * prints out a message in red, to the console, if the condition is not met, and throw an error to break code flow.
 * @param condition the condition to check against
 * @param message the message to print out if the condition is not met.
 * @note Also removes itself from the stack trace.
 */
export function False(condition: boolean, message: string): void {
  True(!condition, message);
}
