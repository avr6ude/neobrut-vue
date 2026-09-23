import type { NbNavigationItem } from '../../src'

const directLink: NbNavigationItem = { label: 'Docs', href: '/docs' }
const linkGroup: NbNavigationItem = {
  label: 'Components',
  children: [{ label: 'Button', href: '/components/button' }],
}

const nestedGroup: NbNavigationItem = {
  label: 'Components',
  children: [
    // @ts-expect-error Navigation groups support one level of links, not nested groups.
    { label: 'Forms', children: [{ label: 'Input', href: '/components/input' }] },
  ],
}

void [directLink, linkGroup, nestedGroup]
