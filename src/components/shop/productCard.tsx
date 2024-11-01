'use client'
import { Card } from 'antd'
import Image from 'next/image'
import { formatPrice } from '@/helper/format'
import { ProductsClient } from '@/types/users/productTypes'
import Link from 'next/link'

export default function ProductCard({
  product,
  isLoading,
}: {
  product: ProductsClient
  isLoading: boolean
}) {
  const { Meta } = Card

  return (
    <>
      <Link href={`/shop/${product.slug}`} key={product._id} prefetch={true}>
        <Card
          key={product._id}
          hoverable={true}
          loading={isLoading}
          className="shadow-sm"
          size="default"
          style={{
            width: '265px',
            border: '2px solid #f0f0f0',
            height: '100%',
          }}
          cover={
            <div
              style={{
                width: '100%', // Fixed width for the image container
                height: '330px', // Fixed height for the image container
                overflow: 'hidden', // Ensures the image fits the container without overflow
                position: 'relative',
              }}
            >
              {product.type === 'barter' && (
                <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1">
                  Trao đổi
                </div>
              )}
              {product.condition === 'new' && (
                <div className="absolute top-0 right-0 text-white bg-red-500 px-2 py-1">Mới</div>
              )}
              <Image
                src={product.imgUrls?.[0]}
                alt={product.productName}
                width={400}
                height={300}
                loading="lazy"
                className="object-cover w-full h-full"
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={70}
              />
            </div>
          }
        >
          <Meta title={<p className="text-xl">{product.productName}</p>} />
          <Meta
            title={
              <p className="text-lg font-normal">
                Kích thước:{' '}
                {Array.from(new Set(product.sizeVariants.map((variant) => variant.size)))
                  .slice(0, 3)
                  .map((size, index) => (
                    <span key={index}>
                      {size}
                      {index < product.sizeVariants.slice(0, 3).length - 1 && ', '}
                    </span>
                  ))}
                {product.sizeVariants.length > 3 && ',...'}
              </p>
            }
          />
          <Meta
            title={
              <p className="text-xl font-semibold text-green-800">
                {product.type === 'barter' ? (
                  <>
                    <p>Liên hệ</p>
                    <p className="text-sm underline">Xem ngay</p>
                  </>
                ) : (
                  <>
                    <p>{formatPrice(product.price) + 'đ'}</p>
                    <p className="text-sm underline">Xem ngay</p>
                  </>
                )}
              </p>
            }
          />
          <Meta
            style={{
              marginTop: '15px',
            }}
            title={
              <div className="flex">
                <div className="w-5 h-5 overflow-hidden rounded-full mr-2">
                  <Image
                    src={product.userId?.avatar}
                    alt={product.userId?.firstname + ' ' + product.userId?.lastname}
                    width={20}
                    height={20}
                    className="object-cover w-full h-full"
                    priority={false}
                    sizes="40px"
                    quality={20}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <p className="text-sm font-semibold">
                    {product.userId?.firstname + ' ' + product.userId?.lastname}
                  </p>
                </div>
              </div>
            }
          />
        </Card>
      </Link>
    </>
  )
}
