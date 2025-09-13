import { test, expect } from '@playwright/test';

test('首頁載入效能 < 2s', async ({ page }) => {
  const start = Date.now();
  await page.goto('/');
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(2000);
});
