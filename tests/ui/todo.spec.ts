import { test, expect } from '../support/fixtures';

const SAMPLE_TODOS = ['Refine POM layer', 'Add reporting', 'Ship CI schedule'];

test.describe('TodoMVC UI (POM + commands)', () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.goto();
  });

  test('create, complete, and filter todos', async ({ todoPage }) => {
    await todoPage.addTodos(SAMPLE_TODOS);
    await todoPage.assertCount(3);

    await todoPage.toggleTodoByIndex(0);
    await todoPage.filterBy('Completed');
    await todoPage.assertVisibleTodos([SAMPLE_TODOS[0]]);

    await todoPage.filterBy('Active');
    await todoPage.assertVisibleTodos(SAMPLE_TODOS.slice(1));
  });

  test('edit and clear completed items', async ({ todoPage }) => {
    await todoPage.addTodos(SAMPLE_TODOS);
    await todoPage.editTodoByIndex(1, 'Add Allure');
    await todoPage.assertVisibleTodos(['Refine POM layer', 'Add Allure', 'Ship CI schedule']);

    await todoPage.toggleTodoByIndex(2);
    await todoPage.clearCompleted();
    await todoPage.assertCount(2);
    await todoPage.assertVisibleTodos(['Refine POM layer', 'Add Allure']);
  });
});

