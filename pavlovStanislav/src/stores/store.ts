import {create} from 'zustand'
import {devtools} from 'zustand/middleware'

interface Store {
  tooltip: string
  isVisible: boolean
  setTooltip: (tooltip: string) => void
  hideTooltip: () => void
}

export const useSomeStore = create<Store>()(
  devtools(set => ({
    tooltip: '',
    isVisible: false,
    setTooltip: tooltip => set(() => ({tooltip: tooltip, isVisible: true})),
    hideTooltip: () => set(() => ({isVisible: false})),
  })),
)
