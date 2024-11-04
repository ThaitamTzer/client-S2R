import { ProductsClient } from '@/types/users/productTypes'
import { Collapse } from 'antd'
import IconifyIcon from '../icons'

export default function InforProduct({
  product,
  getMaterialName,
  getConditionName,
  getStyleName,
}: {
  product: ProductsClient
  getMaterialName: (material: string) => string
  getConditionName: (condition: string) => string
  getStyleName: (style: string) => string
}) {
  return (
    <>
      <div className="rounded-lg p-5 w-1/2">
        <Collapse
          accordion
          expandIconPosition="right"
          bordered={false}
          ghost
          items={[
            {
              key: '1',
              label: <p className="text-lg font-semibold border-b-2">Thông tin sản phẩm</p>,
              children: (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-1/2 text-base font-semibold">Mô tả: </p>
                    <p className="text-base capitalize whitespace-pre-line">{product.description}</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-1/2 text-base font-semibold">Chất liệu: </p>
                    <p className="text-base capitalize">{getMaterialName(product.material)}</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-1/2 text-base font-semibold">Tình trạng: </p>
                    <p className="text-base capitalize">{getConditionName(product.condition)}</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-1/2 text-base font-semibold">Khối lượng: </p>
                    <p className="text-base capitalize">{product.weight}g</p>
                  </div>
                  <div className="flex flex-row gap-7 items-center ">
                    <p className="w-1/2 text-base font-semibold">Phong cách: </p>
                    <p className="text-base capitalize">{getStyleName(product.style)}</p>
                  </div>
                </div>
              ),
              showArrow: false,
              extra: <IconifyIcon icon="carbon:information" />,
              style: {
                backgroundColor: '#fff',
                padding: '0px',
              },
            },
          ]}
        />
      </div>
    </>
  )
}
