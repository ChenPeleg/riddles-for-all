import { test, expect } from '@playwright/test';

test.describe('Sources page', () => {
  test('loads with heading and source book cards', async ({ page }) => {
    await page.goto('/#/sources');

    await expect(page.locator('h1')).toContainText('Sources');

    // At least one book card link should be present — each wraps a "Source Book" label
    const bookCards = page.getByRole('link').filter({ hasText: /Source Book/i });
    expect(await bookCards.count()).toBeGreaterThan(0);
  });

  test('displays "Source Book" labels on cards', async ({ page }) => {
    await page.goto('/#/sources');

    // Each book card shows the "Source Book" label from the translation
    const sourceLabels = page.getByText('Source Book');
    expect(await sourceLabels.count()).toBeGreaterThan(0);
  });

  test('clicking a source card navigates to the book reader', async ({ page }) => {
    await page.goto('/#/sources');

    // Click the first book card link
    const firstCard = page.getByRole('link').filter({ hasText: /Source Book/i }).first();
    await firstCard.click();

    // URL should contain /books/
    await expect(page).toHaveURL(/#\/books\//);
  });
});
