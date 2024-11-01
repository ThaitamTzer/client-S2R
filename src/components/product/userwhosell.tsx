import { ProductsClient } from '@/types/users/productTypes'
import Image from 'next/image'
import IconifyIcon from '../icons'

export default function UserWhosell({ product }: { product: ProductsClient }) {
  return (
    <>
      <div className="flex flex-row justify-start items-center">
        <p className="text-lg">Người bán: </p>
        <div className="flex flex-row items-center ml-2">
          <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
            <Image
              src={product.userId.avatar}
              alt={product.userId.firstname + ' ' + product.userId.lastname}
              width={50}
              height={50}
              quality={50}
              className="object-cover"
            />
          </div>
          <p className="text-lg font-semibold">
            {product.userId.firstname + ' ' + product.userId.lastname}
          </p>
        </div>
      </div>
      {product?.userId?.averageRating !== null && (
        <div className="flex flex-row items-center gap-1">
          <p className="text-lg">Đánh giá của người bán: </p>
          <p className="text-lg ml-2">{product?.userId?.averageRating?.toFixed(2)} / 5 </p>
          <IconifyIcon icon="fluent-emoji-flat:star" width={25} height={25} />
          <p className="text-lg">({product?.userId?.numberOfRating} đánh giá)</p>
        </div>
      )}
    </>
  )
}
