import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from './config';

export class DemoApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async listUsers(): Promise<APIResponse> {
    return this.request.get(`${config.urls.api}/users`, { params: { limit: 5 } });
  }

  async createUser(name: string, job: string): Promise<APIResponse> {
    return this.request.post(`${config.urls.api}/users/add`, {
      data: { firstName: name, lastName: 'Tester', company: job },
    });
  }

  async updateUser(id: number, payload: Record<string, unknown>): Promise<APIResponse> {
    return this.request.put(`${config.urls.api}/users/${id}`, { data: payload });
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return this.request.delete(`${config.urls.api}/users/${id}`);
  }
}

