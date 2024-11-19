'use client'

import { Menu, Avatar } from '@mantine/core'
import { useUserAction } from '@/zustand/user'
import { MessageTypes } from '@/types/messageTypes'

export default function ChatDropdown() {
  const { setActiveChats, rooms, activeChats, setRoomId, chatusers, setChatUsers } = useUserAction()

  const handleSelectChat = (item: MessageTypes) => {
    const isInActiveChats = activeChats.some((chat) => chat.chatPartner._id === item.chatPartner._id)
    const isInChatUsers = chatusers.some((chat) => chat.chatPartner._id === item.chatPartner._id)

    if (!isInActiveChats && !isInChatUsers) {
      setActiveChats([...activeChats, item])
    } else if (isInChatUsers) {
      setChatUsers(chatusers.filter((chat) => chat.chatPartner._id !== item.chatPartner._id))
      setActiveChats([...activeChats, item])
    } else {
      const filteredChats = activeChats.filter((chat) => chat.chatPartner._id !== item.chatPartner._id)
      setActiveChats([...filteredChats, item])
    }

    setRoomId([item.message.myId, item.chatPartner._id].sort().join('_'))
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
