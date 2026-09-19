import './styles/index.css'

import { createNeoBrutalPlugin } from './plugin'
import { NbBadge } from './components/NbBadge'
import { NbButton } from './components/NbButton'
import { NbCard } from './components/NbCard'
import { NbCheckbox } from './components/NbCheckbox'
import { NbAlert } from './components/NbAlert'
import { NbDialog } from './components/NbDialog'
import { NbFieldset } from './components/NbFieldset'
import { NbInput } from './components/NbInput'
import { NbInputGroup } from './components/NbInputGroup'
import { NbRadioGroup } from './components/NbRadioGroup'
import { NbSelect } from './components/NbSelect'
import { NbSwitch } from './components/NbSwitch'
import { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger } from './components/NbTabs'
import { NbTextarea } from './components/NbTextarea'
import { NbTooltip } from './components/NbTooltip'

export { NbAlert, NbBadge, NbButton, NbCard, NbCheckbox, NbDialog, NbFieldset, NbInput, NbInputGroup, NbRadioGroup, NbSelect, NbSwitch, NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger, NbTextarea, NbTooltip }
export type { NbRadioOption } from './components/NbRadioGroup'
export type { NbTabsOrientation } from './components/NbTabs'

export const NeoBrutalVue = createNeoBrutalPlugin({
  NbAlert,
  NbBadge,
  NbButton,
  NbCard,
  NbCheckbox,
  NbDialog,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbRadioGroup,
  NbSelect,
  NbSwitch,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbTextarea,
  NbTooltip,
})
