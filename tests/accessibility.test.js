import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.resolve(__dirname, '../public/index.html');

describe('Accessibility & Semantic HTML Compliance Tests', () => {
  const html = fs.readFileSync(htmlPath, 'utf8');

  test('index.html has DOCTYPE, lang="en", title, and meta description', () => {
    assert.ok(html.includes('<!DOCTYPE html>'), 'Must have HTML5 DOCTYPE');
    assert.ok(html.includes('<html lang="en">'), 'Must have language attribute');
    assert.ok(html.includes('<title>'), 'Must have descriptive <title>');
    assert.ok(html.includes('meta name="description"'), 'Must have SEO meta description');
  });

  test('index.html includes accessible skip link targeting #main-content', () => {
    assert.ok(html.includes('class="skip-link"'), 'Must include skip-link');
    assert.ok(html.includes('href="#main-content"'), 'Skip-link must target #main-content');
    assert.ok(html.includes('id="main-content"'), 'Main element must have id="main-content"');
  });

  test('Semantic landmarks exist (<header>, <nav>, <main>, <dialog>)', () => {
    assert.ok(html.includes('<header class="app-header" role="banner">'), 'Semantic <header> landmark present');
    assert.ok(html.includes('<nav class="app-nav" aria-label="Main Navigation">'), 'Semantic <nav> landmark with aria-label present');
    assert.ok(html.includes('<main id="main-content" class="app-main" role="main">'), 'Semantic <main> landmark present');
    assert.ok(html.includes('<dialog id="app-modal"'), 'Native <dialog> element present');
  });

  test('Heading hierarchy starts with a single <h1> and structured <h2>', () => {
    const h1Matches = html.match(/<h1[\s>]/g);
    assert.equal(h1Matches.length, 1, 'There must be exactly one <h1> heading on the page');
    assert.ok(html.includes('<h2 class="hero-title">'), 'Hero has <h2>');
    assert.ok(html.includes('<h2 class="view-title">'), 'Sub-views have <h2>');
  });

  test('All primary form inputs have associated <label for="...">', () => {
    const inputIds = [
      'prof-branch',
      'prof-skills',
      'prof-interests',
      'prof-level',
      'prof-team-size',
      'prof-time',
      'prof-difficulty',
      'prof-goal',
      'rc-title',
      'rc-description',
      'rc-team',
      'rc-months',
      'imp-title',
      'imp-desc',
      'imp-stack'
    ];

    for (const id of inputIds) {
      assert.ok(
        html.includes(`for="${id}"`),
        `Form control with id="${id}" must have matching <label for="${id}">`
      );
    }
  });

  test('ARIA live regions exist for dynamic status announcements', () => {
    assert.ok(html.includes('role="status" aria-live="polite"'), 'Engine status badge has aria-live="polite"');
    assert.ok(html.includes('aria-live="assertive"'), 'Toast notifications container has aria-live="assertive"');
    assert.ok(html.includes('role="alert"'), 'Error display spans have role="alert"');
  });

  test('Navigation buttons have tab roles and aria-controls attributes', () => {
    const navTabs = ['dashboard', 'ideas', 'blueprint', 'roadmap', 'reality', 'improve'];
    for (const tab of navTabs) {
      assert.ok(
        html.includes(`data-tab="${tab}"`) && html.includes(`aria-controls="view-${tab}"`),
        `Tab button ${tab} must have aria-controls="view-${tab}"`
      );
    }
  });
});
