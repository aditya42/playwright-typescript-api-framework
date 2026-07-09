export function randomId(prefix = 'api-test'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10_000)}`;
}
