'use client'

import { useOrderStore } from '@/zustand/order'
import { Modal, Input, Button, Textarea, Group } from '@mantine/core'
import orderService from '@/services/order/order.service'
import { useForm } from '@mantine/form'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { mutate } from 'swr'

export default function ChangeAddressModal() {
  const { toggleChangeAddressModal, openChangeAddressModal, idOrder, address, phone } = useOrderStore()

  const form = useForm({
    initialValues: {
      phone: phone || '',
      address: address || '',
    },

    validate: {
      phone: (value) => {
        if (!value) return 'Vui lòng nhập số điện thoại'
        const phoneRegex = /^[0-9]{10}$/ // Chỉ chấp nhận 10-11 chữ số
        if (!phoneRegex.test(value)) return 'Số điện thoại không hợp lệ'
        return null
      },
      address: (value) => {
        if (!value) return 'Vui lòng nhập địa chỉ'
        if (value.trim().length < 10) return 'Địa chỉ phải có ít nhất 10 ký tự'
        if (value.length > 255) return 'Địa chỉ không quá 255 ký tự'
        return null
      },
    },
  })

  useEffect(() => {
    if (phone || address) {
      form.setValues({
        phone: phone || '',
        address: address || '',
      })
    }
  }, [phone, address])

  const handleClose = () => {
    toggleChangeAddressModal()
    form.reset()
  }

  const handleChangeAddress = async (values: { phone: string; address: string }) => {
    const validation = form.validate()
    if (validation.hasErrors) return

    try {
      await orderService.updateAddressOrder(
        idOrder,
        {
          address: values.address,
          phone: values.phone,
          type: 'momo_wallet',
        },
        () => {
          toast.success('Cập nhật địa chỉ thành công')
          mutate(['/order/id', idOrder])
        },
        () => {
          toast.error('Cập nhật địa chỉ thất bại')
        },
      )
      toggleChangeAddressModal()
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error)
    }
  }

  return (
    <>
      <Modal opened={openChangeAddressModal} onClose={handleClose} title="Đổi địa chỉ nhận hàng" centered>
        <form onSubmit={form.onSubmit(handleChangeAddress)}>
          <Input
            placeholder="Số điện thoại"
            {...form.getInputProps('phone')}
            error={form.errors.phone ? form.errors.phone : null} // Hiển thị lỗi nếu có
            style={{
              marginBottom: 10,
            }}
          />
          <Textarea
            key={form.key('address')}
            rows={4}
            placeholder="Địa chỉ"
            {...form.getInputProps('address')}
            error={form.errors.address}
          />
          <Group justify="end" mt="md">
            <Button type="submit" style={{ backgroundColor: '#16a34a', color: '#fff' }}>
              Đổi địa chỉ
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  )
}
