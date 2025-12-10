import { test, expect } from '../support/fixtures';

test.describe('Reqres API', () => {
  test('lists users', async ({ apiClient }) => {
    const response = await apiClient.listUsers();
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.users)).toBeTruthy();
    expect(body.users.length).toBeGreaterThan(0);
  });

  test('creates, updates, and deletes a user', async ({ apiClient }) => {
    const createResponse = await apiClient.createUser('playwright-bot', 'qa');
    expect([200, 201]).toContain(createResponse.status());
    const created = await createResponse.json();
    expect(created.firstName).toBe('playwright-bot');

    const targetId = 1; // dummyjson guarantees seed users, keep id stable for update/delete
    const updateResponse = await apiClient.updateUser(targetId, { lastName: 'Updated' });
    expect(updateResponse.status()).toBe(200);
    const updated = await updateResponse.json();
    expect(updated.lastName).toBe('Updated');

    const deleteResponse = await apiClient.deleteUser(targetId);
    expect([200, 204]).toContain(deleteResponse.status());
  });
});

