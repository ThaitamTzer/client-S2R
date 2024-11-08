import { create } from 'zustand'

type State = {
  openFilterDrawer: boolean
  paramsObj: Record<string, string[]>
}

type Actions = {
  setOpenFilterDrawer: (open: boolean) => void
  setParamsObj: (paramsObj: Record<string, string[]>) => void
}

export const useUserAction = create<State & Actions>((set) => ({
  openFilterDrawer: false,
  paramsObj: {},
  setOpenFilterDrawer: (open) => set({ openFilterDrawer: open }),
  setParamsObj: (paramsObj) => set({ paramsObj }),
}))
