'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useClient } from '@/hooks/useClient'
import { CloseOutlined } from '@ant-design/icons'

export const FilterTag = () => {
  const { categories, brands } = useClient()
  const param = useSearchParams()
  const router = useRouter()
  const [paramsObj, setParamsObj] = useState<Record<string, string[]>>({})

  useEffect(() => {
    const newParamsObj: Record<string, string[]> = {}

    param.forEach((value, key) => {
      if (newParamsObj[key]) {
        newParamsObj[key].push(value)
      } else {
        newParamsObj[key] = [value]
      }
    })

    setParamsObj(newParamsObj)
  }, [param])

  // Helper function to find name by id in categories or brands
  const getCategoryName = (id: string) => {
    const category = categories?.find((cat) => cat._id === id)
    return category ? category.name : id
  }

  const getBrandName = (id: string) => {
    const brand = brands?.find((br) => br._id === id)
    return brand ? brand.name : id
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

  // Function to clear all filters
  const clearAll = () => {
    const currentParams = new URLSearchParams()

    // Update the URL to remove all parameters
    router.replace(`?${currentParams.toString()}`)
  }

  // Count total number of tags
  const totalTags = Object.values(paramsObj).reduce((acc, values) => acc + values.length, 0)

  return (
    <>
      {/* Show "Clear All" button if more than 5 tags */}
      {totalTags > 5 && (
        <button
          onClick={clearAll}
          className="mt-4 mb-2 px-4 py-2 text-white rounded-md shadow-md cursor-pointer"
          style={{
            backgroundColor: '#f87171',
          }}
        >
          Xóa tất cả
        </button>
      )}
      {/* Filter tags */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(paramsObj).map(([key, values]) =>
          values.map((value, index) => {
            let displayName = value

            if (key === 'filterCategory') {
              displayName = getCategoryName(value)
            } else if (key === 'filterBrand') {
              displayName = getBrandName(value)
            }

            return (
              <div
                onClick={() => removeTag(key, value)} // Call removeTag when clicked
                key={`${key}-${index}`}
                style={{
                  backgroundColor: '#b2e5be',
                  textTransform: 'capitalize',
                }}
                className="px-4 py-2 rounded-md shadow-md text-black text-xl cursor-pointer"
              >
                {displayName}
                {/* Add delete button */}
                <span
                  style={{
                    cursor: 'pointer',
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  }}
                  onClick={() => removeTag(key, value)} // Call removeTag when clicked
                >
                  <CloseOutlined
                    style={{
                      cursor: 'pointer',
                    }}
                  />
                </span>
              </div>
            )
          }),
        )}
      </div>
    </>
  )
}
