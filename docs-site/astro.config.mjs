import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import starlight from '@astrojs/starlight'
import vue from '@astrojs/vue'

export default defineConfig({
  site: 'https://neobrut.avrdu.de',
  base: '/docs',
  outDir: '../playground/dist/docs',
  vite: {
    resolve: {
      alias: [
        { find: '@neobrut-vue/core/style.css', replacement: fileURLToPath(new URL('../src/styles/index.css', import.meta.url)) },
        { find: '@neobrut-vue/core', replacement: fileURLToPath(new URL('../src/index.ts', import.meta.url)) },
      ],
    },
  },
  integrations: [
    starlight({
      title: 'Neobrut Vue',
      description: 'Colorful Vue components with hard edges and useful semantics.',
      favicon: '/favicon.svg',
      customCss: ['./src/styles/docs.css'],
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/avr6ude/neobrut-vue' }],
      sidebar: [
        { label: 'Introduction', link: '/' },
        { label: 'Getting started', link: '/getting-started/' },
        { label: 'All components', link: '/components/' },
        {
          label: 'Components',
          items: [
            { label: 'Button', link: '/button/' },
            { label: 'Input', link: '/input/' },
            { label: 'Select', link: '/select/' },
            { label: 'Switch', link: '/switch/' },
            { label: 'Accordion', link: '/accordion/' },
            { label: 'Tabs', link: '/tabs/' },
            { label: 'Dialog', link: '/dialog/' },
            { label: 'Forms', link: '/forms/' },
          ],
        },
        { label: 'Accessibility', link: '/accessibility/' },
      ],
    }),
    mdx(),
    vue(),
  ],
})
