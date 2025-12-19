import { expect, Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../support/config';

type Filter = 'All' | 'Active' | 'Completed';

export class TodoPage extends BasePage {
  private readonly todoInput: Locator;
  private readonly todoItems: Locator;
  private readonly toggleAll: Locator;
  private readonly clearCompletedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.todoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.getByTestId('todo-item');
    this.toggleAll = page.getByLabel('Mark all as complete');
    this.clearCompletedButton = page.getByRole('button', { name: 'Clear completed' });
  }

  async goto() {
    await this.page.goto(config.urls.todo);
    await expect(this.todoInput).toBeVisible();
  }

  async addTodo(label: string) {
    await this.todoInput.fill(label);
    await this.todoInput.press('Enter');
  }

  async addTodos(labels: string[]) {
    for (const label of labels) {
      await this.addTodo(label);
    }
  }

  async toggleTodoByIndex(index: number) {
    await this.todoItems.nth(index).getByRole('checkbox').check();
  }

  async editTodoByIndex(index: number, value: string) {
    const item = this.todoItems.nth(index);
    await item.dblclick();
    const editBox = item.getByRole('textbox', { name: 'Edit' });
    await expect(editBox).toBeVisible();
    await editBox.fill(value);
    await editBox.press('Enter');
  }

  async filterBy(filter: Filter) {
    await this.page.getByRole('link', { name: filter }).click();
  }

  async clearCompleted() {
    if (await this.clearCompletedButton.isVisible()) {
      await this.clearCompletedButton.click();
    }
  }

  async assertVisibleTodos(expected: string[]) {
    await expect(this.todoItems).toHaveText(expected);
  }

  async assertCount(expected: number) {
    await expect(this.todoItems).toHaveCount(expected);
  }
}

