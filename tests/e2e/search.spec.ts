import { test, expect } from '@playwright/test';

test('search functionality works', async ({ page }) => {
  await page.goto('/#/search');

  // Verify search page heading
  await expect(page.getByRole('heading', { name: /Search Riddles/i })).toBeVisible();

  // Search for "keys"
  const searchInput = page.getByPlaceholder(/Search riddles.../i);
  await searchInput.fill('keys');

  // Verify results count
  await expect(page.getByText(/Found \d+ results/i)).toBeVisible();

  // Verify the riddle is visible
  await expect(page.getByText(/What has keys but no locks/i)).toBeVisible();

  // Search for something that doesn't exist
  await searchInput.fill('nonexistentriddle');
  await expect(page.getByText('Found 0 results')).toBeVisible();
  await expect(page.getByText('No riddles match your search.')).toBeVisible();

  // Clear search
  await page.getByRole('button', { name: /Clear search/i }).click();
  await expect(searchInput).toHaveValue('');
});
