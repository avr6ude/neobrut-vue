import { componentGroups } from './componentCatalog'

export const navigation = [
  { label: 'Getting started', items: [
    { id: 'index', label: 'Introduction', href: '/docs/' },
    { id: 'getting-started', label: 'Installation', href: '/docs/getting-started/' },
    { id: 'components', label: 'All components', href: '/docs/components/' },
  ] },
  ...componentGroups.map(group => ({
    label: group.label,
    items: group.items.map(component => ({ id: component.id, label: component.label, href: `/docs/${component.id}/` })),
  })),
  { label: 'Resources', items: [
    { id: 'forms', label: 'Forms guide', href: '/docs/forms/' },
    { id: 'accessibility', label: 'Accessibility', href: '/docs/accessibility/' },
  ].sort((a, b) => a.label.localeCompare(b.label)) },
]

export const pages = navigation.flatMap(group => group.items)
