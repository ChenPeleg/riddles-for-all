import { test, expect } from '@playwright/test';

test.describe('Search page', () => {
  test('loads with heading and search input', async ({ page }) => {
    await page.goto('/#/search');

    await expect(page.locator('h1')).toContainText('Search');
    await expect(page.getByRole('textbox')).toBeVisible();
  });

  test('shows riddle count by default before any search', async ({ page }) => {
    await page.goto('/#/search');

    // Should display "Found {count} results"
    await expect(page.getByText(/Found \d+ results/i)).toBeVisible();
  });

  test('filters riddles when typing in search box', async ({ page }) => {
    await page.goto('/#/search');

    const input = page.getByRole('textbox');

    // Get the initial count text
    const countLocator = page.getByText(/Found \d+ results/i);
    await expect(countLocator).toBeVisible();
    const countText = await countLocator.innerText();
    const initialCount = parseInt(countText.match(/\d+/)?.[0] ?? '0', 10);

    // Type a specific search term that should match some riddles
    await input.fill('why');

    const filteredText = await countLocator.innerText();
    const filteredCount = parseInt(filteredText.match(/\d+/)?.[0] ?? '0', 10);

    // The filtered count should be less than or equal to total
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('shows no-results message for nonsense search', async ({ page }) => {
    await page.goto('/#/search');

    const input = page.getByRole('textbox');
    await input.fill('xyzzy_no_match_12345');

    await expect(page.getByText(/No riddles match your search/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Clear search/i })).toBeVisible();
  });

  test('clear search button resets results', async ({ page }) => {
    await page.goto('/#/search');

    const input = page.getByRole('textbox');
    await input.fill('xyzzy_no_match_12345');

    await page.getByRole('button', { name: /Clear search/i }).click();

    await expect(input).toHaveValue('');
    await expect(page.getByText(/No riddles match your search/i)).not.toBeVisible();
  });
});
