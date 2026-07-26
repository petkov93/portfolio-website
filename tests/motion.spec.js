import { test, expect } from '@playwright/test';

test.describe('Motion layer', () => {
  test('enables motion effects when reduced motion is not preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');

    await expect(page.locator('html')).toHaveClass(/motion-enabled/);
    await expect(page.locator('[data-testid="motion-background"]')).toBeAttached();
    await expect(page.locator('[data-testid="motion-particles"]')).toBeAttached();
    await expect(page.locator('[data-testid="motion-glow"]')).toBeAttached();
  });

  test('marks sections for scroll reveal', async ({ page }) => {
    await page.goto('/');
    const sections = page.locator('main .section[data-motion-reveal]');
    await expect(sections).toHaveCount(7);
  });

  test('disables Lenis, particles, and mouse glow when reduced motion is preferred', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    await expect(page.locator('html')).toHaveClass(/motion-reduced/);
    await expect(page.locator('html')).not.toHaveClass(/motion-enabled/);
    await expect(page.locator('html')).toHaveAttribute('data-lenis-active', 'false');
    await expect(page.locator('[data-testid="motion-particles"]')).toHaveAttribute(
      'data-active',
      'false'
    );
    await expect(page.locator('[data-testid="motion-glow"]')).toHaveAttribute(
      'data-active',
      'false'
    );
  });

  test('shows section content immediately under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    for (const id of [
      'hero',
      'about',
      'current-mission',
      'projects',
      'tech-stack',
      'education',
      'contact',
    ]) {
      await expect(page.locator(`#${id}`)).toHaveClass(/is-revealed/);
    }
  });

  test('navigation remains usable with smooth scroll enabled', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');

    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
    await expect(page.locator('#projects')).toBeInViewport();
  });
});
