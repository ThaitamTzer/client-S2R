'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserAction } from '@/zustand/user'
import { mutate } from 'swr'

const FloatChatRoom = dynamic(() => import('./floatChatRoom'), { ssr: false })
const ChatBox = dynamic(() => import('./chatBox'), { ssr: false })

const MAX_CHAT_BOXES = 3
const CHAT_BOX_WIDTH = 330
const CHAT_BOX_MARGIN = 20

const Chat = () => {
  
  const { activeChats, setActiveChats, setChatUsers, chatusers } = useUserAction()

  const handleUserSelect = (user: any) => {
    if (activeChats.length >= MAX_CHAT_BOXES) {
      alert('Bạn chỉ có thể mở tối đa 3 cuộc trò chuyện cùng lúc')
      return
    }

    if (activeChats.some((chat) => chat.chatPartner._id === user.chatPartner._id)) {
      return
    }

    setActiveChats([...activeChats, user])

    setChatUsers(chatusers.filter((u) => u.chatPartner._id !== user.chatPartner._id))
  }

  const handleMinimizeChat = (user: any) => {
    mutate('/api/messages/get-room')
    setActiveChats(activeChats.filter((chat) => chat.message._id !== user.message._id))
    setChatUsers([...chatusers, user])
  }

  // Tính toán vị trí cho mỗi chatbox
  const getChatBoxPosition = (index: number) => {
    const totalWidth = CHAT_BOX_WIDTH + CHAT_BOX_MARGIN
    const baseRight = 430 // Vị trí right ban đầu
    return baseRight + totalWidth * index
  }

  return (
    <div className="fixed z-50">
      <FloatChatRoom users={chatusers} onUserSelect={handleUserSelect} />
      <AnimatePresence>
        {activeChats.map((user, index) => (
          <motion.div
            key={user.chatPartner._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            style={{
              position: 'fixed',
              right: getChatBoxPosition(index),
              bottom: 0,
              zIndex: 50 - index, // Đảm bảo chatbox phía trước có z-index cao hơn
            }}
          >
            <ChatBox
              roomId={user.message.roomId}
              key={user.chatPartner._id}
              userChat={user}
              onMinimize={() => handleMinimizeChat(user)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Chat
