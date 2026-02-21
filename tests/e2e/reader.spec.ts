import { test, expect } from '@playwright/test';

test('reading a riddle book works', async ({ page }) => {
  // 1. Go to sources
  await page.goto('/#/sources');

  // 2. Select "Sample Riddles Collection"
  const bookLink = page.getByText('Sample Riddles Collection').first();
  await bookLink.click();

  // 3. Verify we are on page 1
  await expect(page).toHaveURL(/.*\/books\/sample-riddles-collection.*/);
  // The UI shows "1 / 21"
  await expect(page.getByText(/1 \/ \d+/i)).toBeVisible();
  await expect(page.getByText(/What has keys but no locks/i)).toBeVisible();

  // 4. Go to page 2
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText(/2 \/ \d+/i)).toBeVisible();
  await expect(page.getByText(/What comes once in a minute/i)).toBeVisible();

  // 5. Go to page 3
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText(/3 \/ \d+/i)).toBeVisible();
  await expect(page.getByText(/What has a head and a tail/i)).toBeVisible();

  // 6. Go back to page 2
  await page.getByRole('button', { name: 'Prev' }).click();
  await expect(page.getByText(/2 \/ \d+/i)).toBeVisible();
  await expect(page.getByText(/What comes once in a minute/i)).toBeVisible();
});
