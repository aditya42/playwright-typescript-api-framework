import { APIRequestContext, APIResponse } from '@playwright/test';

export class BaseApiClient {
  protected readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected get(endpoint: string): Promise<APIResponse> {
    return this.request.get(endpoint);
  }

  protected post(endpoint: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(endpoint, { data });
  }

  protected put(endpoint: string, data?: unknown): Promise<APIResponse> {
    return this.request.put(endpoint, { data });
  }

  protected patch(endpoint: string, data?: unknown): Promise<APIResponse> {
    return this.request.patch(endpoint, { data });
  }

  protected delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(endpoint);
  }
}
