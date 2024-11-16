import { ChatContentTypes, MessageTypes } from '@/types/messageTypes'
import { create } from 'zustand'

type State = {
  openFilterDrawer: boolean
  paramsObj: Record<string, string[]>
  openChatDropdown: boolean
  openChatRoom: boolean
  RoomId: string
  chatusers: MessageTypes[]
  activeChats: MessageTypes[]
  rooms: MessageTypes[]
  chatPartner: MessageTypes | null
  message: ChatContentTypes | null
  messages: ChatContentTypes[]
}

type Actions = {
  setOpenFilterDrawer: (open: boolean) => void
  setParamsObj: (paramsObj: Record<string, string[]>) => void
  setOpenChatDropdown: (open: boolean) => void
  setOpenChatRoom: (open: boolean) => void
  setChatUsers: (chatusers: MessageTypes[]) => void
  setActiveChats: (activeChats: MessageTypes[]) => void
  setRooms: (rooms: MessageTypes[]) => void
  setChatPartner: (chatPartner: MessageTypes) => void
  setMessage: (message: ChatContentTypes) => void
  setMessages: (messages: ChatContentTypes[]) => void
  setRoomId: (roomId: string) => void
}

export const useUserAction = create<State & Actions>((set) => ({
  openFilterDrawer: false,
  openChatDropdown: false,
  openChatRoom: false,
  RoomId: '',
  chatusers: [],
  activeChats: [],
  rooms: [],
  chatPartner: null,
  paramsObj: {},
  message: null,
  messages: [],
  setOpenFilterDrawer: (open) => set({ openFilterDrawer: open }),
  setParamsObj: (paramsObj) => set({ paramsObj }),
  setOpenChatDropdown: (open) => set({ openChatDropdown: open }),
  setOpenChatRoom: (open) => set({ openChatRoom: open }),
  setChatUsers: (chatusers) => set({ chatusers }),
  setActiveChats: (activeChats) => set({ activeChats }),
  setRooms: (rooms) => set({ rooms }),
  setChatPartner: (chatPartner) => set({ chatPartner }),
  setMessage: (message) => set({ message }),
  setMessages: (messages) => set({ messages }),
  setRoomId: (roomId) => set({ RoomId: roomId }),
}))
