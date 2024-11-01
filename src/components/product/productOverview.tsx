import { formatPrice } from '@/helper/format'
import Image from 'next/image'
import { Carousel } from '@mantine/carousel'
import { ProductsClient } from '@/types/users/productTypes'
import { Suspense, lazy } from 'react'
import Loading from '@/app/loading'

const ShippingSention = lazy(() => import('./shippingsestion'))
const UserWhosell = lazy(() => import('./userwhosell'))
const ColorSelection = lazy(() => import('./colorselection'))
const SizeSelection = lazy(() => import('./sizeselection'))
const QuantitySelection = lazy(() => import('./quantityselection'))
const ButtonSection = lazy(() => import('./buttonsection'))

export default function ProductOverview({
  product,
  mainImage,
  setMainImage,
  uniqueColors,
  uniqueSizes,
  selectedColor,
  selectedSize,
  validColors,
  validSizes,
  count,
  handleColorToggle,
  handleSizeToggle,
  maxQuantity,
  totalQuantity,
  onCreateExchange,
  user,
  classes,
  setCount,
}: {
  product: ProductsClient
  mainImage: string
  setMainImage: (image: string) => void
  uniqueColors: string[]
  uniqueSizes: string[]
  selectedColor: string | null
  selectedSize: string | null
  validColors: string[]
  validSizes: string[]
  count: number
  handleColorToggle: (color: string) => void
  handleSizeToggle: (size: string) => void
  maxQuantity: number
  totalQuantity: number
  onCreateExchange: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null
  classes: Record<string, string>
  setCount: (count: number) => void
}) {
  return (
    <>
      <div className="product-overview">
        <div className="flex flex-row justify-between">
          <div className="product-image w-[55%] flex justify-between flex-row min-h-[675px] max-h-[675px]">
            <div className="list-image h-full min-w-[95px]">
              <Carousel
                withIndicators={false}
                orientation="vertical"
                height={600}
                align="start"
                slideGap={2}
                loop
                slideSize="25%"
                classNames={classes}
                slidesToScroll={1}
              >
                {product.imgUrls.map((imgUrl, index) => (
                  <Carousel.Slide key={index}>
                    <div
                      className="relative w-full h-full min-h-[120px] max-h-[120px] my-2 overflow-hidden rounded-lg"
                      onClick={() => setMainImage(imgUrl)} // Update mainImage when clicked
                      style={{
                        border: mainImage === imgUrl ? '2px solid #179d49' : '1px solid #fff',
                      }}
                    >
                      <Image
                        src={imgUrl}
                        alt={product.productName}
                        width={80}
                        height={80}
                        loading="lazy"
                        quality={70}
                        className=" absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
            <div className="relative w-full max-w-[calc(100%-160px)] h-full overflow-hidden rounded-lg mr-10 mt-[9px]">
              {product.type === 'barter' && (
                <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1 z-10">
                  Trao đổi
                </div>
              )}
              {/* Display the main image */}
              <Image
                src={mainImage} // Use mainImage state
                alt={product.productName}
                width={500}
                height={500}
                loading="lazy"
                quality={80}
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="product-info w-[45%] mt-3">
            <div className="h-full w-full flex flex-col gap-5">
              <h1 className="text-3xl font-semibold break-words whitespace-normal">
                {product.productName}
              </h1>
              {/* <p className="text-lg  text-green-700">{product.description}</p> */}
              {product.type === 'barter' ? (
                <div className="flex flex-row items-center">
                  <p className="text-2xl font-semibold text-green-800">Sản phẩm trao đổi</p>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <p className="text-2xl font-semibold text-green-800">
                    {formatPrice(product.price)}đ
                  </p>
                </div>
              )}
              <Suspense fallback={<Loading />}>
                {/* Color Selection */}
                <ColorSelection
                  uniqueColors={uniqueColors}
                  selectedColor={selectedColor || ''}
                  handleColorToggle={handleColorToggle}
                  validColors={validColors}
                />

                {/* Size Selection */}
                <SizeSelection
                  uniqueSizes={uniqueSizes}
                  selectedSize={selectedSize || ''}
                  handleSizeToggle={handleSizeToggle}
                  validSizes={validSizes}
                />

                {/* Quantity Selector */}
                <QuantitySelection
                  count={count}
                  setCount={setCount}
                  maxQuantity={maxQuantity}
                  totalQuantity={totalQuantity}
                />
                {/* Button section */}
                <ButtonSection product={product} user={user} onCreateExchange={onCreateExchange} />
                {/* Mô tả vận chuyển */}
                <ShippingSention />
                <UserWhosell product={product} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
