import { useClient } from '@/hooks/useClient'
import { colorData } from '@/metadata/colorData'
import { materialData } from '@/metadata/materialData'
import { clothingStylesData } from '@/metadata/styleData'
import { useRouter, useSearchParams } from 'next/navigation'

export const useGetName = () => {
  const { categories, brands } = useClient()
  const router = useRouter()
  const param = useSearchParams()

  // Helper function to find name by id in categories or brands
  const getCategoryName = (id: string) => {
    const category = categories?.find((cat) => cat._id === id)
    return category ? category.name : id
  }

  const getBrandName = (id: string) => {
    const brand = brands?.find((br) => br._id === id)
    return brand ? brand.name : id
  }

  const getMaterialName = (id: string) => {
    const material = materialData.find((mat) => mat.value === id)
    return material ? material.name : id
  }

  const getColorName = (id: string) => {
    const color = colorData.find((col) => col.value === id)
    return color ? color.name : id
  }

  const getPriceRange = (start: string, end: string) => {
    return `${start} - ${end}`
  }

  const getConditionName = (id: string) => {
    switch (id) {
      case 'new':
        return 'Mới'
      case 'used':
        return 'Đã sử dụng'
      default:
        return id
    }
  }

  const getTypeProduct = (id: string) => {
    switch (id) {
      case 'barter':
        return 'Trao đổi'
      case 'sale':
        return 'Bán'
      default:
        return id
    }
  }

  const getStyleName = (id: string) => {
    const style = clothingStylesData.find((st) => st.value === id)
    return style ? style.name : id
  }

  // Function to handle tag removal
  const removeTag = (key: string, value: string) => {
    const currentParams = new URLSearchParams(param.toString())

    // Remove the value from the current key
    const values = currentParams.getAll(key).filter((v) => v !== value)

    // If no values are left for the key, delete the key
    if (values.length === 0) {
      currentParams.delete(key)
    } else {
      currentParams.delete(key) // Remove existing key
      values.forEach((v) => currentParams.append(key, v)) // Add remaining values
    }

    // Update the URL without refreshing the page
    router.replace(`?${currentParams.toString()}`)
  }

  const removeTwoTags = (key1: string, value1: string, key2: string, value2: string) => {
    const currentParams = new URLSearchParams(param.toString())

    // Remove the value from the current key
    const values1 = currentParams.getAll(key1).filter((v) => v !== value1)
    const values2 = currentParams.getAll(key2).filter((v) => v !== value2)

    // If no values are left for the key, delete the key
    if (values1.length === 0) {
      currentParams.delete(key1)
    } else {
      currentParams.delete(key1) // Remove existing key
      values1.forEach((v) => currentParams.append(key1, v)) // Add remaining values
    }

    if (values2.length === 0) {
      currentParams.delete(key2)
    } else {
      currentParams.delete(key2) // Remove existing key
      values2.forEach((v) => currentParams.append(key2, v)) // Add remaining values
    }

    // Update the URL without refreshing the page
    router.replace(`?${currentParams.toString()}`)
  }

  // Function to clear all filters
  const clearAll = () => {
    const currentParams = new URLSearchParams()

    // Update the URL to remove all parameters
    router.replace(`?${currentParams.toString()}`)
  }

  return {
    getCategoryName,
    getBrandName,
    getMaterialName,
    getColorName,
    getPriceRange,
    getConditionName,
    getTypeProduct,
    getStyleName,
    removeTag,
    removeTwoTags,
    clearAll,
  }
}

export const getAllExchangeStatusName = (string: string) => {
  switch (string) {
    case 'pending':
      return 'Chờ xử lý'
    case 'accepted':
      return 'Đã duyệt'
    case 'canceled':
      return 'Đã hủy'
    case 'completed':
      return 'Đã hoàn thành'
    case 'rejected':
      return 'Đã bị từ chối'
    default:
      return string
  }
}
