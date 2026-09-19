import type { App, Component, Plugin } from 'vue'

export function createNeoBrutalPlugin(components: Record<string, Component>): Plugin {
  return {
    install(app: App) {
      Object.entries(components).forEach(([name, component]) => app.component(name, component))
    },
  }
}
