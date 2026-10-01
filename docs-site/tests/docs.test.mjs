import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

for (const page of ['button', 'input', 'select', 'switch', 'accordion', 'tabs', 'dialog', 'forms']) {
  test(`${page} docs include a live preview and its code`, () => {
    const html = readFileSync(new URL(`../../playground/dist/docs/${page}/index.html`, import.meta.url), 'utf8')
    assert.match(html, /data-example/)
    assert.match(html, /<astro-island/)
    assert.match(html, /role="tab"[^>]*>Preview/)
    assert.match(html, /role="tab"[^>]*>Code/)
    assert.match(html, /data-panel="code"/)
  })
}

test('the example tablist contains only tabs', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  const tabs = html.indexOf('role="tablist" aria-label="Button example"')
  const tabsEnd = html.indexOf('</div>', tabs)
  const copy = html.indexOf('data-copy', tabs)
  assert.ok(tabs >= 0 && tabsEnd > tabs && copy > tabsEnd)
})

test('the docs entry and catalog show live components, not a text-only list', () => {
  const home = readFileSync(new URL('../../playground/dist/docs/index.html', import.meta.url), 'utf8')
  const catalog = readFileSync(new URL('../../playground/dist/docs/components/index.html', import.meta.url), 'utf8')
  assert.match(home, /<astro-island/)
  assert.match(home, /data-example/)
  assert.equal((catalog.match(/class="nb-doc-example not-content" data-example/g) ?? []).length, 8)
  assert.equal((catalog.match(/<astro-island/g) ?? []).length, 8)
  assert.match(catalog, /ButtonDemo/)
  assert.match(catalog, /FormDemo/)
})

test('copy stays with the code panel', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  assert.match(html, /data-panel="code" hidden>\s*<button[^>]*data-copy/)
})

test('the code panel is highlighted and opts out of prose spacing', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  assert.match(html, /class="nb-doc-example not-content" data-example/)
  assert.match(html, /class="astro-code github-dark"/)
  assert.match(html, /class="line"/)
})

test('the combined site serves branded docs under /docs', () => {
  const home = readFileSync(new URL('../../playground/dist/docs/index.html', import.meta.url), 'utf8')
  const button = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  assert.match(home, /href="\/docs\/components\/"/)
  assert.match(button, /href="\/docs\/button\/" aria-current="page"/)
  assert.match(button, /href="\/docs\/favicon\.svg"/)
  assert.doesNotMatch(button, /docs\.avrdu\.de/)
  assert.ok(existsSync(new URL('../../playground/dist/docs/favicon.svg', import.meta.url)))
})
