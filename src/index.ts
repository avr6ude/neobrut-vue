import './styles/index.css'

import { createNeoBrutalPlugin } from './plugin'
import { NbAccordion, NbAccordionItem } from './components/NbAccordion'
import { NbAspectRatio } from './components/NbAspectRatio'
import { NbBadge } from './components/NbBadge'
import { NbAvatar } from './components/NbAvatar'
import { NbBreadcrumbs } from './components/NbBreadcrumbs'
import { NbButton } from './components/NbButton'
import { NbButtonGroup } from './components/NbButtonGroup'
import { NbCard } from './components/NbCard'
import { NbCheckbox } from './components/NbCheckbox'
import { NbCombobox } from './components/NbCombobox'
import { NbContextMenu, NbContextMenuCheckboxItem, NbContextMenuItem, NbContextMenuLabel, NbContextMenuRadioGroup, NbContextMenuRadioItem, NbContextMenuSeparator, NbContextMenuShortcut, NbContextMenuSub } from './components/NbContextMenu'
import { NbAlert } from './components/NbAlert'
import { NbAlertDialog } from './components/NbAlertDialog'
import { NbDialog } from './components/NbDialog'
import { NbDropdownMenu, NbDropdownMenuItem, NbDropdownMenuSeparator } from './components/NbDropdownMenu'
import { NbEmptyState } from './components/NbEmptyState'
import { NbFieldset } from './components/NbFieldset'
import { NbInput } from './components/NbInput'
import { NbInputGroup } from './components/NbInputGroup'
import { NbHoverCard } from './components/NbHoverCard'
import { NbKbd } from './components/NbKbd'
import { NbLink } from './components/NbLink'
import { NbMarker } from './components/NbMarker'
import { NbNumberInput } from './components/NbNumberInput'
import { NbPagination } from './components/NbPagination'
import { NbPopover } from './components/NbPopover'
import { NbProgress } from './components/NbProgress'
import { NbRadioGroup } from './components/NbRadioGroup'
import { NbScrollArea } from './components/NbScrollArea'
import { NbSheet } from './components/NbSheet'
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
import { NbToggle } from './components/NbToggle'
import { NbToggleGroup, NbToggleGroupItem } from './components/NbToggleGroup'
import { NbTooltip } from './components/NbTooltip'

export { NbAccordion, NbAccordionItem, NbAlert, NbAlertDialog, NbAspectRatio, NbAvatar, NbBadge, NbBreadcrumbs, NbButton, NbButtonGroup, NbCard, NbCheckbox, NbCombobox, NbContextMenu, NbContextMenuCheckboxItem, NbContextMenuItem, NbContextMenuLabel, NbContextMenuRadioGroup, NbContextMenuRadioItem, NbContextMenuSeparator, NbContextMenuShortcut, NbContextMenuSub, NbDialog, NbDropdownMenu, NbDropdownMenuItem, NbDropdownMenuSeparator, NbEmptyState, NbFieldset, NbHoverCard, NbInput, NbInputGroup, NbKbd, NbLink, NbMarker, NbNumberInput, NbPagination, NbPopover, NbProgress, NbRadioGroup, NbScrollArea, NbSelect, NbSelectItem, NbSeparator, NbSheet, NbSkeleton, NbSlider, NbSpinner, NbSwitch, NbTable, NbTabs, NbTabsContent, NbTabsList, NbTabsTrigger, NbTextarea, NbToast, NbToggle, NbToggleGroup, NbToggleGroupItem, NbTooltip }
export type { NbBreadcrumbItem } from './components/NbBreadcrumbs'
export type { NbComboboxOption } from './components/NbCombobox'
export type { NbLinkTone } from './components/NbLink'
export type { NbMarkerTone } from './components/NbMarker'
export type { NbRadioOption } from './components/NbRadioGroup'
export type { NbSheetSide } from './components/NbSheet'
export type { NbTabsOrientation } from './components/NbTabs'
export type { NbToggleSize, NbToggleTone } from './components/NbToggle'
export type { NbToggleGroupOrientation, NbToggleGroupType } from './components/NbToggleGroup'
export type { NbToastTone } from './components/NbToast'

export const NeoBrutalVue = createNeoBrutalPlugin({
  NbAccordion,
  NbAccordionItem,
  NbAlert,
  NbAlertDialog,
  NbAspectRatio,
  NbAvatar,
  NbBadge,
  NbBreadcrumbs,
  NbButton,
  NbButtonGroup,
  NbCard,
  NbCheckbox,
  NbCombobox,
  NbContextMenu,
  NbContextMenuCheckboxItem,
  NbContextMenuItem,
  NbContextMenuLabel,
  NbContextMenuRadioGroup,
  NbContextMenuRadioItem,
  NbContextMenuSeparator,
  NbContextMenuShortcut,
  NbContextMenuSub,
  NbDialog,
  NbDropdownMenu,
  NbDropdownMenuItem,
  NbDropdownMenuSeparator,
  NbEmptyState,
  NbFieldset,
  NbHoverCard,
  NbInput,
  NbInputGroup,
  NbKbd,
  NbLink,
  NbMarker,
  NbNumberInput,
  NbPagination,
  NbPopover,
  NbProgress,
  NbRadioGroup,
  NbScrollArea,
  NbSheet,
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
  NbToggle,
  NbToggleGroup,
  NbToggleGroupItem,
  NbTooltip,
})
