'use client'

import { ActionIcon, Avatar, Paper, ScrollArea, TextInput, Modal, Image as MantineImage } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import IconifyIcon from '../icons'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useUserAction } from '@/zustand/user'
import { useAuth } from '@/hooks/useAuth'
import { useSocket } from '@/hooks/useSocket'

interface ChatBoxProps {
  onMinimize: () => void
}

export default function ChatBox({ onMinimize }: ChatBoxProps) {
  const { setActiveChats, activeChats, chatPartner, setRoomId } = useUserAction()
  const [localMessages, setLocalMessages] = useState<any[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [showEmoji, setShowEmoji] = useState(false)
  const [imagePreview, { open: openImagePreview, close: closeImagePreview }] = useDisclosure(false)
  const [selectedImage, setSelectedImage] = useState<string | undefined>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { socket } = useSocket()
  const formatDate = (date: string) => {
    const newDate = new Date(date)
    return newDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    if (socket && user?._id && chatPartner?.chatPartner._id) {
      const newRoomId = [user._id, chatPartner.chatPartner._id].sort().join('_')
      setRoomId(newRoomId)

      socket.emit('joinRoom', newRoomId)
      console.log('joinRoom', newRoomId)

      socket.on('previousMessages', (messages) => {
        if (Array.isArray(messages)) {
          setLocalMessages(messages)
        } else {
          setLocalMessages([])
        }
      })

      socket.on('receiveMessage', (message) => {
        console.log('receiveMessage', message)
        setLocalMessages((prev) => [...prev, message])
      })

      return () => {
        socket.off('previousMessages')
        socket.off('receiveMessage')
      }
    }
  }, [socket, user?._id, chatPartner?.chatPartner._id])

  console.log('localMessages', localMessages)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current.querySelector('.mantine-ScrollArea-viewport')
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }
  }, [localMessages])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowEmoji(false)
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault() // Ngăn không cho xuống dòng mới
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim() && !selectedImage) return

    const message = {
      senderId: user?._id,
      receiverId: chatPartner?.chatPartner._id,
      content: messageInput.trim() || null,
      file: selectedImage || null,
      fileName: selectedImage ? 'image.jpg' : null,
      fileType: selectedImage ? 'image/jpeg' : null,
      createdAt: new Date().toISOString() as string,
    }

    if (socket) {
      socket.emit('sendMessage', message)
      setLocalMessages((prev) => [...prev, message])
    }

    setMessageInput('')
    setSelectedImage(undefined)
    setShowEmoji(false)
  }

  const handleEmojiSelect = (emoji: any) => {
    const cursor = (document.activeElement as HTMLInputElement)?.selectionStart || messageInput.length
    const newMessage = messageInput.slice(0, cursor) + emoji.native + messageInput.slice(cursor)
    setMessageInput(newMessage)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        const message = {
          senderId: user?._id,
          receiverId: chatPartner?.chatPartner._id,
          content: null,
          file: reader.result as string,
          fileName: file.name,
          fileType: file.type,
          createdAt: new Date().toISOString() as string,
        }

        if (socket) {
          socket.emit('sendMessage', message)
          setLocalMessages((prev) => [...prev, message])
        }
      }
      reader.readAsDataURL(file)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <Paper className="fixed bottom-0 z-max w-[330px] max-w-[330px] h-[455px] rounded-t-lg shadow-2xl">
      {/* Header */}
      <div className="h-14 bg-green-700 rounded-t-lg px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={chatPartner?.chatPartner.avatar} size="md" radius="xl" />
          <div className="text-white">
            <p className="font-semibold">
              {chatPartner?.chatPartner.firstname + ' ' + chatPartner?.chatPartner.lastname}
            </p>
            <p className="text-sm">Đang hoạt động</p>
          </div>
        </div>
        <div className="flex gap-2">
          <ActionIcon variant="transparent" color="white" onClick={onMinimize}>
            <IconifyIcon icon="pepicons-pop:minus" fontSize={24} />
          </ActionIcon>
          <ActionIcon
            variant="transparent"
            color="white"
            onClick={() => {
              setActiveChats(activeChats.filter((chat) => chat.chatPartner._id !== chatPartner?.chatPartner._id))
              setRoomId('')
              setLocalMessages([])
            }}
          >
            <IconifyIcon icon="material-symbols:close" fontSize={24} />
          </ActionIcon>
        </div>
      </div>

      {/* Chat content */}
      <ScrollArea h={340} w={330} px="md" pb="md" ref={scrollAreaRef}>
        <div className="space-y-4">
          {Array.isArray(localMessages) &&
            localMessages.map((message) => (
              <div
                key={message._id || Date.now()}
                className={`flex items-end gap-2 ${message.senderId._id === user?._id || message.senderId === user?._id ? 'justify-end' : ''}`}
              >
                {(message.senderId._id === chatPartner?.chatPartner._id ||
                  message.senderId === chatPartner?.chatPartner._id) && (
                  <Avatar src={chatPartner?.chatPartner.avatar} size="sm" radius="xl" />
                )}
                <div
                  className={`p-2 rounded-lg max-w-[70%] ${
                    message.senderId._id === user?._id || message.senderId === user?._id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  {message.content && <p>{message.content}</p>}
                  {(message.image || message.file) && (
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedImage(message.image)
                        openImagePreview()
                      }}
                    >
                      <MantineImage
                        src={message.image || message.file}
                        alt="Sent image"
                        radius="md"
                        fit="contain"
                        className="max-h-[200px] max-w-[200px]"
                      />
                    </div>
                  )}
                  <span className="text-xs text-gray-800 block mt-1">{formatDate(message.createdAt)}</span>
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>

      {/* Input chat */}
      <div className="absolute bottom-0 w-full p-3 bg-white border-t">
        <div className="flex items-center justify-between w-full gap-2">
          <TextInput
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ width: '100%' }}
            placeholder="Nhập tin nhắn... (Nhấn Enter để gửi)"
          />
          <div className="flex gap-2 ">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            <ActionIcon
              variant="transparent"
              color="gray"
              onClick={(e) => {
                e.stopPropagation()
                setShowEmoji(!showEmoji)
              }}
            >
              <IconifyIcon icon="solar:sticker-smile-square-bold" />
            </ActionIcon>
            <ActionIcon variant="transparent" color="gray" onClick={() => fileInputRef.current?.click()}>
              <IconifyIcon icon="material-symbols:image" />
            </ActionIcon>
          </div>
        </div>

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="absolute bottom-14 right-0" onClick={(e) => e.stopPropagation()}>
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="light"
              locale="vi"
              onClickOutside={() => setShowEmoji(false)}
            />
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      <Modal opened={imagePreview} onClose={closeImagePreview} size="lg" centered>
        <MantineImage src={selectedImage} alt="Preview" fit="contain" />
      </Modal>
    </Paper>
  )
}
