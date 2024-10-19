/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useClient } from '@/hooks/useClient'
import { Form, GetProp, UploadFile, UploadProps, Modal, Tabs } from 'antd'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProductManagement } from '@/zustand/productManagement'
import toast from 'react-hot-toast'
import productService from '@/services/product/product.service'
import { mutate } from 'swr'
import { Product } from '@/types/users/productTypes'
import { UploadFileStatus } from 'antd/es/upload/interface'
import { TabInformation } from './tabs/tabInformation'
import { TabUploadImages } from './tabs/tabImages'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const EditProduct = () => {
  const { openEditProductModal, toggleEditProductModal, product, setProduct } =
    useProductManagement()
  const param = useSearchParams()

  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  const { categories, loading, brands } = useClient()

  const [form] = Form.useForm()

  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [typeCheck, setTypeCheck] = useState('sale')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [productId, setProductId] = useState('')

  useEffect(() => {
    if (product) {
      setProductId(product._id)
      setTypeCheck(product.type)
      form.setFieldsValue({
        productName: product.productName,
        status: product.status,
        material: product.material,
        style: product.style,
        condition: product.condition,
        categoryId: product.categoryId,
        brandId: product.brandId,
        description: product.description,
        type: product.type,
        price: product.price,
        tags: product.tags?.join(' '),
        sizeVariants: product.sizeVariants?.map((sizeVariant) => ({
          size: sizeVariant.size,
          colors: sizeVariant.colors,
          amount: sizeVariant.amount,
        })),
      })

      // Cập nhật fileList từ product.imgUrls
      const formattedFileList = product.imgUrls?.map((url, index) => ({
        uid: index.toString(),
        name: `image-${index}.jpg`,
        status: 'done' as UploadFileStatus,
        url: url, // URL của ảnh
      }))

      setFileList(formattedFileList)

      form.setFieldsValue({ images: formattedFileList })
    }
  }, [product, form]) // The form is reset whenever the product or form changes

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const onFinishCreate = () => {
    form.validateFields().then(async () => {
      const formValues = form.getFieldsValue([
        'productName',
        'material',
        'condition',
        'categoryId',
        'brandId',
        'description',
        'type',
        'status',
        'price',
        'style',
      ])
      const values: Product = {
        ...formValues,
        tags: form.getFieldValue('tags').split(' '),
        sizeVariants: form
          .getFieldValue('sizeVariants')
          .map((sizeVariant: { size: string; colors: string; amount: number }) => ({
            size: sizeVariant.size,
            colors: sizeVariant.colors,
            amount: sizeVariant.amount,
          })),
      }

      // Conditionally add the price field if type is 'sale'
      if (formValues.type === 'sale') {
        values.price = Number(formValues.price)
      }

      await productService
        .editProduct(productId, values)
        .then(() => {
          toast.success('Cập nhật sản phẩm thành công!')
          toggleEditProductModal()
          mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
        })
        .catch((err) => {
          console.error(err)
          form.setFields([{ name: 'productName', errors: ['Tên sản phẩm đã bị trùng lập!'] }])
          toast.error('Cập nhật sản phẩm thất bại!')
        })
    })
  }

  const onUploadImages = async () => {
    const formData = new FormData()
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj as File)
      }
    })

    form.validateFields().then(async () => {
      try {
        await productService
          .uploadImage(productId, formData)
          .then(() => {
            toast.success('Tải ảnh lên thành công!')
            toggleEditProductModal()
            form.resetFields()
            setProduct({} as Product)
          })
          .catch((err) => {
            console.error(err)
            toast.error('Tải ảnh lên thất bại!')
          })
      } catch (err) {
        console.error(err)
        toast.error('Tải ảnh lên thất bại!')
      }
    })
  }

  return (
    <>
      <Modal
        width="60%"
        title="Cập nhật sản phẩm"
        centered
        open={openEditProductModal}
        onCancel={() => {
          toggleEditProductModal()
          form.resetFields()
          setProduct({} as Product)
        }}
        footer={null}
      >
        <Tabs
          items={[
            {
              key: '1',
              label: 'Thông tin sản phẩm',
              children: (
                <TabInformation
                  form={form}
                  product={product}
                  setProduct={setProduct}
                  setTypeCheck={setTypeCheck}
                  typeCheck={typeCheck}
                  toggleEditProductModal={toggleEditProductModal}
                  onFinishCreate={onFinishCreate}
                  loading={loading}
                  categories={categories}
                  brands={brands}
                />
              ),
            },
            {
              key: '2',
              label: 'Hình ảnh sản phẩm',
              children: (
                <TabUploadImages
                  form={form}
                  onUploadImages={onUploadImages}
                  fileList={fileList}
                  productId={productId}
                  product={product}
                  setFileList={setFileList}
                  setPreviewOpen={setPreviewOpen}
                  setPreviewImage={setPreviewImage}
                  previewOpen={previewOpen}
                  previewImage={previewImage}
                  handlePreview={handlePreview}
                />
              ),
            },
          ]}
        />
        {/* <Stepper
          iconSize={30}
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Thông tin sản phẩm" description="Thông tin về sản phẩm cần cập nhật">
            <Form
              form={form}
              layout="horizontal"
              validateTrigger={['onBlur', 'onChange']}
              size="large"
              initialValues={
                product && {
                  productName: product.productName,
                  material: product.material,
                  style: product.style,
                  condition: product.condition,
                  categoryId: product.categoryId,
                  brandId: product.brandId,
                  description: product.description,
                  type: product.type,
                  price: product.price,
                  tags: product.tags?.join(' '),
                  sizeVariants: product.sizeVariants?.map((sizeVariant) => ({
                    size: sizeVariant.size,
                    colors: sizeVariant.colors,
                    amount: sizeVariant.amount,
                  })),
                }
              }
            >
              <Form.Item
                name="productName"
                label="Tên sản phẩm"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
              >
                <Input />
              </Form.Item>
              <div
                style={{
                  maxHeight: '30vh',
                  overflowY: 'auto',
                }}
              >
                <Form.List
                  name="sizeVariants"
                  rules={[
                    {
                      validator: async (_, sizeVariants) => {
                        if (!sizeVariants || sizeVariants.length < 1) {
                          return Promise.reject(new Error('Vui lòng thêm ít nhất 1 size!'))
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add({}, 0)} // Thêm trường mới ở đầu danh sách
                          block
                          icon={<IconPlus />}
                        >
                          Thêm size
                        </Button>
                      </Form.Item>
                      {fields.map((field, index) => (
                        <>
                          <div className="grid gap-2 grid-cols-5 items-center" key={field.key}>
                            <Form.Item
                              {...field}
                              name={[field.name, 'size']}
                              fieldKey={['size']}
                              label={
                                index === 0 ? 'Size' : '' // Ẩn label của size đầu tiên
                              }
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập size!',
                                },
                              ]}
                            >
                              <Select
                                placeholder="Chọn size"
                                options={sizes.map((size) => ({
                                  label: size.name,
                                  value: size.value,
                                }))}
                              />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              name={[field.name, 'colors']}
                              fieldKey={['colors']}
                              label={index === 0 ? 'Màu sắc' : ''}
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng chọn màu sắc!',
                                },
                              ]}
                            >
                              <Select
                                placeholder="Chọn màu sắc"
                                options={colorData.map((color) => ({
                                  label: color.name,
                                  value: color.value,
                                }))}
                              />
                            </Form.Item>

                            <Form.Item
                              {...field}
                              name={[field.name, 'amount']}
                              fieldKey={['amount']}
                              label={index === 0 ? 'Số lượng' : ''}
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập số lượng!',
                                },
                              ]}
                            >
                              <Input type="number" />
                            </Form.Item>
                            {fields.length > 1 && (
                              <Button
                                className={`justify-self-start justify-items-start ${index !== 0 ? 'mb-5' : ''}`}
                                type="link"
                                onClick={() => remove(field.name)}
                                icon={<IconTrash />}
                              >
                                Xóa
                              </Button>
                            )}
                          </div>
                        </>
                      ))}

                      <Form.ErrorList className="text-red" errors={errors} />
                    </>
                  )}
                </Form.List>
              </div>
              <div className="w-full grid grid-cols-3 gap-3">
                <Form.Item
                  name="material"
                  label="Chất liệu"
                  rules={[{ required: true, message: 'Vui lòng chọn chất liệu!' }]}
                >
                  <Select
                    placeholder="Chọn chất liệu"
                    options={materialData.map((material) => ({
                      label: material.name,
                      value: material.value,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name="style"
                  label="Phong cách"
                  rules={[{ required: true, message: 'Vui lòng chọn phong cách!' }]}
                >
                  <Select
                    placeholder="Chọn phong cách"
                    options={clothingStylesData.map((style) => ({
                      label: style.name,
                      value: style.value,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name="condition"
                  label="Tình trạng"
                  rules={[{ required: true, message: 'Vui lòng chọn tình trạng!' }]}
                >
                  <Select
                    placeholder="Chọn tình trạng"
                    options={[
                      { label: 'Mới', value: 'new' },
                      { label: 'Cũ', value: 'used' },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className="w-full grid grid-cols-2 gap-3">
                <Form.Item
                  name="categoryId"
                  label="Danh mục"
                  rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                >
                  <Select
                    placeholder="Chọn danh mục"
                    loading={loading}
                    options={categories?.map((category) => ({
                      label: category.name,
                      value: category._id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  name="brandId"
                  label="Thương hiệu"
                  rules={[{ required: true, message: 'Vui lòng chọn thương hiệu!' }]}
                >
                  <Select
                    placeholder="Chọn thương hiệu"
                    loading={loading}
                    options={brands?.map((brand) => ({
                      label: brand.name,
                      value: brand._id,
                    }))}
                  />
                </Form.Item>
              </div>
              <Form.Item
                name="type"
                label="Loại sản phẩm"
                rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    setTypeCheck(e.target.value)
                  }}
                  defaultValue={typeCheck}
                >
                  <Radio value="sale">Bán</Radio>
                  <Radio value="barter">Trao đổi</Radio>
                </Radio.Group>
              </Form.Item>
              {typeCheck === 'sale' && (
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[
                    { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                    {
                      validator: (_, value) => {
                        if (!value) return Promise.reject(new Error('Vui lòng nhập giá!'))
                        if (value > 5000000) {
                          return Promise.reject(
                            new Error('Giá sản phẩm không được vượt quá 5 triệu!'),
                          )
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Input placeholder="Nhập giá sản phẩm" type="number" />
                </Form.Item>
              )}
              <Form.Item
                name="tags"
                label="Tags"
                rules={[{ required: true, message: 'Vui lòng nhập tags!' }]}
              >
                <Input.TextArea
                  placeholder="Nhập tags"
                  onChange={(e) => {
                    const value = e.target.value

                    // Tách chuỗi thành các tag dựa trên dấu cách
                    const tags = value.split(' ')

                    // Đảm bảo mỗi tag có dấu #
                    const formattedTags = tags.map((tag) =>
                      tag.startsWith('#') || tag.trim() === '' ? tag : `#${tag}`,
                    )

                    // Gộp lại các tag thành chuỗi
                    const formattedValue = formattedTags.join(' ')

                    // Cập nhật lại giá trị trường
                    form.setFieldsValue({ tags: formattedValue })
                  }}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả sản phẩm!' }]}
              >
                <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>
              <Grid justify="end" mt={15}>
                <Button
                  onClick={() => {
                    toggleEditProductModal()
                    setActiveStep(0)
                    form.resetFields()
                    setProduct({} as Product)
                  }}
                  className="mr-2"
                >
                  Hủy
                </Button>

                <Button type="primary" onClick={onFinishCreate}>
                  Tiếp tục
                </Button>
              </Grid>
            </Form>
          </Stepper.Step>

          <Stepper.Step label="Đăng tải hình ảnh" description="Đăng tải hình ảnh sản phẩm">
            <Form
              form={form}
              onFinish={onUploadImages}
              size="large"
              layout="vertical"
              initialValues={{ images: fileList }}
            >
              <Form.Item
                name="images"
                label="Hình ảnh"
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
              >
                <>
                  <Upload
                    // Use customRequest to manually control the upload process
                    customRequest={async ({ file }) => {
                      try {
                        const formData = new FormData()
                        formData.append('images', file as File)
                        await productService.uploadImage(productId, formData)
                        toast.success('Tải ảnh lên thành công!')
                      } catch (err) {
                        console.error(err)
                        toast.error('Tải ảnh lên thất bại!')
                      }
                    }}
                    onRemove={async (file) => {
                      try {
                        const imageUrl =
                          product.imgUrls[fileList.findIndex((item) => item.uid === file.uid)]
                        await productService.deleteImage(productId, [imageUrl])
                        toast.success('Xóa hình ảnh thành công!')
                      } catch (err) {
                        console.error(err)
                        toast.error('Xóa hình ảnh thất bại!')
                      }
                      // Update the fileList and form after removing the image
                      const newFileList = fileList.filter((item) => item.uid !== file.uid)
                      setFileList(newFileList)
                      form.setFieldsValue({ images: newFileList })
                    }}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={(info) => {
                      const newFileList = info.fileList
                      setFileList(newFileList)
                      form.setFieldsValue({ images: newFileList })
                    }}
                    beforeUpload={(file) => {
                      if (fileList.length >= 10) {
                        toast.error('Bạn chỉ có thể tải lên tối đa 10 hình ảnh!')
                        return Upload.LIST_IGNORE
                      }
                      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                        toast.error('Chỉ được phép upload ảnh định dạng JPG hoặc PNG!')
                        return Upload.LIST_IGNORE
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('Hình ảnh không được vượt quá 2MB!')
                        return Upload.LIST_IGNORE
                      }
                      return true
                    }}
                    accept=".jpg,.jpeg,.png"
                    maxCount={10}
                  >
                    {fileList?.length >= 10 ? null : uploadButton}
                  </Upload>

                  {previewImage && (
                    <Image
                      alt="preview"
                      wrapperStyle={{ display: 'none' }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
                </>
              </Form.Item>

              <Grid justify="end" mt={15}>
                <Button className="mr-1" onClick={prevStep}>
                  Quay lại
                </Button>
                <Button type="primary" htmlType="submit">
                  Hoàn tất
                </Button>
              </Grid>
            </Form>
          </Stepper.Step>
        </Stepper> */}
      </Modal>
    </>
  )
}
