import { Button, Group, Modal } from '@mantine/core'

export default function ModalCancel({
  openModalCancel,
  setOpenModalCancel,
  handleCancelOrder,
}: {
  openModalCancel: boolean
  setOpenModalCancel: (value: boolean) => void
  handleCancelOrder: () => void
}) {
  return (
    <Modal
      size="lg"
      centered
      title="Xác nhận hủy đơn hàng"
      opened={openModalCancel}
      onClose={() => setOpenModalCancel(false)}
    >
      <div>
        <h1>Bạn có chắc chắn muốn hủy đơn hàng này không?</h1>
        <Group justify="end" mt="md">
          <Button onClick={() => setOpenModalCancel(false)}>Đóng</Button>
          <Button color="red" onClick={handleCancelOrder}>
            Hủy đơn hàng
          </Button>
        </Group>
      </div>
    </Modal>
  )
}
