"use client";
import { IconPlus } from "@tabler/icons-react";
import { Button, Modal, Form, Input } from "antd";
import { useProductManagement } from "@/zustand/productManagement";
import { Product } from "@/types/users/productTypes";

export const AddProduct = () => {
  const { openAddProductModal, toggleAddProductModal } = useProductManagement();
  const [form] = Form.useForm();

  const onFinish = (values: Product) => {
    console.log(values);
  };

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
        width={800}
        title="Thêm sản phẩm"
        centered
        open={openAddProductModal}
        onCancel={toggleAddProductModal}
      >
        <Form form={form} onFinish={onFinish} layout="vertical" size="middle">
          <Form.Item
            name="productName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name=""></Form.Item>
        </Form>
      </Modal>
    </>
  );
};
