'use client'

import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Collapse, Checkbox } from 'antd'
import { useClient } from '@/hooks/useClient'
import { sizes } from '@/metadata/sizeData'
import { colorData } from '@/metadata/colorData'
import { clothingStylesData } from '@/metadata/styleData'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { materialData } from '@/metadata/materialData'

const expandIcon = ({ isActive }: { isActive: boolean | undefined }) => {
  return isActive ? (
    <MinusOutlined
      style={{
        fontSize: '1.5rem',
        color: '#000',
      }}
    />
  ) : (
    <PlusOutlined
      style={{
        fontSize: '1.5rem',
        color: '#000',
      }}
    />
  )
}

const FilterSide = () => {
  const { categories, brands } = useClient()
  const [activeKey, setActiveKey] = useState<string[]>([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ])
  const handleCollapseChange = (key: string[]) => {
    setActiveKey(key)
  }

  const router = useRouter()
  const param = useSearchParams()

  const handleFilterChange = (checked: boolean, filterType: string, value: string) => {
    const currentParams = new URLSearchParams(param.toString())

    if (checked) {
      currentParams.append(filterType, value)
    } else {
      const filterValues = currentParams.getAll(filterType).filter((v) => v !== value)
      currentParams.delete(filterType)
      filterValues.forEach((v) => currentParams.append(filterType, v))
    }

    router.push(`?${currentParams.toString()}`, { scroll: false })
  }

  const isFilterChecked = (filterKey: string, filterValue: string) => {
    const filterValues = param.getAll(filterKey)
    return filterValues.includes(filterValue)
  }

  const handlePriceRangeChange = (checked: boolean, startPrice: number, endPrice: number) => {
    const currentParams = new URLSearchParams(param.toString())

    if (checked) {
      // If the range is checked, update both start and end price
      currentParams.set('filterStartPrice', startPrice.toString())
      currentParams.set('filterEndPrice', endPrice.toString())
    } else {
      // If unchecked, remove both start and end price from the query params
      currentParams.delete('filterStartPrice')
      currentParams.delete('filterEndPrice')
    }

    // Replace the URL without reloading the page or adding history, preventing scroll to top
    router.push(`?${currentParams.toString()}`, { scroll: false })
  }

  const isPriceRangeChecked = (startPrice: number, endPrice: number) => {
    const currentStartPrice = param.get('filterStartPrice')
    const currentEndPrice = param.get('filterEndPrice')

    return currentStartPrice === startPrice.toString() && currentEndPrice === endPrice.toString()
  }

  const countCheckedFilters = (filterKey: string) => {
    const filterValues = param.getAll(filterKey)
    return filterValues.length
  }

  return (
    <>
      <Collapse
        bordered
        ghost
        expandIconPosition="end"
        collapsible="icon"
        size="large"
        activeKey={activeKey}
        onChange={(key) => handleCollapseChange(key as string[])}
        expandIcon={({ isActive }) => expandIcon({ isActive })}
      >
        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo danh mục ({countCheckedFilters('filterCategory')})
            </p>
          }
          key="1"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div
            style={{
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <div className="flex flex-col gap-2">
              {categories?.map((cate) => (
                <Checkbox
                  key={cate._id}
                  className="my-2 filter_checkbox"
                  style={{
                    color: '#000',
                    fontSize: '1.3rem',
                  }}
                  onChange={(e) => handleFilterChange(e.target.checked, 'filterCategory', cate._id)}
                  checked={isFilterChecked('filterCategory', cate._id)}
                >
                  {cate.name}
                </Checkbox>
              ))}
            </div>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo kích thước ({countCheckedFilters('filterSize')}){' '}
            </p>
          }
          key="2"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col">
            <div className="filter_checkbox checkbox-material display-flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Checkbox
                  key={size.id}
                  value={size.value}
                  className="card-checkbox"
                  onChange={(e) => handleFilterChange(e.target.checked, 'filterSize', size.value)}
                  checked={isFilterChecked('filterSize', size.value)}
                  style={{
                    color: '#000',
                    fontSize: '1.3rem',
                  }}
                >
                  <div className="">
                    <div className="w-full">
                      <p className="text-black uppercase text-color">{size.name}</p>
                    </div>
                  </div>
                </Checkbox>
              ))}
            </div>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo màu sắc ({countCheckedFilters('filterColor')})
            </p>
          }
          key="3"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="filter_color checkbox-material gap-1">
            {colorData.map((color) => (
              <Checkbox
                key={color.value}
                value={color.value}
                onChange={(e) => handleFilterChange(e.target.checked, 'filterColor', color.value)}
                checked={isFilterChecked('filterColor', color.value)}
                className="card-checkbox"
              >
                <div className="card-content flex items-center flex-col justify-start w-full h-full">
                  <div
                    className="color-bg shadow-sm color rounded-full"
                    style={{
                      backgroundColor: `${color.color}CC`,
                      width: '1.7rem',
                      height: '1.7rem',
                    }}
                  ></div>
                  <div className="w-full text-center">
                    <p className="text-black color-name text-lg">{color.name}</p>
                  </div>
                </div>
              </Checkbox>
            ))}
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo chất liệu ({countCheckedFilters('filterMaterial')})
            </p>
          }
          key="7"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div
            style={{
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <div className="flex flex-col gap-2 ">
              {materialData.map((material) => (
                <Checkbox
                  key={material.id}
                  className="my-2 filter_checkbox"
                  style={{
                    color: '#000',
                    fontSize: '1.3rem',
                  }}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, 'filterMaterial', material.value)
                  }
                  checked={isFilterChecked('filterMaterial', material.value)}
                >
                  {material.name}
                </Checkbox>
              ))}
            </div>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo giá bán (
              {isPriceRangeChecked(0, 100000) ||
              isPriceRangeChecked(100000, 200000) ||
              isPriceRangeChecked(200000, 500000) ||
              isPriceRangeChecked(500000, 1000000) ||
              isPriceRangeChecked(1000000, Number.MAX_VALUE)
                ? 1
                : 0}
              )
            </p>
          }
          key="4"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col gap-2">
            <Checkbox
              onChange={(e) => handlePriceRangeChange(e.target.checked, 0, 100000)}
              checked={isPriceRangeChecked(0, 100000)}
              className="my-2 filter_checkbox"
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              Dưới 100k
            </Checkbox>

            <Checkbox
              onChange={(e) => handlePriceRangeChange(e.target.checked, 100000, 200000)}
              checked={isPriceRangeChecked(100000, 200000)}
              className="my-2 filter_checkbox"
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              100k - 200k
            </Checkbox>

            <Checkbox
              onChange={(e) => handlePriceRangeChange(e.target.checked, 200000, 500000)}
              checked={isPriceRangeChecked(200000, 500000)}
              className="my-2 filter_checkbox"
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              200k - 500k
            </Checkbox>

            <Checkbox
              onChange={(e) => handlePriceRangeChange(e.target.checked, 500000, 1000000)}
              checked={isPriceRangeChecked(500000, 1000000)}
              className="my-2 filter_checkbox"
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              500k - 1tr
            </Checkbox>

            <Checkbox
              onChange={(e) => handlePriceRangeChange(e.target.checked, 1000000, Number.MAX_VALUE)}
              checked={isPriceRangeChecked(1000000, Number.MAX_VALUE)}
              className="my-2 filter_checkbox"
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              Trên 1tr
            </Checkbox>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo tình trạng (
              {isFilterChecked('filterCondition', 'used') ||
              isFilterChecked('filterCondition', 'new')
                ? 1
                : 0}
              )
            </p>
          }
          key="5"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col gap-2">
            <Checkbox
              className="my-2 filter_checkbox"
              onChange={(e) => handleFilterChange(e.target.checked, 'filterCondition', 'used')}
              checked={isFilterChecked('filterCondition', 'used')}
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              Sản phẩm đã qua sử dụng
            </Checkbox>
            <Checkbox
              className="my-2 filter_checkbox"
              onChange={(e) => handleFilterChange(e.target.checked, 'filterCondition', 'new')}
              checked={isFilterChecked('filterCondition', 'new')}
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              Sản phẩm mới 100%
            </Checkbox>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <>
              <div>
                <p className="text-xl font-medium">
                  Theo thương hiệu ({countCheckedFilters('filterBrand')})
                </p>
              </div>
            </>
          }
          key="6"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col gap-2">
            {brands?.map((brand) => (
              <Checkbox
                onChange={(e) => handleFilterChange(e.target.checked, 'filterBrand', brand._id)}
                checked={isFilterChecked('filterBrand', brand._id)}
                key={brand._id}
                className="my-2 filter_checkbox"
                style={{
                  color: '#000',
                  fontSize: '1.3rem',
                }}
              >
                {brand.name}
              </Checkbox>
            ))}
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium">
              Theo loại sản phẩm (
              {isFilterChecked('filterType', 'barter') || isFilterChecked('filterType', 'sale')
                ? 1
                : 0}
              )
            </p>
          }
          key="8"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col gap-2">
            <Checkbox
              className="my-2 filter_checkbox"
              onChange={(e) => handleFilterChange(e.target.checked, 'filterType', 'barter')}
              checked={isFilterChecked('filterType', 'barter')}
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              Sản phẩm trao đổi
            </Checkbox>
            <Checkbox
              onChange={(e) => handleFilterChange(e.target.checked, 'filterType', 'sale')}
              checked={isFilterChecked('filterType', 'sale')}
              className="my-2 filter_checkbox"
              style={{
                color: '#000',
                fontSize: '1.3rem',
              }}
            >
              Sản phẩm bán
            </Checkbox>
          </div>
        </Collapse.Panel>

        <Collapse.Panel
          header={
            <p className="text-xl font-medium ">
              Theo phong cách ({countCheckedFilters('filterStyle')})
            </p>
          }
          key="9"
        >
          <div
            style={{
              maxHeight: '500px',
              overflowY: 'auto',
            }}
          >
            <Checkbox.Group className="display-flex flex-col gap-3">
              {clothingStylesData.map((style) => (
                <Checkbox
                  onChange={(e) => handleFilterChange(e.target.checked, 'filterStyle', style.value)}
                  checked={isFilterChecked('filterStyle', style.value)}
                  key={style.id}
                  className="my-2 filter_checkbox"
                  style={{
                    color: '#000',
                    fontSize: '1.3rem',
                  }}
                  value={style.value}
                >
                  {style.name}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        </Collapse.Panel>
      </Collapse>
    </>
  )
}

export default FilterSide
