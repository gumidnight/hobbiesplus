/**
 * Email validation using a robust regex pattern.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitize a string to prevent XSS in CSV exports.
 */
export function sanitize(input: string): string {
  return input.replace(/[<>"'&]/g, "");
}
