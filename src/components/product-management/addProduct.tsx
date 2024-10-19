'use client'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { Button, Modal, Form, Input, Select, Radio, Image, Upload } from 'antd'
import type { GetProp, UploadFile, UploadProps } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useProductManagement } from '@/zustand/productManagement'
import { addProduct } from '@/types/users/productTypes'
import { Grid, Stepper } from '@mantine/core'
import { sizes } from '@/metadata/sizeData'
import { colorData } from '@/metadata/colorData'
import { materialData } from '@/metadata/materialData'
import { clothingStylesData } from '@/metadata/styleData'
import { useState } from 'react'
import { useClient } from '@/hooks/useClient'
import productService from '@/services/product/product.service'
import toast from 'react-hot-toast'
import { mutate } from 'swr'
import { useSearchParams } from 'next/navigation'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

export const AddProduct = () => {
  const param = useSearchParams()

  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const searchKey = param.get('searchKey') || ''
  const sortField = param.get('sortField') || ''
  const sortOrder = param.get('sortOrder') || ''

  const { categories, loading, brands } = useClient()

  const { openAddProductModal, toggleAddProductModal } = useProductManagement()
  const [form] = Form.useForm()
  const [activeStep, setActiveStep] = useState(0)
  const [typeCheck, setTypeCheck] = useState('sale')
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    form.setFieldsValue({ images: fileList })
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  const prevStep = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onFinishCreate = () => {
    form.validateFields().then(() => {
      setActiveStep(1)
    })
  }

  const onUploadImages = async () => {
    const values: addProduct = {
      ...form.getFieldsValue([
        'productName',
        'material',
        'style',
        'condition',
        'categoryId',
        'brandId',
        'description',
        'type',
      ]),
      status: 'active',
      tags: form.getFieldValue('tags').split(' '),
      price: Number(form.getFieldValue('price')?.replace(/\D/g, '')) || 0,
      sizeVariants: form
        .getFieldValue('sizeVariants')
        .map((sizeVariant: { size: string; colors: string; amount: number }) => ({
          size: sizeVariant.size,
          colors: sizeVariant.colors,
          amount: sizeVariant.amount,
        })),
    }
    delete values.images

    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj as File)
    })

    console.log('values', values)

    try {
      productService
        .addProduct(values)
        .then(async (res) => {
          toast.success('Thêm sản phẩm thành công!')
          setActiveStep(1)
          try {
            await productService.uploadImage(res._id, formData).then(() => {
              setFileList([])
              setActiveStep(0)
              form.resetFields()
              toggleAddProductModal()
              toast.success('Đăng tải hình ảnh thành công!')
              mutate(['/api/product', page, limit, searchKey, sortField, sortOrder])
            })
          } catch {
            toast.error('Đăng tải hình ảnh thất bại!')
          }
        })
        .catch(async () => {
          toast.error('Thêm sản phẩm thất bại!')
          setActiveStep(0)
          setTimeout(() => {
            form.setFields([
              {
                name: 'productName',
                errors: ['Tên sản phẩm đã tồn tại!'],
              },
            ])
          }, 500)
        })
    } catch (error) {
      console.log(error)
      toast.error('Đã có lỗi xảy ra vui lòng thử lại sau!')
    }
  }

  return (
    <>
      <Button
        size="large"
        icon={<IconPlus size={15} />}
        variant="solid"
        color="primary"
        onClick={toggleAddProductModal}
      >
        Thêm
      </Button>
      <Modal
        width="60%"
        title="Thêm sản phẩm"
        centered
        open={openAddProductModal}
        onCancel={toggleAddProductModal}
        footer={null}
      >
        <Stepper
          iconSize={30}
          active={activeStep}
          onStepClick={setActiveStep}
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Thông tin sản phẩm" description="Thông tin về sản phẩm đăng tải">
            <Form
              form={form}
              layout="horizontal"
              validateTrigger={['onBlur', 'onChange']}
              size="middle"
              onChange={() => {
                console.log('product', form.getFieldsValue())
              }}
              initialValues={{
                type: 'sale',
              }}
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
              <div className="w-full grid grid-flow-col ">
                <Form.Item
                  name="type"
                  label="Loại sản phẩm"
                  rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm!' }]}
                >
                  <Radio.Group
                    onChange={(e) => {
                      setTypeCheck(e.target.value)
                    }}
                  >
                    <Radio value="sale">Bán</Radio>
                    <Radio value="barter">Trao đổi</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="status"
                  label="Trạng thái"
                  rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                >
                  <Radio.Group>
                    <Radio value="active">Kích hoạt</Radio>
                    <Radio value="inactive">Không kích hoạt</Radio>
                    <Radio value="suspend">Tạm dừng</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              {typeCheck === 'sale' && (
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[
                    { required: true, message: 'Vui lòng nhập giá sản phẩm!' },
                    {
                      validator: (_, value = '') => {
                        const numericPrice = Number(value.replace(/\D/g, ''))
                        console.log(numericPrice)
                        if (numericPrice > 5000000) {
                          return Promise.reject(
                            new Error('Giá sản phẩm không được vượt quá 5 triệu!'),
                          )
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập giá sản phẩm"
                    type="number"
                    // onChange={(e) => {
                    //   let value = e.target.value

                    //   // Loại bỏ ký tự không phải số trước khi định dạng lại
                    //   value = value.replace(/\D/g, '')
                    //   // Chuyển giá trị về dạng số và giới hạn giá trị không vượt quá 5 triệu
                    //   let numericValue = Number(value)

                    //   // Định dạng giá trị thành tiền tệ
                    //   const formattedValue = new Intl.NumberFormat('vi-VN', {
                    //     style: 'decimal',
                    //   }).format(numericValue)

                    //   // Cập nhật giá trị đã định dạng
                    //   form.setFieldsValue({ price: formattedValue })
                    // }}
                  />
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
                    toggleAddProductModal()
                    setActiveStep(0)
                    form.resetFields()
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
            <Form form={form} onFinish={onUploadImages} layout="vertical" validateTrigger="onBlur">
              <Form.Item
                name="images"
                label="Hình ảnh"
                rules={[{ required: true, message: 'Vui lòng chọn hình ảnh!' }]}
              >
                <>
                  <Upload
                    listType="picture-card"
                    multiple
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={(file) => {
                      if (fileList.length >= 10) {
                        toast.error('Bạn chỉ có thể tải lên tối đa 10 hình ảnh!')
                        return Upload.LIST_IGNORE // Ngăn upload thêm ảnh mà không hiển thị lỗi mặc định
                      }
                      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                        toast.error('Chỉ được phép upload ảnh định dạng JPG hoặc PNG!')
                        return Upload.LIST_IGNORE
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        toast.error('Hình ảnh không được vượt quá 2MB!')
                        return Upload.LIST_IGNORE
                      }
                      return true // Cho phép upload nếu đạt điều kiện
                    }}
                    accept=".jpg,.jpeg,.png"
                    maxCount={10}
                  >
                    {fileList.length >= 10 ? null : uploadButton}
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
        </Stepper>
      </Modal>
    </>
  )
}
