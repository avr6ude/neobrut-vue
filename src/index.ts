import './styles/index.css'

import { createNeoBrutalPlugin } from './plugin'
import { NbBadge } from './components/NbBadge'
import { NbButton } from './components/NbButton'
import { NbCard } from './components/NbCard'
import { NbCheckbox } from './components/NbCheckbox'
import { NbInput } from './components/NbInput'
import { NbSelect } from './components/NbSelect'
import { NbTextarea } from './components/NbTextarea'

export { NbBadge, NbButton, NbCard, NbCheckbox, NbInput, NbSelect, NbTextarea }

export const NeoBrutalVue = createNeoBrutalPlugin({
  NbBadge,
  NbButton,
  NbCard,
  NbCheckbox,
  NbInput,
  NbSelect,
  NbTextarea,
})
