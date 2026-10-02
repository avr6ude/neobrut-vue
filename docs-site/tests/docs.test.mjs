import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'

for (const page of ['button', 'input', 'select', 'switch', 'accordion', 'tabs', 'dialog', 'forms']) {
  test(`${page} docs include a live preview and its code`, () => {
    const html = readFileSync(new URL(`../../playground/dist/docs/${page}/index.html`, import.meta.url), 'utf8')
    assert.match(html, /opts="[^"]*DocsExample/)
    assert.match(html, /<astro-island/)
    assert.match(html, /role="tab"[^>]*aria-selected="true"/)
    assert.match(html, /role="tab"[^>]*aria-selected="false"/)
    assert.match(html, /nb-doc-example__code" role="tabpanel"/)
  })
}

test('the example tablist contains only tabs', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  const tabs = html.indexOf('role="tablist" aria-orientation="horizontal" aria-label="Button example"')
  const tabsEnd = html.indexOf('</div>', tabs)
  const copy = html.indexOf('nb-doc-example__copy', tabs)
  assert.ok(tabs >= 0 && tabsEnd > tabs && copy > tabsEnd)
})

test('the docs entry and catalog show live components, not a text-only list', () => {
  const home = readFileSync(new URL('../../playground/dist/docs/index.html', import.meta.url), 'utf8')
  const catalog = readFileSync(new URL('../../playground/dist/docs/components/index.html', import.meta.url), 'utf8')
  assert.match(home, /<astro-island/)
  assert.match(home, /nb-doc-example not-content/)
  assert.equal((catalog.match(/nb-doc-example not-content/g) ?? []).length, 8)
  assert.ok((catalog.match(/<astro-island/g) ?? []).length >= 8)
  assert.match(catalog, /ButtonDemo/)
  assert.match(catalog, /FormDemo/)
})

test('copy stays with the code panel', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  const panel = html.indexOf('nb-doc-example__code" role="tabpanel"')
  const copy = html.indexOf('nb-doc-example__copy', panel)
  const code = html.indexOf('class="astro-code github-dark"', panel)
  assert.ok(panel >= 0 && copy > panel && code > copy)
})

test('the code panel is highlighted and opts out of prose spacing', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  assert.match(html, /class="[^"]*nb-doc-example not-content"/)
  assert.match(html, /class="astro-code github-dark"/)
  assert.match(html, /class="line"/)
})

test('every rendered guide code block has syntax colors', () => {
  for (const page of ['getting-started', 'button', 'input', 'select', 'switch', 'accordion', 'tabs', 'dialog', 'forms']) {
    const html = readFileSync(new URL(`../../playground/dist/docs/${page}/index.html`, import.meta.url), 'utf8')
    const blocks = html.match(/<pre class="astro-code[^>]*>[\s\S]*?<\/pre>/g) ?? []
    assert.ok(blocks.length > 0, `${page} has no code blocks`)
    for (const block of blocks) {
      assert.match(block, /style="color:/, `${page} has an unhighlighted block`)
    }
  }
})

test('docs controls reuse exported core components', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  assert.match(html, /search-trigger nb-root nb-button/)
  assert.match(html, /github-link nb-root nb-link/)
  assert.match(html, /class="nb-root nb-field"/)
  assert.match(html, /nb-tabs nb-tabs--horizontal nb-doc-example/)
  assert.match(html, /nb-doc-example__copy nb-root nb-button/)
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

test('the docs shell has full navigation, search, and no Starlight markup', () => {
  const html = readFileSync(new URL('../../playground/dist/docs/button/index.html', import.meta.url), 'utf8')
  assert.match(html, /class="docs-shell"/)
  assert.match(html, /class="docs-sidebar"/)
  assert.match(html, /class="docs-toc"/)
  assert.match(html, /id="docs-search"/)
  assert.match(html, /id="docs-menu"/)
  assert.doesNotMatch(html, /starlight/i)
})

test('the removed demo strip stays removed', () => {
  const html = readFileSync(new URL('../../playground/dist/index.html', import.meta.url), 'utf8')
  const js = readFileSync(new URL(`../../playground/dist${html.match(/src="(\/assets\/[^\"]+\.js)"/)?.[1]}`, import.meta.url), 'utf8')
  assert.doesNotMatch(js, /REAL COMPONENTS|REAL INTERACTIONS|ZERO BEIGE/)
})
