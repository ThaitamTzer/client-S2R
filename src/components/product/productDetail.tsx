'use client'
import { ProductsClient } from '@/types/users/productTypes'
import classes from '@/styles/product.module.css'
import { useEffect, useState } from 'react'
import { useGetName } from '@/helper/getName'
import toast from 'react-hot-toast'
import { useExchange } from '@/zustand/exchange'
import { CreateExchangeModal } from '../exchange/openCreateExchange'
import { useAuth } from '@/hooks/useAuth'
import dynamic from 'next/dynamic'
import ProductOverview from './productOverview'
import InforProduct from './inforProduct'

const RelatedProduct = dynamic(() => import('./relatedProduct'), { ssr: false })

export default function ProductDetail({ product }: { product: ProductsClient }) {
  const [count, setCount] = useState(1)
  const [mainImage, setMainImage] = useState(product.imgUrls[0]) // New state for the main image
  const { getMaterialName, getConditionName, getStyleName } = useGetName()
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
        <div className="px-36 py-5 mt-5 bg-slate-50">
          <ProductOverview
            product={product}
            mainImage={mainImage}
            setMainImage={setMainImage}
            uniqueColors={uniqueColors}
            uniqueSizes={uniqueSizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            validColors={validColors}
            validSizes={validSizes}
            count={count}
            handleColorToggle={handleColorToggle}
            handleSizeToggle={handleSizeToggle}
            maxQuantity={maxQuantity}
            totalQuantity={totalQuantity}
            onCreateExchange={onCreateExchange}
            user={user}
            classes={classes}
            setCount={setCount}
          />
        </div>
        <div className="container ml-24 px-40 w-full">
          <InforProduct
            product={product}
            getMaterialName={getMaterialName}
            getConditionName={getConditionName}
            getStyleName={getStyleName}
          />
        </div>
        <RelatedProduct categoryId={product.categoryId._id} />
      </>
    )
}
