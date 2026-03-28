import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navbar links navigate to correct pages', async ({ page }) => {
    await page.goto('/');

    // Target the desktop nav inside the header (not the mobile dialog nav)
    const headerNav = page.locator('header nav').first();

    // Navigate to Search via navbar
    await headerNav.getByRole('link', { name: 'Search', exact: true }).click();
    await expect(page).toHaveURL(/#\/search/);
    await expect(page.locator('h1')).toContainText('Search');

    // Navigate to Categories via navbar
    await headerNav.getByRole('link', { name: 'Categories', exact: true }).click();
    await expect(page).toHaveURL(/#\/categories/);
    await expect(page.locator('h1')).toContainText('Categories');

    // Navigate to Sources via navbar
    await headerNav.getByRole('link', { name: 'Sources', exact: true }).click();
    await expect(page).toHaveURL(/#\/sources/);
    await expect(page.locator('h1')).toContainText('Sources');

    // Navigate back Home via navbar
    await headerNav.getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.locator('h1')).toContainText('Riddles');
  });

  test('back-to-home link works from Search page', async ({ page }) => {
    await page.goto('/#/search');
    await page.getByRole('link', { name: /Back to Home/i }).click();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.locator('h1')).toContainText('Riddles');
  });

  test('back-to-home link works from Categories page', async ({ page }) => {
    await page.goto('/#/categories');
    await page.getByRole('link', { name: /Back to Home/i }).click();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.locator('h1')).toContainText('Riddles');
  });

  test('back-to-home link works from Sources page', async ({ page }) => {
    await page.goto('/#/sources');
    await page.getByRole('link', { name: /Back to Home/i }).click();
    await expect(page).toHaveURL(/#\/$/);
    await expect(page.locator('h1')).toContainText('Riddles');
  });

  test('theme toggle switches between light and dark mode', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');

    // The theme button toggles between "Dark mode" and "Light mode" aria-labels
    const themeButton = page.getByRole('button', { name: /Dark mode|Light mode/i });
    await expect(themeButton).toBeVisible();

    const darkBefore = await html.evaluate(el => el.classList.contains('dark'));

    // Toggle the theme
    await themeButton.click();
    const darkAfter = await html.evaluate(el => el.classList.contains('dark'));

    // The dark class should have toggled
    expect(darkAfter).not.toBe(darkBefore);
  });
});
