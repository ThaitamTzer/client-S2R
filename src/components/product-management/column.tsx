"use client";

import { Button, type TableProps } from "antd";
import Image from "next/image";
import { Product } from "@/types/users/productTypes";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

type CellProps = {
  row: Product;
};

export const columns: TableProps<Product>["columns"] = [
  {
    title: "Sản phẩm",
    dataIndex: "imgUrls",
    key: "image",
    render: ({ row }: CellProps) => (
      <>
        {row?.imgUrls?.length ? (
          <Image
            src={row?.imgUrls[0] || ""}
            alt={row?.productName}
            width={50}
            height={50}
            objectFit="cover"
          />
        ) : (
          "Chưa có ảnh"
        )}
      </>
    ),
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "productName",
    key: "name",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: ({ row }: CellProps) => (
      <>{row?.status === "active" ? "Đang bán" : "Ngừng bán"}</>
    ),
  },
  {
    title: "Bị khóa",
    dataIndex: "isBlock",
    key: "isBlock",
    render: ({ row }: CellProps) => (
      <p>{row?.isBlock ? "Bị khóa" : "Hoạt động"}</p>
    ),
  },
  {
    dataIndex: "action",
    key: "action",
    render: (_, record: Product) => (
      <>
        <Button
          onClick={() => console.log("Edit product: ", record)}
          icon={<EditFilled />}
          variant="text"
          color="default"
        />
        <Button
          onClick={() => console.log("Delete product: ", record)}
          icon={<DeleteFilled />}
          variant="text"
          color="default"
        />
      </>
    ),
  },
];
