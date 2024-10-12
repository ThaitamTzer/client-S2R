import { Button, Dropdown } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { IconDots } from "@tabler/icons-react";
import type { MenuProps } from "antd";
import { Product } from "@/types/users/productTypes";


const items: MenuProps["items"] = [
  {
    label: "Sửa",
    key: "edit",
    icon: <EditFilled />,
  },
  {
    label: "Xóa",
    key: "delete",
    icon: <DeleteFilled />,
  },
];

export const RowAction = ({ data }: { data: Product }) => {
  return (
    <>
      <Dropdown menu={{ items }}>
        <Button icon={<IconDots size={20} />} variant="text" color="default" />
      </Dropdown>
    </>
  );
};
