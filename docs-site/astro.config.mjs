import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import vue from '@astrojs/vue'

export default defineConfig({
  site: 'https://neobrut.avrdu.de',
  base: '/docs',
  outDir: '../playground/dist/docs',
  trailingSlash: 'always',
  vite: {
    resolve: {
      alias: [
        { find: '@neobrut-vue/core/style.css', replacement: fileURLToPath(new URL('../src/styles/index.css', import.meta.url)) },
        { find: '@neobrut-vue/core', replacement: fileURLToPath(new URL('../src/index.ts', import.meta.url)) },
      ],
    },
  },
  integrations: [mdx(), vue()],
})
