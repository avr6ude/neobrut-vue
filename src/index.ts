import './styles/index.css'

import { createNeoBrutalPlugin } from './plugin'
import { NbAccordion, NbAccordionItem } from './components/NbAccordion'
import { NbAspectRatio } from './components/NbAspectRatio'
import { NbBadge } from './components/NbBadge'
import { NbAvatar } from './components/NbAvatar'
import { NbBreadcrumbs } from './components/NbBreadcrumbs'
import { NbButton } from './components/NbButton'
import { NbCard } from './components/NbCard'
import { NbCheckbox } from './components/NbCheckbox'
import { NbCombobox } from './components/NbCombobox'
import { NbAlert } from './components/NbAlert'
import { NbDialog } from './components/NbDialog'
import { NbDropdownMenu, NbDropdownMenuItem, NbDropdownMenuSeparator } from './components/NbDropdownMenu'
import { NbEmptyState } from './components/NbEmptyState'
import { NbFieldset } from './components/NbFieldset'
import { NbInput } from './components/NbInput'
import { NbInputGroup } from './components/NbInputGroup'
import { NbNumberInput } from './components/NbNumberInput'
import { NbPagination } from './components/NbPagination'
import { NbPopover } from './components/NbPopover'
import { NbProgress } from './components/NbProgress'
import { NbRadioGroup } from './components/NbRadioGroup'
import { NbScrollArea } from './components/NbScrollArea'
import { NbSelect, NbSelectItem } from './components/NbSelect'
import { NbSeparator } from './components/NbSeparator'
import { NbSlider } from './components/NbSlider'
import { NbSkeleton } from './components/NbSkeleton'
import { NbSpinner } from './components/NbSpinner'
import { NbSwitch } from './components/NbSwitch'
import { NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger } from './components/NbTabs'
import { NbTextarea } from './components/NbTextarea'
import { NbTable } from './components/NbTable'
import { NbToast } from './components/NbToast'
import { NbToggleGroup, NbToggleGroupItem } from './components/NbToggleGroup'
import { NbTooltip } from './components/NbTooltip'

export { NbAccordion, NbAccordionItem, NbAlert, NbAspectRatio, NbAvatar, NbBadge, NbBreadcrumbs, NbButton, NbCard, NbCheckbox, NbCombobox, NbDialog, NbDropdownMenu, NbDropdownMenuItem, NbDropdownMenuSeparator, NbEmptyState, NbFieldset, NbInput, NbInputGroup, NbNumberInput, NbPagination, NbPopover, NbProgress, NbRadioGroup, NbScrollArea, NbSelect, NbSelectItem, NbSeparator, NbSkeleton, NbSlider, NbSpinner, NbSwitch, NbTable, NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger, NbTextarea, NbToast, NbToggleGroup, NbToggleGroupItem, NbTooltip }
export type { NbBreadcrumbItem } from './components/NbBreadcrumbs'
export type { NbComboboxOption } from './components/NbCombobox'
export type { NbRadioOption } from './components/NbRadioGroup'
export type { NbTabsOrientation } from './components/NbTabs'
export type { NbToggleGroupOrientation, NbToggleGroupType } from './components/NbToggleGroup'
export type { NbToastTone } from './components/NbToast'

export const NeoBrutalVue = createNeoBrutalPlugin({
  NbAccordion,
  NbAccordionItem,
  NbAlert,
  NbAspectRatio,
  NbAvatar,
  NbBadge,
  NbBreadcrumbs,
  NbButton,
  NbCard,
  NbCheckbox,
  NbCombobox,
  NbDialog,
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbDropdownMenuSeparator,
  NbEmptyState,
  NbFieldset,
  NbInput,
  NbInputGroup,
  NbNumberInput,
  NbPagination,
  NbPopover,
  NbProgress,
  NbRadioGroup,
  NbScrollArea,
  NbSelect,
  NbSelectItem,
  NbSeparator,
  NbSkeleton,
  NbSlider,
  NbSpinner,
  NbSwitch,
  NbTable,
  NbTabs,
  NbTabsContent,
  NbTabsList,
  NbTabsTrigger,
  NbTextarea,
  NbToast,
  NbToggleGroup,
  NbToggleGroupItem,
  NbTooltip,
})
