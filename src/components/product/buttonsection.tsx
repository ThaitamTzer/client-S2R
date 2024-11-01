import { ProductsClient } from '@/types/users/productTypes'
import { Button } from 'antd'

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
  return (
    <>
      <div className="flex flex-row">
        {product.type === 'barter' ? (
          <>
            <Button
              disabled={!user || user._id === product.userId._id}
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
        ) : (
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
              Thêm vào giỏ hàng
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
      </div>
    </>
  )
}
