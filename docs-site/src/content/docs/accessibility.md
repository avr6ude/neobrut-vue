---
title: Accessibility
description: Labels, keyboard interaction, and ARIA in Neobrut Vue.
---

Neobrut Vue components are designed for semantic and keyboard-accessible interfaces. Accessibility still depends on how you compose them.

- Give form fields a visible `label`; use `hint` and `error` for supporting or validation text.
- Use `NbButton` for actions and `NbLink` for navigation.
- Use the supplied grouped components (`NbTabsList` with `NbTabsTrigger` and `NbTabsContent`, for example) so their roles and relationships stay connected.
- Name overlay triggers and keep headings descriptive. Dialogs and menus are built on accessible interaction primitives; verify focus order in your actual page.
- Do not use color alone to communicate errors or status. Keep text feedback visible.

The [interactive gallery](https://neobrut.avrdu.de/#gallery) is useful for trying keyboard and focus behavior. The repository also contains [accessibility tests](https://github.com/avr6ude/neobrut-vue/blob/main/tests/accessibility.test.ts); test your finished flows as well as the components.
