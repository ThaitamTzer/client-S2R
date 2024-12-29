'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserAction } from '@/zustand/user'
// import { mutate } from 'swr'

// const FloatChatRoom = dynamic(() => import('./floatChatRoom'), { ssr: false })
const ChatBox = dynamic(() => import('./chatBox'), { ssr: false })

const Chat = () => {
  const activeChats = useUserAction((state) => state.activeChats)
  // const setActiveChats = useUserAction((state) => state.setActiveChats)
  // const setChatUsers = useUserAction((state) => state.setChatUsers)
  // const chatusers = useUserAction((state) => state.chatusers)

  // const handleUserSelect = (user: any) => {
  //   // If there's an existing chat, add it back to chatusers
  //   if (activeChats.length > 0) {
  //     setChatUsers([...chatusers, ...activeChats])
  //   }

  //   // Set the new chat as the only active chat
  //   setActiveChats([user])

  //   // Remove the selected user from chatusers
  //   setChatUsers(chatusers.filter((u) => u.chatPartner._id !== user.chatPartner._id))
  // }

  // const handleMinimizeChat = (user: any) => {
  //   mutate('/api/messages/get-room')
  //   setActiveChats([]) // Clear active chats
  //   setChatUsers([...chatusers, user]) // Add minimized chat back to users
  // }

  return (
    <div className="fixed z-50 bottom-0 right-0">
      {/* <FloatChatRoom users={chatusers} onUserSelect={handleUserSelect} /> */}
      <AnimatePresence>
        {activeChats.map((user) => (
          <motion.div
            key={user.message.roomId}
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
              right: 430,
              bottom: 0,
              zIndex: 1000,
            }}
          >
            <ChatBox key={user.message.roomId} roomId={user.message.roomId} userChat={user} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Chat
