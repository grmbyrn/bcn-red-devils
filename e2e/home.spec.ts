import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads without error', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('shows hero title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('hero-heading')).toBeVisible({ timeout: 15000 });
  });
});