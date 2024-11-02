'use client'
import { useAuth } from '@/hooks/useAuth'
import { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Khởi tạo kết nối socket
      const socketInstance = io('https://share2receive-server.onrender.com', {
        withCredentials: true,
        reconnection: true, // Enable reconnection attempts
        reconnectionAttempts: 5, // Max number of reconnection attempts
        reconnectionDelay: 1000, // Delay between reconnection attempts
      })

      socketInstance.on('connect', () => {
        setIsConnected(true)
        console.log('Connected to socket')
      })

      socketInstance.on('disconnect', () => {
        setIsConnected(false)
        console.log('Disconnected from socket')
        setTimeout(() => {
          socketInstance.connect()
        }, 1000)
      })

      setSocket(socketInstance)

      return () => {
        socketInstance.disconnect()
      }
    }
  }, [user])

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}

export { SocketContext, SocketProvider }
