import { test, expect } from '@playwright/test';

test.describe('Happy path tests', () => {
  test('navigation bar links navigate to correct pages', async ({ page }) => {
    await page.goto('/');

    // Use the header nav to avoid matching cards on the home page
    const headerNav = page.locator('header nav');

    // Click on Search nav link
    await headerNav.getByRole('link', { name: 'Search', exact: true }).click();
    await expect(page).toHaveURL(/#\/search/);
    await expect(page.locator('h1')).toContainText('Search');

    // Click on Categories nav link
    await headerNav.getByRole('link', { name: 'Categories', exact: true }).click();
    await expect(page).toHaveURL(/#\/categories/);
    await expect(page.locator('h1')).toContainText('Categories');

    // Click on Sources nav link
    await headerNav.getByRole('link', { name: 'Sources', exact: true }).click();
    await expect(page).toHaveURL(/#\/sources/);
    await expect(page.locator('h1')).toContainText('Sources');

    // Click Home nav link to go back
    await headerNav.getByRole('link', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(/#\//);
    await expect(page.locator('h1')).toContainText('Riddles');
  });

  test('search page loads and accepts search input', async ({ page }) => {
    await page.goto('/#/search');

    // Heading should be visible
    await expect(page.locator('h1')).toContainText('Search');

    // Search input should be present and functional
    const searchInput = page.getByPlaceholder(/Search riddles/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill('logic');

    // Results count should update
    await expect(page.getByText(/Found \d+ results/i)).toBeVisible();
  });

  test('categories page loads with category buttons', async ({ page }) => {
    await page.goto('/#/categories');

    // Heading should be visible
    await expect(page.locator('h1')).toContainText('Categories');

    // Wait for data to load - the "Select a category" prompt appears when categories are ready
    await expect(page.getByText('Select a category above')).toBeVisible({ timeout: 10000 });

    // Category buttons should be present (they have rounded-2xl styling and contain category names)
    const categoryButtons = page.locator('button').filter({ hasText: /#/ });
    const count = await categoryButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('selecting a category shows filtered riddles', async ({ page }) => {
    await page.goto('/#/categories');

    // Wait for the "Select a category" prompt which means data has loaded
    await expect(page.getByText('Select a category above')).toBeVisible({ timeout: 10000 });

    // Click the first category button
    const categoryButtons = page.locator('button').filter({ hasText: /#/ });
    await categoryButtons.first().click();

    // A riddle count label should appear (e.g., "2 riddles")
    await expect(page.getByText(/\d+ riddles/i).first()).toBeVisible();

    // At least one riddle card should be visible (has "Reveal Solution" button)
    await expect(page.getByText('Reveal Solution').first()).toBeVisible();
  });

  test('sources page loads with source links', async ({ page }) => {
    await page.goto('/#/sources');

    // Heading should be visible
    await expect(page.locator('h1')).toContainText('Sources');

    // Wait for data to load - source cards have "Source Book" label
    const sourceLabels = page.getByText('Source Book');
    await expect(sourceLabels.first()).toBeVisible({ timeout: 10000 });
    const count = await sourceLabels.count();
    expect(count).toBeGreaterThan(0);
  });

  test('theme toggle switches between light and dark mode', async ({ page }) => {
    // Clear stored theme preference
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('theme'));
    await page.reload();
    await expect(page.locator('h1')).toContainText('Riddles');

    const html = page.locator('html');

    // The theme button uses t('nav.dark_mode') for aria-label, but that key is not
    // in translations, so the raw key string is used as the accessible name.
    const themeToggle = page.locator('header').getByRole('button', { name: 'nav.dark_mode' }).first();
    await themeToggle.click();

    // Should now have 'dark' class on html
    await expect(html).toHaveClass(/dark/);

    // Now the label changes to 'nav.light_mode'
    const lightToggle = page.locator('header').getByRole('button', { name: 'nav.light_mode' }).first();
    await lightToggle.click();

    // Should no longer have 'dark' class
    await expect(html).not.toHaveClass(/dark/);
  });

  test('language toggle switches to Hebrew with RTL layout', async ({ page }) => {
    await page.goto('/');
    // Ensure we start in English
    await page.evaluate(() => localStorage.setItem('lang', 'en'));
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Click the language toggle (shows "עברית" text in English mode)
    await page.locator('header').getByText('עברית').first().click();

    // Should now be in Hebrew (RTL)
    await expect(page.locator('html')).toHaveAttribute('lang', 'he');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    // Hebrew heading should appear (contains "חידות")
    await expect(page.locator('h1')).toContainText('חידות');

    // Switch back to English (button now shows "English")
    await page.locator('header').getByText('English').first().click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('home page shows riddle of the moment section', async ({ page }) => {
    await page.goto('/');

    // "Riddle of the Moment" heading should be visible
    await expect(page.getByText('Riddle of the Moment')).toBeVisible();

    // Wait for riddle data to load, then a riddle card with "Reveal Solution" should appear
    await expect(page.getByText('Reveal Solution').first()).toBeVisible({ timeout: 10000 });
  });

  test('next riddle button loads a different riddle', async ({ page }) => {
    await page.goto('/');

    // Wait for a riddle to load
    await expect(page.getByText('Reveal Solution').first()).toBeVisible({ timeout: 10000 });

    // Get the current riddle text
    const riddleCard = page.locator('.card-hover').first();
    const initialText = await riddleCard.locator('h3').textContent();

    // Click the "Next" button multiple times to increase chance of getting a different riddle
    const nextButton = page.getByRole('button', { name: /Next/i });
    await expect(nextButton).toBeVisible();

    let changed = false;
    for (let i = 0; i < 5; i++) {
      await nextButton.click();
      const newText = await riddleCard.locator('h3').textContent();
      if (newText !== initialText) {
        changed = true;
        break;
      }
    }

    expect(changed).toBe(true);
  });

  test('footer is visible on the home page', async ({ page }) => {
    await page.goto('/');

    // Footer should be present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/version/i);
  });
});
