import { formatPrice } from '@/helper/format'
import { useGetName } from '@/helper/getName'
import { type CartItem } from '@/types/cart'
import { Tooltip, UnstyledButton } from '@mantine/core'
import Image from 'next/image'
import IconifyIcon from '../icons'

export default function CartItem({
  item,
  handleDeleteCartItem,
}: {
  item: CartItem
  handleDeleteCartItem: (id: string) => void
}) {
  const { getColorName } = useGetName()

  return (
    <>
      <div key={item._id} className="cart_item flex gap-3">
        <div className="cart-item_image min-w-[100px] min-h-[140px] w-[100px] h-[140px] relative rounded-md overflow-hidden">
          <Image
            src={item.productId.imgUrls[0]}
            alt={item.productId.productName}
            width={100}
            height={100}
            quality={70}
            loading="lazy"
            className="object-cover absolute top-0 left-0 w-full h-full"
          />
        </div>
        <div className="cart-item_info flex flex-col items-start gap-1">
          <h3 className="text-green-900 text-lg font-semibold text-wrap max-h-[60px] overflow-hidden truncate">
            {item.productId.productName}
          </h3>
          <p className="text-green-900 text-sm font-semibold">{formatPrice(item.total)}đ</p>
          <div className="flex flex-row flex-wrap gap-2">
            <p className="text-green-900 text-sm font-semibold">Số lượng: {item.amount}</p>
            <p className="text-green-900 text-sm font-semibold">Kích thước: {item.size}</p>
            <p className="text-green-900 text-sm font-semibold">Màu sắc: {getColorName(item.color)}</p>
          </div>
          <Tooltip label="Xóa sản phẩm" position="right" withArrow>
            <div className="cart-item_action">
              <UnstyledButton onClick={() => handleDeleteCartItem(item._id)}>
                <IconifyIcon icon="mdi:trash-can-outline" className="text-red-900 w-6 h-6" />
              </UnstyledButton>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
