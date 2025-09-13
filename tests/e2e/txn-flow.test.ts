import { test, expect } from '@playwright/test';

test.describe('TXN 交易日誌 E2E Flow', () => {
  test('新增/編輯交易、圖片上傳、查詢、KPI 顯示', async ({ page }) => {
    // 1. 首頁載入
    await page.goto('/');
    await expect(page).toHaveTitle(/TXN/);

    // 2. 新增交易（假設有「新增交易」按鈕）
    await page.click('button:has-text("新增交易")');
    await page.fill('input[name="symbol"]', 'AAPL');
    await page.fill('input[name="entry_price"]', '100');
    await page.fill('input[name="stop_loss"]', '90');
    await page.fill('input[name="take_profit"]', '120');
    // 模擬圖片拖放上傳
    // await page.setInputFiles('input[type="file"]', 'tests/e2e/mock.png');
    await page.click('button:has-text("儲存")');

    // 3. 查詢歷史紀錄
    await page.goto('/trade-history');
    await expect(page.locator('table')).toContainText('AAPL');

    // 4. KPI 與權益曲線顯示
    await page.goto('/dashboard');
    await expect(page.locator('.kpi-card')).toBeVisible();
    await expect(page.locator('.equity-curve')).toBeVisible();
  });
});
