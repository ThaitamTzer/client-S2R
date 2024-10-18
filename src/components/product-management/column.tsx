'use client'

import { Button, type TableProps } from 'antd'
import Image from 'next/image'
import { Product } from '@/types/users/productTypes'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useProductManagement } from '@/zustand/productManagement'

export const columns: TableProps<Product>['columns'] = [
  {
    title: 'Sản phẩm',
    dataIndex: 'imgUrls',
    key: 'image',
    render: (_, record: Product) => (
      <>
        {record?.imgUrls.length > 0 ? (
          <Image
            src={record?.imgUrls.length > 0 ? record?.imgUrls[0] : '/images/no-image.png'}
            alt={record?.productName}
            width={50}
            height={50}
            objectFit="cover"
          />
        ) : (
          'Chưa có ảnh'
        )}
      </>
    ),
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'productName',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (_, record: Product) => <>{record?.status === 'active' ? 'Đang bán' : 'Ngừng bán'}</>,
  },
  {
    dataIndex: 'action',
    key: 'action',
    render: (_, record: Product) => (
      <>
        <Button
          onClick={() => (
            useProductManagement.getState().toggleEditProductModal(),
            useProductManagement.getState().setProduct(record)
          )}
          icon={<IconEdit size={20} />}
          variant="text"
          color="default"
        />
        <Button
          onClick={() => console.log('Delete product: ', record)}
          icon={<IconTrash size={20} />}
          variant="text"
          color="default"
        />
      </>
    ),
  },
]
