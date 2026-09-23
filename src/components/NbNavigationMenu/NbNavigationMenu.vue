<script setup lang="ts">
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
} from 'reka-ui'

export interface NbNavigationLink {
  label: string
  href: string
  description?: string
  target?: string
  active?: boolean
  children?: never
}

export interface NbNavigationGroup {
  label: string
  children: NbNavigationLink[]
  href?: never
  description?: never
  target?: never
  active?: never
}

export type NbNavigationItem = NbNavigationLink | NbNavigationGroup

withDefaults(defineProps<{
  items: NbNavigationItem[]
  label?: string
}>(), {
  label: 'Main navigation',
})
</script>

<template>
  <NavigationMenuRoot class="nb-root nb-navigation-menu" :aria-label="label">
    <NavigationMenuList class="nb-navigation-menu__list">
      <NavigationMenuItem v-for="(item, index) in items" :key="`${index}-${item.label}`" :value="`${index}-${item.label}`" class="nb-navigation-menu__item">
        <template v-if="item.children?.length">
          <NavigationMenuTrigger class="nb-navigation-menu__trigger">
            {{ item.label }}
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="m3 6 5 5 5-5" /></svg>
          </NavigationMenuTrigger>
          <NavigationMenuContent class="nb-navigation-menu__content">
            <NavigationMenuLink
              v-for="child in item.children"
              :key="child.label"
              as-child
              :active="child.active"
            >
              <a class="nb-navigation-menu__link nb-navigation-menu__link--panel" :href="child.href" :target="child.target">
                <strong>{{ child.label }}</strong>
                <span v-if="child.description">{{ child.description }}</span>
              </a>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </template>

        <NavigationMenuLink v-else as-child :active="item.active">
          <a class="nb-navigation-menu__link" :href="item.href" :target="item.target">{{ item.label }}</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenuRoot>
</template>
