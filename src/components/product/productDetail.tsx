'use client'
import { ProductsClient } from '@/types/users/productTypes'
import Image from 'next/image'
import { Carousel } from '@mantine/carousel'
import classes from '@/styles/product.module.css'
import { formatPrice } from '@/helper/format'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { useGetName } from '@/helper/getName'
import toast from 'react-hot-toast'
import { useExchange } from '@/zustand/exchange'
import { CreateExchangeModal } from '../exchange/openCreateExchange'
import { useAuth } from '@/hooks/useAuth'

export default function ProductDetail({ product }: { product: ProductsClient }) {
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState(product.imgUrls[0]) // New state for the main image
  const { getMaterialName, getConditionName } = useGetName()
  const { setOpenCreateExchangeModal, setData } = useExchange()

  const uniqueSizes = Array.from(new Set(product.sizeVariants.map((v) => v.size)))
  const uniqueColors = Array.from(new Set(product.sizeVariants.map((v) => v.colors)))

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [maxQuantity, setMaxQuantity] = useState<number>(1)
  const [totalQuantity, setTotalQuantity] = useState<number>(0)

  const validColors = selectedSize
    ? product.sizeVariants
        .filter((variant) => variant.size === selectedSize)
        .map((variant) => variant.colors)
    : uniqueColors

  const validSizes = selectedColor
    ? product.sizeVariants
        .filter((variant) => variant.colors === selectedColor)
        .map((variant) => variant.size)
    : uniqueSizes

  // Function to update the max quantity based on selected size and color
  const updateMaxQuantity = () => {
    const selectedVariant = product.sizeVariants.find(
      (variant) => variant.size === selectedSize && variant.colors === selectedColor,
    )
    if (selectedVariant) {
      setMaxQuantity(selectedVariant.amount)
    } else {
      setMaxQuantity(1)
    }
  }

  // Function to update max quantity and total quantity
  const updateQuantities = () => {
    if (selectedSize && selectedColor) {
      const selectedVariant = product.sizeVariants.find(
        (variant) => variant.size === selectedSize && variant.colors === selectedColor,
      )
      if (selectedVariant) {
        setMaxQuantity(selectedVariant.amount)
        setTotalQuantity(selectedVariant.amount)
      } else {
        setMaxQuantity(1)
        setTotalQuantity(0)
      }
    } else {
      // If no specific size or color is selected, sum all quantities
      const total = product.sizeVariants.reduce((sum, variant) => sum + variant.amount, 0)
      setTotalQuantity(total)
      setMaxQuantity(total) // Assuming maxQuantity is total for the initial view
    }
  }

  // Call updateMaxQuantity whenever selectedSize or selectedColor changes
  useEffect(() => {
    updateQuantities()
    updateMaxQuantity()
    setCount(1) // Reset count to 1 whenever the selection changes
  }, [selectedSize, selectedColor])

  const handleSizeToggle = (size: string) => {
    setSelectedSize(selectedSize === size ? null : size)
  }

  const handleColorToggle = (color: string) => {
    setSelectedColor(selectedColor === color ? null : color)
  }

  const onCreateExchange = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Vui lòng chọn kích cỡ và màu sắc trước khi tạo yêu cầu trao đổi')
      return
    }

    const exchangeData = {
      productId: product._id,
      size: selectedSize,
      colors: selectedColor,
      amount: count.toString(), // Convert amount to string
    }

    setData(exchangeData)
    setOpenCreateExchangeModal(true)
  }

  const { user } = useAuth()

  if (product)
    return (
      <>
        <CreateExchangeModal />
        <div className="container mx-auto px-24 mt-48">
          <div className="product-overview">
            <div className="flex flex-row justify-between">
              <div className="product-image w-[55%] flex justify-between flex-row min-h-[675px] max-h-[675px]">
                <div className="relative w-full max-w-[calc(100%-160px)] h-full overflow-hidden rounded-lg">
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
                <div className="list-image h-full min-w-[95px] mr-10">
                  <Carousel
                    withIndicators={false}
                    orientation="vertical"
                    height={600}
                    align="start"
                    slideGap={2}
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
              </div>
              <div className="product-info w-[50%]">
                <div className="h-full w-full flex flex-col gap-5">
                  <h1 className="text-4xl font-bold text-green-900">{product.productName}</h1>
                  <p className="text-lg  text-green-700">{product.description}</p>
                  {product.type === 'barter' ? (
                    <div className="flex flex-row items-center">
                      <p className="text-2xl font-semibold text-green-800">Liên hệ</p>
                    </div>
                  ) : (
                    <div className="flex flex-row items-center">
                      <p className="text-2xl font-semibold text-green-800">
                        {formatPrice(product.price)}đ
                      </p>
                    </div>
                  )}
                  {/* Color Selection */}
                  <div className="flex flex-row items-center">
                    <p className="text-lg">Màu sắc: </p>
                    <div className="flex flex-row ml-2">
                      {uniqueColors.map((color) => (
                        <div key={color} className="w-full h-full mr-2">
                          <input
                            type="checkbox"
                            id={`color-${color}`}
                            name="color"
                            value={color}
                            className="hidden peer"
                            onChange={() => handleColorToggle(color)}
                            checked={selectedColor === color}
                            disabled={!validColors.includes(color)}
                          />
                          <label
                            htmlFor={`color-${color}`}
                            className={`inline-flex items-center justify-between w-full text-gray-500 bg-white border-2 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:border-2 ${
                              validColors.includes(color)
                                ? 'border-gray-200 hover:bg-gray-50'
                                : 'opacity-50 cursor-not-allowed border-gray-300'
                            }`}
                          >
                            <div
                              className="w-8 h-8 rounded-full border-2"
                              style={{ backgroundColor: color }}
                            ></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="flex flex-row items-center">
                    <p className="text-lg">Kích cỡ: </p>
                    <div className="flex flex-row ml-2">
                      {uniqueSizes.map((size) => (
                        <div key={size} className="w-full h-full mr-2">
                          <input
                            type="checkbox"
                            id={`size-${size}`}
                            name="size"
                            value={size}
                            className="hidden peer"
                            onChange={() => handleSizeToggle(size)}
                            checked={selectedSize === size}
                            disabled={!validSizes.includes(size)}
                          />
                          <label
                            htmlFor={`size-${size}`}
                            className={`inline-flex items-center justify-between w-full bg-white border-2 rounded-lg cursor-pointer peer-checked:border-green-500 peer-checked:border-2 ${
                              validSizes.includes(size)
                                ? 'border-gray-200 hover:bg-gray-50'
                                : 'opacity-50 cursor-not-allowed border-gray-300'
                            }`}
                          >
                            <div className="text-lg font-semibold p-5 flex justify-center items-center w-5 h-5">
                              {size}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row justify-start items-center">
                    <p className="text-lg">Chất liệu: </p>
                    <p className="text-lg ml-2">{getMaterialName(product.material)}</p>
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <p className="text-lg">Tình trạng: </p>
                    <p className="text-lg ml-2">{getConditionName(product.condition)}</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex flex-row justify-start items-center">
                    <p className="text-lg">Số lượng: </p>
                    <div className="flex flex-row items-center ml-2">
                      <Button
                        icon={<MinusOutlined style={{ fontSize: '16px', color: '#000' }} />}
                        onClick={() => setCount(count - 1)}
                        disabled={count === 1}
                      />
                      <p className="text-lg bg-white px-6 py-2 rounded-xl text-center">{count}</p>
                      <Button
                        icon={<PlusOutlined style={{ fontSize: '16px', color: '#000' }} />}
                        onClick={() => setCount(count + 1)}
                        disabled={count >= maxQuantity}
                      />
                    </div>
                    <p className="ml-4 text-sm text-gray-600">Còn lại: {totalQuantity} sản phẩm</p>
                  </div>
                  <div className="flex flex-row">
                    {product.type === 'barter' ? (
                      <>
                        <Button
                          disabled={!user || user._id === product.userId._id}
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
                          disabled={!user}
                          onClick={onCreateExchange}
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
                          Trao đổi ngay
                        </Button>
                        {!user && (
                          <p className="text-sm text-red-500">Đăng nhập để tạo yêu cầu trao đổi</p>
                        )}
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
                  <div className="flex flex-row items-center">
                    <p className="mr-2">Hashtag: </p>
                    {product.tags.map((tag) => (
                      <div
                        key={tag}
                        className="bg-green-200 text-green-800 px-2 py-1 rounded-sm mr-2"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row justify-start items-center">
                    <p className="text-lg">Người bán: </p>
                    <div className="flex flex-row items-center ml-2">
                      <div className="w-10 h-10 overflow-hidden rounded-full mr-2">
                        <Image
                          src={product.userId.avatar}
                          alt={product.userId.firstname + ' ' + product.userId.lastname}
                          width={50}
                          height={50}
                          className="object-cover "
                        />
                      </div>
                      <p className="text-lg font-semibold">
                        {product.userId.firstname + ' ' + product.userId.lastname}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
