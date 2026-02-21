import { test, expect } from '@playwright/test';

test('homepage has title and main sections', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Riddles/);

  // Check for the main heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('Riddles');
  await expect(heading).toContainText('Collection');

  // Check for the tagline
  await expect(page.getByText('The Ultimate Brain Teasers')).toBeVisible();

  // Check for the "Riddle of the Moment" section
  await expect(page.getByText('Riddle of the Moment')).toBeVisible();

  // Check for navigation cards
  await expect(page.getByRole('heading', { name: 'Search' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Categories' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sources' })).toBeVisible();
});

test('homepage shows a random riddle', async ({ page }) => {
  await page.goto('/');

  // Since we have data in assets, a riddle should be visible
  // The RiddleCard displays the riddle text in an h3
  const riddleText = page.locator('h3').first();
  await expect(riddleText).toBeVisible();

  const text = await riddleText.innerText();
  expect(text.length).toBeGreaterThan(0);
});
