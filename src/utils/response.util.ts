import { APIResponse, expect } from '@playwright/test';

export async function expectStatus(response: APIResponse, expectedStatus: number): Promise<void> {
  expect(response.status(), await response.text()).toBe(expectedStatus);
}

export async function parseJsonResponse<T>(response: APIResponse): Promise<T> {
  return (await response.json()) as T;
}
