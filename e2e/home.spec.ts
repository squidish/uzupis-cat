import { test, expect } from '@playwright/test';

test('homepage shows visitor count and scratch button', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'Užupis Cat — Retro Tribute' }),
  ).toBeVisible();
  await expect(page.getByText(/Visitor #/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Scratch Ear' })).toBeVisible();
});
