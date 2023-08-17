"use client";

import ClientHeader from "@/components/client/header/ClientHeader";
import React from "react";
import MuiTable, { BodyRow } from "@/components/Tables/MuiTable/MuiTable";

const tableCells: MuiTableHeader<User>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "email",
    label: "Price",
  },
];

function createData(id: ID, name: string, price: number): BodyRow {
  return { id, name, price };
}

const rows = [
  createData(1, "T-Shirt", 205),
  createData(2, "HeadPhone - LL4", 205),
  createData(3, "T-Shirt", 205),
  createData(4, "HeadPhone - LL4", 205),
  createData(5, "T-Shirt", 205),
  createData(6, "HeadPhone - LL4", 205),
  createData(7, "T-Shirt", 205),
  createData(8, "HeadPhone - LL4", 205),
  createData(9, "T-Shirt", 205),
];

export default function Test() {
  return (
    <div>
      <ClientHeader />
      <MuiTable tableCells={tableCells} rows={rows} tableTitle="Products" />
    </div>
  );
}
