export function logIfRecommendedMessageFormatIsNotMet(message: string) {
  console.assert(message.endsWith('.'), 'assertions should end with a period.');
  console.assert(
    !message.startsWith(' '),
    'assertions should not start with white space.',
  );
  console.assert(
    message.trim().length === message.length,
    'assertions should not contains leading or trailing white space.',
  );
}
