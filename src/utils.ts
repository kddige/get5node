export function validateRegex(value: string, regex: RegExp): boolean {
  return regex.test(value);
}
