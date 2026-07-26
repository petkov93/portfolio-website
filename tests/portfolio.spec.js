import { test, expect } from '@playwright/test';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'current-mission', label: 'Mission' },
  { id: 'projects', label: 'Projects' },
  { id: 'tech-stack', label: 'Tech Stack' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

test.describe('Portfolio page behavior', () => {
  test('loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('renders all seven sections with landmark headings', async ({ page }) => {
    await page.goto('/');
    for (const { id } of SECTIONS) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test('sticky navigation jumps to each section', async ({ page }) => {
    await page.goto('/');
    for (const { id, label } of SECTIONS) {
      await page.getByRole('navigation').getByRole('link', { name: label }).click();
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  });

  test('hero shows name, title, tagline, and monogram avatar', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Petko Petkov');
    await expect(hero.getByText('Backend Developer')).toBeVisible();
    await expect(
      hero.getByText('Building practical software that solves real-world problems')
    ).toBeVisible();
    await expect(hero.locator('[data-testid="monogram-avatar"]')).toHaveText('PP');
  });

  test('about includes strengths, improvements, and career transition', async ({ page }) => {
    await page.goto('/');
    const about = page.locator('#about');
    await expect(about.getByText('Strengths')).toBeVisible();
    await expect(about.getByText('Areas for Improvement')).toBeVisible();
    await expect(about.getByText(/transitioned from non-IT work/i)).toBeVisible();
  });

  test('finance tracker is featured with live demo and github links', async ({ page }) => {
    await page.goto('/');
    const flagship = page.locator('[data-testid="project-card-flagship"]');
    await expect(flagship.getByRole('heading')).toHaveText('Finance Tracker');
    await expect(flagship.getByRole('link', { name: /live demo/i })).toBeVisible();
    await expect(flagship.getByRole('link', { name: /github/i })).toBeVisible();
  });

  test('smaller projects expose github links only', async ({ page }) => {
    await page.goto('/');
    const standardCards = page.locator('[data-testid="project-card-standard"]');
    await expect(standardCards).toHaveCount(3);
    for (const card of await standardCards.all()) {
      await expect(card.getByRole('link', { name: /github/i })).toBeVisible();
      await expect(card.getByRole('link', { name: /live demo/i })).toHaveCount(0);
    }
  });

  test('contact surface exposes email, github, and cv download', async ({ page }) => {
    await page.goto('/');
    const contact = page.locator('#contact');
    await expect(contact.getByRole('link', { name: /email/i })).toHaveAttribute(
      'href',
      'mailto:petkow93@proton.me'
    );
    await expect(contact.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/petkov93'
    );
    await expect(contact.getByRole('link', { name: /download cv/i })).toBeVisible();
    await expect(contact.getByRole('form')).toHaveCount(0);
  });

  test('mobile navigation is usable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const navToggle = page.getByRole('button', { name: /menu/i });
    await expect(navToggle).toBeVisible();
    await navToggle.click();
    await page.getByRole('navigation').getByRole('link', { name: 'Projects' }).click();
    await expect(page.locator('#projects')).toBeInViewport();
  });
});
