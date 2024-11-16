'use client'

import { Menu, Avatar } from '@mantine/core'
import { useUserAction } from '@/zustand/user'
import { MessageTypes } from '@/types/messageTypes'
import { useAuth } from '@/hooks/useAuth'
import { useSocket } from '@/hooks/useSocket'

export default function ChatDropdown() {
  const { setActiveChats, rooms, setChatPartner, setRoomId, RoomId, setMessages, setChatUsers, chatusers } =
    useUserAction()
  const { user } = useAuth()

  const handleSelectChat = (item: MessageTypes) => {
    setActiveChats([item])
    setChatPartner(item)
    setChatUsers(chatusers.filter((u) => u.message._id !== item.message._id))
    setRoomId([user?._id, item.chatPartner._id].sort().join('_'))
  }

  return (
    <>
      {rooms?.map((item) => (
        <Menu.Item key={item.message._id} onClick={() => handleSelectChat(item)}>
          <div className="flex flex-row items-center">
            <Avatar src={item.chatPartner.avatar} size="lg" radius="xl" />
            <div className="ml-3">
              <p className="text-sm font-semibold">{item.chatPartner.firstname + ' ' + item.chatPartner.lastname}</p>
              <p className="text-xs text-gray-600">{item.message?.content}</p>
            </div>
          </div>
        </Menu.Item>
      ))}
    </>
  )
}
