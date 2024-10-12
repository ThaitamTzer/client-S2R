import React from "react";
import { DataTable } from "@/components/product-management/dataTable";
import { AddProduct } from "@/components/product-management/addProduct";

const ProductManagementPage = () => {
  return (
    <div>
      <div className="title text-black text-2xl font-semibold">
        <h2>Quản lý sản phẩm</h2>
      </div>
      <div className="flex justify-end">
        <AddProduct />
      </div>
      <div className="mt-5 bg-white p-2 shadow-lg rounded-md">
        <DataTable />
      </div>
    </div>
  );
};

export default ProductManagementPage;
