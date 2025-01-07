import { NotificationType } from '@/types/notificationType'
import { create } from 'zustand'

type State = {
  notifications: NotificationType[]
}

type Actions = {
  setNotifications: (notifications: NotificationType[]) => void
  updateSingleNotification: (notificationId: string) => void
}

export const useNotificationStore = create<State & Actions>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  updateSingleNotification: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((notification) => {
        if (notification._id === notificationId) {
          return {
            ...notification,
            read: true,
          }
        }
        return notification
      }),
    }))
  },
}))
