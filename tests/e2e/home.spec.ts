import { test, expect } from '@playwright/test';

test('homepage has title and links to search', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Riddles/);

  // Check for the main heading
  // The heading is "Riddles Collection" but it might be split into multiple elements
  const heading = page.locator('h1');
  await expect(heading).toContainText('Riddles');
  await expect(heading).toContainText('Collection');

  // Check for the Search link - there are multiple (nav and card), so we check if at least one is visible
  const searchLinks = page.getByRole('link', { name: /Search/i });
  await expect(searchLinks.first()).toBeVisible();
});
