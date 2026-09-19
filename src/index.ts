import './styles/index.css'

import { createNeoBrutalPlugin } from './plugin'
import { NbBadge } from './components/NbBadge'
import { NbButton } from './components/NbButton'
import { NbCard } from './components/NbCard'
import { NbCheckbox } from './components/NbCheckbox'
import { NbAlert } from './components/NbAlert'
import { NbDialog } from './components/NbDialog'
import { NbInput } from './components/NbInput'
import { NbSelect } from './components/NbSelect'
import { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger } from './components/NbTabs'
import { NbTextarea } from './components/NbTextarea'
import { NbTooltip } from './components/NbTooltip'

export { NbAlert, NbBadge, NbButton, NbCard, NbCheckbox, NbDialog, NbInput, NbSelect, NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger, NbTextarea, NbTooltip }
export type { NbTabsOrientation } from './components/NbTabs'

export const NeoBrutalVue = createNeoBrutalPlugin({
  NbAlert,
  NbBadge,
  NbButton,
  NbCard,
  NbCheckbox,
  NbDialog,
  NbInput,
  NbSelect,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbTextarea,
  NbTooltip,
})
