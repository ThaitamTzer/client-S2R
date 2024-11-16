'use client'
import React, { useState } from 'react'
import FloatChatRoom from './floatChatRoom'
import ChatBox from './chatBox'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserAction } from '@/zustand/user'

const MAX_CHAT_BOXES = 3
const CHAT_BOX_WIDTH = 330
const CHAT_BOX_MARGIN = 20

const Chat = () => {
  const { activeChats, setActiveChats, setChatUsers, chatusers, setMessages, setRoomId } = useUserAction()

  const handleUserSelect = (user: any) => {
    if (activeChats.length >= MAX_CHAT_BOXES) {
      // Nếu đã đạt giới hạn, không thêm chat mới
      alert('Bạn chỉ có thể mở tối đa 3 cuộc trò chuyện cùng lúc')
      return
    }

    // Kiểm tra xem user đã có trong activeChats chưa
    if (activeChats.some((chat) => chat.message._id === user.message._id)) {
      return
    }

    setActiveChats([...activeChats, user])
    setChatUsers(chatusers.filter((u) => u.message._id !== user.message._id))
  }

  const handleMinimizeChat = (user: any) => {
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
            <ChatBox onMinimize={() => handleMinimizeChat(user)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Chat
