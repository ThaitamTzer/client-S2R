'use client'

import { Button, Popover, type TableProps } from 'antd'
import Image from 'next/image'
import { Product } from '@/types/users/productTypes'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useProductManagement } from '@/zustand/productManagement'

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('vi-VN')
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'decimal' }).format(price)
}

export const columns: TableProps<Product>['columns'] = [
  {
    title: 'Sản phẩm',
    dataIndex: 'imgUrls',
    key: 'image',
    render: (_, record: Product) => (
      <>
        {record?.imgUrls.length > 0 ? (
          <Image
            src={record?.imgUrls[0] || '/images/no-image.png'}
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
    title: 'Giá/Loại',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    render: (_, record: Product) => <>{record.price > 0 ? formatPrice(record.price) + ' VNĐ' : 'Trao đổi'}</>,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (_, record: Product) => (
      <>
        {record.status === 'active' && 'Hoạt động'}
        {record.status === 'inactive' && 'Không hoạt động'}
        {record.status === 'suspend' && 'Tạm ngưng'}
      </>
    ),
  },
  {
    title: 'Phê duyệt',
    dataIndex: 'approved',
    key: 'approved',
    render: (_, record: Product) => (
      console.log(record.approved),
      <>
        {record.approved.approveStatus === 'approved' && (
          <div className="flex items-center">
            <span className="text-green-900">Đã duyệt</span>
            <Popover
              title="Thông tin phê duyệt"
              placement="bottom"
              content={
                <>
                  <p>
                    <span className="font-semibold">Ngày duyệt:</span>{' '}
                    {formatDate(record.approved.date)}
                  </p>
                  <p>
                    <span className="font-semibold">Người duyệt:</span>{' '}
                    {record.approved.decisionBy}
                  </p>
                  <p>
                    <span className="font-semibold">Mô tả:</span> {record.approved.description}
                  </p>
                </>
              }
            >
              <Button size="small" type="text" shape="circle" icon={<InfoCircleOutlined />} />
            </Popover>
          </div>
        )}
        {record.approved.approveStatus === 'pending' && (
          <div className="flex items-center">
            <span className="text-yellow-500">Chờ duyệt</span>
          </div>
        )}
        {record.approved.approveStatus === 'rejected' && (
          <div className="flex items-center">
            <span className="text-red-900">Từ chối</span>
            <Popover
              title="Thông tin phê duyệt"
              placement="bottom"
              content={
                <>
                  <p>
                    <span className="font-semibold">Ngày duyệt:</span>{' '}
                    {formatDate(record.approved.date)}
                  </p>
                  <p>
                    <span className="font-semibold">Người duyệt:</span>{' '}
                    {record.approved.decisionBy}
                  </p>
                  <p>
                    <span className="font-semibold">Mô tả:</span> {record.approved.description}
                  </p>
                </>
              }
            >
              <Button size="small" type="text" shape="circle" icon={<InfoCircleOutlined />} />
            </Popover>
          </div>
        )}
      </>
    ),
  },

  {
    dataIndex: 'action',
    key: 'action',
    render: (_, record: Product) => (
      <div className="flex space-x-2">
        <Button
          onClick={() => {
            useProductManagement.getState().toggleEditProductModal()
            useProductManagement.getState().setProduct(record)
          }}
          icon={<IconEdit size={20} />}
          variant="text"
          color="default"
        />
        <Button
          onClick={() => {
            useProductManagement.getState().toggleDeleteProductModal()
            useProductManagement.getState().setProduct(record)
          }}
          icon={<IconTrash size={20} />}
          variant="text"
          color="default"
        />
      </div>
    ),
  },
]
