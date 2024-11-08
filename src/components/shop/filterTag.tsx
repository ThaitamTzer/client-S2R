'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { useGetName } from '@/helper/getName'
import { useUserAction } from '@/zustand/user'

const FilterTag = () => {
  const param = useSearchParams()
  const { paramsObj, setParamsObj } = useUserAction()
  const {
    getMaterialName,
    getColorName,
    getCategoryName,
    getBrandName,
    getConditionName,
    getTypeCategory,
    getPriceRange,
    getTypeProduct,
    getStyleName,
    clearAll,
    removeTag,
    removeTwoTags,
  } = useGetName()

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
        {Object.entries(paramsObj).map(([key, values]) => {
          // Combine 'filterStartPrice' and 'filterEndPrice' into one tag
          if (key === 'filterStartPrice' && paramsObj.filterEndPrice) {
            const startPrice = paramsObj.filterStartPrice[0]
            const endPrice = paramsObj.filterEndPrice[0]
            const displayName = getPriceRange(startPrice, endPrice)

            return (
              <div
                onClick={() => {
                  removeTwoTags('filterStartPrice', startPrice, 'filterEndPrice', endPrice)
                }}
                key={`price-range-tag`}
                style={{
                  backgroundColor: '#b2e5be',
                  textTransform: 'capitalize',
                }}
                className="px-4 py-2 rounded-md shadow-md text-black text-xl cursor-pointer"
              >
                {displayName}
                <span
                  style={{
                    cursor: 'pointer',
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  }}
                  onClick={() => {
                    removeTwoTags('filterStartPrice', startPrice, 'filterEndPrice', endPrice)
                  }}
                >
                  <CloseOutlined />
                </span>
              </div>
            )
          }

          // Prevent 'filterEndPrice' from creating its own tag if 'filterStartPrice' exists
          if (key === 'filterEndPrice' && paramsObj.filterStartPrice) {
            return null
          }

          return values.map((value, index) => {
            let displayName = value

            switch (key) {
              case 'filterMaterial':
                displayName = getMaterialName(value)
                break
              case 'filterColor':
                displayName = getColorName(value)
                break
              case 'filterCategory':
                displayName = getCategoryName(value)
                break
              case 'filterBrand':
                displayName = getBrandName(value)
                break
              case 'filterCondition':
                displayName = getConditionName(value)
                break
              case 'filterType':
                displayName = getTypeProduct(value)
                break
              case 'filterStyle':
                displayName = getStyleName(value)
                break
              case 'filterTypeCategory':
                displayName = getTypeCategory(value)
                break
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
                <span
                  style={{
                    cursor: 'pointer',
                    paddingLeft: '10px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                  }}
                  onClick={() => removeTag(key, value)}
                >
                  <CloseOutlined />
                </span>
              </div>
            )
          })
        })}
      </div>
    </>
  )
}

export default FilterTag
