import { test, expect } from '@playwright/test';

test.describe('Categories page', () => {
  test('loads with heading and category buttons', async ({ page }) => {
    await page.goto('/#/categories');

    await expect(page.locator('h1')).toContainText('Categories');

    // There should be at least one category button
    const categoryButtons = page.locator('button').filter({ hasText: /#/ });
    await expect(categoryButtons.first()).toBeVisible();
  });

  test('shows select-prompt before any category is chosen', async ({ page }) => {
    await page.goto('/#/categories');

    // The empty state prompt is shown when no category is selected
    await expect(page.getByText(/select a category/i)).toBeVisible();
  });

  test('clicking a category shows riddles for that category', async ({ page }) => {
    await page.goto('/#/categories');

    // Click the first available category button
    const firstButton = page.locator('button').filter({ hasText: /#/ }).first();
    const categoryName = await firstButton.innerText();
    await firstButton.click();

    // The empty state should disappear
    await expect(page.getByText(/select a category/i)).not.toBeVisible();

    // A riddle count header should appear
    await expect(page.getByText(/riddles?/i).last()).toBeVisible();

    // At least one riddle card should show a "Reveal Solution" button
    const revealButtons = page.getByRole('button', { name: /Reveal Solution/i });
    expect(await revealButtons.count()).toBeGreaterThan(0);

    // Category name should appear somewhere on the page
    const cleanName = categoryName.replace('#', '').trim();
    if (cleanName) {
      await expect(page.getByRole('heading', { level: 2 })).toContainText(cleanName);
    }
  });

  test('clicking the same category again deselects it', async ({ page }) => {
    await page.goto('/#/categories');

    const firstButton = page.locator('button').filter({ hasText: /#/ }).first();
    await firstButton.click();

    // Riddles are now shown
    await expect(page.getByText(/select a category/i)).not.toBeVisible();

    // Click again to deselect
    await firstButton.click();

    // Empty state prompt should reappear
    await expect(page.getByText(/select a category/i)).toBeVisible();
  });
});
