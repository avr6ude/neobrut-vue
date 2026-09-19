import './styles/index.css'

import { createNeoBrutalPlugin } from './plugin'
import { NbBadge } from './components/NbBadge'
import { NbButton } from './components/NbButton'
import { NbCard } from './components/NbCard'

export { NbBadge, NbButton, NbCard }

export const NeoBrutalVue = createNeoBrutalPlugin({ NbBadge, NbButton, NbCard })
