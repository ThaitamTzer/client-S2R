'use server'
import { ConfigType } from '@/types/config'
import { ProductSClientList } from '@/types/users/productTypes'
const BASEURL = process.env.NEXT_PUBLIC_API_URL

export const fetchProducts = async (filterTypeCategory: string) => {
  try {
    const response = await fetch(
      `${BASEURL}/api/product/list-product-for-client?page=1&limit=10&filterTypeCategory=${filterTypeCategory}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      },
    )

    const data: ProductSClientList = await response.json()

    return data
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return null
  }
}

export const fetchTotalEcoOfAllUser = async () => {
  try {
    const response = await fetch(`${BASEURL}/api/statistics/get-static-eco-all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    const data: any = await response.json()

    return data
  } catch (error) {
    console.error('Failed to fetch total eco of all user:', error)
    return null
  }
}

export const fetchConfig = async () => {
  try {
    const res = await fetch(`${BASEURL}/api/configs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    })

    const data = await res.json()

    return data as ConfigType
  } catch (error) {
    console.error('Failed to fetch config:', error)
    return null
  }
}
