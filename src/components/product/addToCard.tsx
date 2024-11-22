'use client'
import { Modal } from '@mantine/core'
import { useProductClient } from '@/zustand/productClient'
import { useClient } from '@/hooks/useClient'
import ColorSelection from './colorselection'
import SizeSelection from './sizeselection'
import QuantitySelection from './quantityselection'
import { ProductsClient } from '@/types/users/productTypes'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import cartService from '@/services/cart/cart.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'

export default function AddToCard({
  product,
  uniqueColors,
  uniqueSizes,
  selectedColor,
  selectedSize,
  validColors,
  validSizes,
  count,
  setCount,
  handleColorToggle,
  handleSizeToggle,
  maxQuantity,
  totalQuantity,
  setSelectedColor,
  setSelectedSize,
}: {
  product: ProductsClient
  uniqueColors: string[]
  uniqueSizes: string[]
  selectedColor: string | null
  selectedSize: string | null
  validColors: string[]
  validSizes: string[]
  count: number
  setCount: (count: number) => void
  handleColorToggle: (color: string) => void
  handleSizeToggle: (size: string) => void
  maxQuantity: number
  totalQuantity: number
  setSelectedColor: (color: string) => void
  setSelectedSize: (size: string) => void
}) {
  const { openAddToCardModal, toggleAddToCardModal } = useProductClient()
  const { isMobile } = useClient()
  const [addToCard, setAddToCard] = useState<boolean>(false)

  useEffect(() => {
    const handleValidate = () => {
      if (selectedColor && selectedSize && count > 0) {
        setAddToCard(true)
      } else {
        setAddToCard(false)
      }
    }

    handleValidate()
  }, [selectedColor, selectedSize, count])

  const handleAddToCard = async () => {
    if (addToCard) {
      const data = {
        productId: product._id,
        size: selectedSize || '',
        color: selectedColor || '',
        amount: count,
      }
      await cartService.addToCart(
        data,
        () => {
          toast.success('Đã thêm sản phẩm vào giỏ hàng!')
          mutate('/api/cart')
          toggleAddToCardModal()
          setSelectedColor('')
          setSelectedSize('')
          setCount(1)
        },
        (message: string) => {
          toast.error(message)
        },
      )
    }
  }

  const onClose = () => {
    toggleAddToCardModal()
    setSelectedColor('')
    setSelectedSize('')
    setCount(1)
  }

  if (!product) return null
  return (
    <>
      <Modal
        title={<h2 className="font-semibold text-xl">Thêm vào giỏ hàng</h2>}
        centered
        size={isMobile ? '100%' : '70%'}
        opened={openAddToCardModal}
        onClose={onClose}
      >
        <h1 className="text-2xl font-semibold">{product.productName}</h1>
        <p>Vui lòng chọn màu sắc, kích thước và số lượng bạn muốn thêm cho sản phẩm này</p>
        <p className="font-semibold">Phân loại:</p>
        <div className="flex flex-col gap-3">
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
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleAddToCard}
            disabled={!addToCard}
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
              backgroundColor: addToCard ? '#179d49' : '#ccc',
              color: '#fff',
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </Modal>
    </>
  )
}
