"use client";

import useSWR from "swr";
import { columns } from "@/components/product-management/column";
import { Table } from "antd";
import { useSearchParams } from "next/navigation";
import productService from "@/services/product/product.service";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});

export const DataTable = () => {
  const { styles } = useStyle();

  const param = useSearchParams();
  const page = Number(param.get("page")) || 1;
  const limit = Number(param.get("limit")) || 10;
  const searchKey = param.get("searchKey") || "";
  const sortField = param.get("sortField") || "";
  const sortOrder = param.get("sortOrder") || "";

  const { data: products } = useSWR(
    ["/api/product", page, limit, searchKey, sortField, sortOrder],
    () => productService.getAll(page, limit, searchKey, sortField, sortOrder),
  );

  console.log(products);

  return (
    <>
      <Table
        className={styles.customTable}
        sticky
        columns={columns}
        dataSource={products?.data || []}
      />
    </>
  );
};
