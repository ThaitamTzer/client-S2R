'use client'

import { useState } from 'react'
import { Input, Form, Button, Select, Upload, Avatar } from 'antd'
import { UpdateProfile } from '@/types/users/userTypes'
import { useAuth } from '@/hooks/useAuth'
import moment from 'moment'
import userService from '@/services/users/user.service'
import toast from 'react-hot-toast'
import MyDatePicker from '@/components/DatePicker'
import { IconUpload } from '@tabler/icons-react'
import { Group } from '@mantine/core'

const Profile = () => {
  const { user, setLoading, loading, getProfile } = useAuth()
  const [form] = Form.useForm()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  if (!user) {
    return <div>Loading...</div>
  }

  const onFinish = (values: UpdateProfile) => {
    setLoading(true)
    try {
      userService
        .updateProfile(values)
        .then((res) => {
          getProfile()
          setLoading(false)
          toast.success('Cập nhật thông tin thành công!')
          if (res) {
            form.setFieldsValue({
              firstname: res.firstname,
              lastname: res.lastname,
              phone: res.phone,
              address: res.address,
              email: res.email,
              description: res.description,
              dateOfBirth: moment(res.dateOfBirth),
            })
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
          setLoading(false)
        })
        .finally(() => {
          setLoading(false)
        })
    } catch {
      setLoading(false)
    }
  }

  const handlePreview = async (file: File) => {
    const reader = new FileReader()
    setFile(file)
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
  }

  const onUpload = (file: File) => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('avatar', file)
    userService
      .updateAvatar(formData)
      .then(() => {
        getProfile()
        toast.success('Cập nhật ảnh đại diện thành công!')
        setFile(null)
      })
      .catch(() => {
        toast.error('Đã có lỗi xảy ra vui lòng thử lại!')
        setFile(null)
      })
  }

  return (
    <>
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Thông tin tài khoản</h2>
        </div>
        <div className="mt-5 md:mt-10">
          <div className="profile-avatar bg-white flex items-center gap-3 justify-start pb-6">
            <div className="avatar w-25 h-25 overflow-hidden">
              <Avatar src={preview || user?.avatar} alt="avatar" size={80} />
            </div>
          </div>
          <div className="flex flex-col w-1/3">
            <Upload
              beforeUpload={(file) => {
                handlePreview(file) // Preview the selected image
                return false // Prevent default upload behavior
              }}
              showUploadList={false}
            >
              <Button icon={<IconUpload />}>Tải hình ảnh lên</Button>
            </Upload>
            <Button
              type="primary"
              onClick={() => onUpload(file as File)}
              loading={loading}
              className="mt-3"
              disabled={!file}
              style={{
                width: 'fit-content',
              }}
            >
              Cập nhật ảnh đại diện
            </Button>
          </div>
        </div>
        <div className="profile-desc container mx-auto px-1 mt-5">
          <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
            <div className="form p-3 md:p-8">
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                initialValues={{
                  firstname: user?.firstname || '',
                  lastname: user?.lastname || '',
                  phone: user?.phone || '',
                  address: user?.address || '',
                  email: user?.email || '',
                  gender: user?.gender || 'none',
                  description: user?.description || '',
                  dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth) : undefined,
                }}
              >
                <div className="w-full flex flex-col md:flex-row md:gap-3">
                  <Form.Item
                    className="w-full"
                    label="Họ"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập họ!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Tên"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên!',
                      },
                    ]}
                  >
                    <Input placeholder="Nhập vào tên" />
                  </Form.Item>
                </div>
                <Form.Item
                  className="w-full"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
                <div className="w-full flex gap-3">
                  <Form.Item className="w-full" label="Số điện thoại" name="phone">
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item label="Ngày sinh" name="dateOfBirth" className="w-full">
                    <MyDatePicker className="w-full" placeholder="Chọn ngày sinh" />
                  </Form.Item>
                </div>
                <Form.Item label="Giới tính" name="gender" className="w-1/2">
                  <Select
                    defaultValue="none"
                    className="w-full"
                    options={[
                      {
                        value: 'none',
                        label: 'Chọn giới tính',
                        disabled: true,
                      },
                      { value: 'male', label: 'Nam' },
                      { value: 'female', label: 'Nữ' },
                      { value: 'other', label: 'Khác' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                  <Input.TextArea rows={4} placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea rows={4} placeholder="Mô tả" />
                </Form.Item>
                <Form.Item>
                  <Group justify="end">
                    <Button type="primary" htmlType="submit" loading={loading}>
                      Cập nhật
                    </Button>
                  </Group>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
