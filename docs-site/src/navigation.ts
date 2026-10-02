export const navigation = [
  { label: 'Getting started', items: [
    { id: 'index', label: 'Introduction', href: '/docs/' },
    { id: 'getting-started', label: 'Installation', href: '/docs/getting-started/' },
    { id: 'components', label: 'All components', href: '/docs/components/' },
  ] },
  { label: 'Components', items: [
    ...['button', 'input', 'select', 'switch', 'accordion', 'tabs', 'dialog', 'forms'].map(id => ({ id, label: id[0].toUpperCase() + id.slice(1), href: `/docs/${id}/` })),
  ] },
  { label: 'Resources', items: [
    { id: 'accessibility', label: 'Accessibility', href: '/docs/accessibility/' },
  ] },
]

export const pages = navigation.flatMap(group => group.items)
