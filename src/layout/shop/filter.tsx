'use client'

import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'

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

export const FilterSide = () => {
  return (
    <>
      <Collapse
        bordered
        ghost
        expandIconPosition="end"
        collapsible="icon"
        size="large"
        expandIcon={({ isActive }) => expandIcon({ isActive })}
      >
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo danh mục</p>}
          key="1"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Dưới 100k</span>
              <span>100k - 200k</span>
            </div>
            <div className="flex justify-between">
              <span>200k - 300k</span>
              <span>300k - 500k</span>
            </div>
            <div className="flex justify-between">
              <span>500k - 1tr</span>
              <span>Trên 1tr</span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo kích thước</p>}
          key="2"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Đỏ</span>
              <span>Cam</span>
            </div>
            <div className="flex justify-between">
              <span>Vàng</span>
              <span>Xanh</span>
            </div>
            <div className="flex justify-between">
              <span>Lam</span>
              <span>Tím</span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo màu sắc</p>}
          key="3"
          style={{
            borderBottom: '1px solid #000',
          }}
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Đỏ</span>
              <span>Cam</span>
            </div>
            <div className="flex justify-between">
              <span>Vàng</span>
              <span>Xanh</span>
            </div>
            <div className="flex justify-between">
              <span>Lam</span>
              <span>Tím</span>
            </div>
          </div>
        </Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo giá bán</p>}
          key="4"
          style={{
            borderBottom: '1px solid #000',
          }}
        ></Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo tình trạng</p>}
          key="5"
          style={{
            borderBottom: '1px solid #000',
          }}
        ></Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo thương hiệu</p>}
          key="6"
          style={{
            borderBottom: '1px solid #000',
          }}
        ></Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo danh mục</p>}
          key="7"
          style={{
            borderBottom: '1px solid #000',
          }}
        ></Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium">Theo loại sản phẩm</p>}
          key="8"
          style={{
            borderBottom: '1px solid #000',
          }}
        ></Collapse.Panel>
        <Collapse.Panel
          header={<p className="text-xl font-medium ">Theo phong cách</p>}
          key="9"
        ></Collapse.Panel>
      </Collapse>
    </>
  )
}
