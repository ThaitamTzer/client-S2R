'use client'

import useSWR from 'swr'
import { columns } from '@/components/product-management/column'
import { Table, Input } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import productService from '@/services/product/product.service'
import { createStyles } from 'antd-style'

declare module 'antd-style' {
  interface FullToken {
    antCls: string
  }
}

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  }
})

export const DataTable = () => {
  const { styles } = useStyle()

  const param = useSearchParams()
  const router = useRouter()
  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSortTableChange = (pagination: any, filters: any, sorter: any) => {
    const { field, order } = sorter
    const newSortOrder = order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : ''
    router.push(
      `/product-management?page=${page}&limit=${limit}&searchKey=${searchKey}&sortField=${field || ''}&sortOrder=${newSortOrder}`,
    )
  }

  const { data: products, isLoading } = useSWR(
    ['/api/product', page, limit, searchKey, sortField, sortOrder],
    () => productService.getAllProductUser(page, limit, searchKey, sortField, sortOrder),
    { keepPreviousData: true },
  )

  console.log(products)

  return (
    <>
      <Table
        title={() => (
          <>
            <div className="flex justify-between">
              <h2 className="w-1/2 text-xl font-semibold">Danh sách sản phẩm</h2>
              <Input
                placeholder="Tìm kiếm sản phẩm"
                onChange={(e) => {
                  router.push(`/product-management?searchKey=${e.target.value}`)
                }}
              />
            </div>
          </>
        )}
        className={styles.customTable}
        sticky
        loading={isLoading}
        columns={columns}
        dataSource={products?.data || []}
        scroll={{ y: 100 * 5 }}
        onChange={handleSortTableChange}
        pagination={{
          current: page,
          pageSize: limit,
          total: products?.total,
          showSizeChanger: true,
          showTotal: (total) => `Tổng có ${total} sản phẩm`,
          onChange: (page, limit) => {
            router.push(`/product-management?page=${page}&limit=${limit}`)
          },
        }}
      />
    </>
  )
}
