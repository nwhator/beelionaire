import { test, expect } from '@playwright/test'

test('homepage has title and CTA', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await expect(page.locator('h2')).toContainText('Who Wants to Be a Beelionaire')
  await expect(page.locator('a', { hasText: 'Play & Earn' })).toBeVisible()
})
