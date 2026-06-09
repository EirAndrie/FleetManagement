/**
 * Validates whether a input string (or array of strings) matches a regular expression.
 * 
 * @param input - A single string or an array of strings to validate.
 * @param regex - The RegExp pattern to test against.
 * @returns boolean - True if all inputs match the regex, false otherwise.
 */
export function isValidPattern<T extends string | string[]>(
  input: T, 
  regex: RegExp
): boolean {
  if (Array.isArray(input)) {
    return input.length > 0 && input.every(str => regex.test(str));
  }
  return regex.test(input);
}

// Regex for email pattern
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
