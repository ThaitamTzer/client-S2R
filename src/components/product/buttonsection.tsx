'use client'
import { ProductsClient } from '@/types/users/productTypes'
import { Button } from 'antd'
import IconifyIcon from '../icons'
import { useUserAction } from '@/zustand/user'
import { mutate } from 'swr'

export default function ButtonSection({
  product,
  user,
  onCreateExchange,
}: {
  product: ProductsClient
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  onCreateExchange: () => void
}) {
  const { setRoomId, setActiveChats, setChatPartner, setChatUsers, RoomId, chatusers } = useUserAction()

  const handleSelectChat = (item: ProductsClient) => {
    setRoomId([user?._id, item.userId._id].sort().join('_'))
    setActiveChats([
      {
        chatPartner: {
          _id: item.userId._id,
          avatar: item.userId.avatar,
          firstname: item.userId.firstname,
          lastname: item.userId.lastname,
        },
        message: {
          _id: item._id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          image: '',
          roomId: RoomId,
          myId: user?._id || '',
        },
        unreadCount: 0,
      },
    ])
    setChatPartner({
      chatPartner: {
        _id: item.userId._id,
        avatar: item.userId.avatar,
        firstname: item.userId.firstname,
        lastname: item.userId.lastname,
      },
      message: {
        _id: item._id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        image: '',
        roomId: RoomId,
        myId: user?._id || '',
      },
      unreadCount: 0,
    })
    setChatUsers(chatusers.filter((u) => u.message._id !== item._id))
    mutate('/api/messages/get-room')
  }

  return (
    <>
      <div className="flex flex-row">
        {product.type === 'barter' && (
          <>
            <Button
              disabled={!user || user._id === product.userId._id}
              onClick={() => {
                handleSelectChat(product)
              }}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '300px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#b2e5be',
                color: '#179d49',
              }}
            >
              Liên hệ ngay
            </Button>

            <Button
              disabled={!user}
              onClick={onCreateExchange}
              variant="outlined"
              type="primary"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '300px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#179d49',
                color: '#fff',
              }}
            >
              Trao đổi ngay
            </Button>
            {!user && <p className="text-sm text-red-500">Đăng nhập để tạo yêu cầu trao đổi</p>}
          </>
        )}

        {product.type === 'sale' && (
          <>
            <Button
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '200px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#b2e5be',
                color: '#179d49',
              }}
            >
              Liên hệ ngay
            </Button>

            <Button
              variant="outlined"
              type="primary"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '200px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#179d49',
                color: '#fff',
              }}
            >
              Mua ngay
            </Button>
          </>
        )}
        {product.type === 'donate' && (
          <>
            <Button
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '200px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#b2e5be',
                color: '#179d49',
              }}
            >
              Yêu thích <IconifyIcon icon="fluent-emoji-flat:red-heart" />
            </Button>

            <Button
              variant="outlined"
              type="primary"
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                marginRight: '16px',
                width: '200px',
                height: '55px',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: '#179d49',
                color: '#fff',
              }}
            >
              Liên hệ ngay
            </Button>
          </>
        )}
      </div>
    </>
  )
}
