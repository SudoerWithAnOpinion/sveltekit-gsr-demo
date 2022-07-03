import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/');
    const navBar = page.locator('div header nav');
    await expect(navBar).toBeVisible();
});