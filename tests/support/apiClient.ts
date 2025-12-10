import { APIRequestContext, APIResponse } from '@playwright/test';

const BASE_URL = process.env.BASE_URL_API || 'https://dummyjson.com';

export class DemoApiClient {
  constructor(private readonly request: APIRequestContext) {}

  async listUsers(): Promise<APIResponse> {
    return this.request.get(`${BASE_URL}/users`, { params: { limit: 5 } });
  }

  async createUser(name: string, job: string): Promise<APIResponse> {
    return this.request.post(`${BASE_URL}/users/add`, {
      data: { firstName: name, lastName: 'Tester', company: job },
    });
  }

  async updateUser(id: number, payload: Record<string, unknown>): Promise<APIResponse> {
    return this.request.put(`${BASE_URL}/users/${id}`, { data: payload });
  }

  async deleteUser(id: number): Promise<APIResponse> {
    return this.request.delete(`${BASE_URL}/users/${id}`);
  }
}

