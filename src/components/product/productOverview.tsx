import { formatPrice } from '@/helper/format'
import Image from 'next/image'
import { Carousel } from '@mantine/carousel'
import { Carousel as CarouselAntd } from 'antd'
import { ProductsClient } from '@/types/users/productTypes'
import { Suspense, lazy } from 'react'
import Loading from '@/app/loading'

const ShippingSection = lazy(() => import('./shippingsection'))
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
        <div className="flex flex-col md:flex-row justify-between">
          <div className="product-image hidden w-[55%] md:flex justify-between flex-row min-h-[675px] max-h-[675px]">
            <div className="list-image h-full min-w-[95px]">
              <Carousel
                withIndicators={false}
                withControls={product.imgUrls.length > 4 ? true : false}
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
                        width={150}
                        height={150}
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
                <div className="absolute top-0 left-0 bg-green-800 text-white px-2 py-1 z-10">Trao đổi</div>
              )}
              {/* Display the main image */}
              <Image
                src={mainImage} // Use mainImage state
                alt={product.productName}
                width={600}
                height={600}
                loading="lazy"
                quality={90}
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:hidden">
            <CarouselAntd arrows autoplay>
              {product.imgUrls.map((imgUrl, index) => (
                <div
                  key={index}
                  className="relative w-full h-[480px] my-2 overflow-hidden"
                  onClick={() => setMainImage(imgUrl)} // Update mainImage when clicked
                  style={{
                    border: mainImage === imgUrl ? '2px solid #179d49' : '1px solid #fff',
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={product.productName}
                    width={500}
                    height={500}
                    loading="lazy"
                    quality={70}
                    className=" absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </CarouselAntd>
          </div>
          <div className="product-info md:w-[45%] mt-3">
            <div className="h-full w-full flex flex-col gap-3 md:gap-5">
              <h1 className="text-lg md:text-3xl font-semibold break-words whitespace-normal">{product.productName}</h1>
              {product.type === 'barter' ? (
                <div className="flex flex-row items-center">
                  <p className="text-md md:text-2xl font-semibold text-green-800">Sản phẩm trao đổi</p>
                </div>
              ) : (
                <div className="flex flex-row items-center">
                  <p className="text-md md:text-2xl font-semibold text-green-800">{formatPrice(product.price)}đ</p>
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
                <ShippingSection />
                <UserWhosell product={product} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
