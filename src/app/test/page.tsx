"use client";

import ClientHeader from "@/components/client/header/ClientHeader";
import React from "react";
import MuiTable from "@/components/Tables/MuiTable/MuiTable";
import delay from "@/lib/delay";
import useBoolean from "@/hooks/state/useBoolean";

const tableCells: MuiTableHeader<Product>[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
    WrapperComponent({ children }) {
      return <div className="bg-black text-white"> {children} </div>;
    },
  },
  {
    key: "sizes",
    label: "Sizes",
    RenderComponent({ row }) {
      return (
        <div>
          {Object.entries(row.sizes || {}).map(([key, val]) => (
            <div key={key}>
              {key}: {val}
            </div>
          ))}
        </div>
      );
    },
  },
];

const rows = [
  { id: 3, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 5, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 8, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 13, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 15, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 22, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 36, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 44, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 46, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 55, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
  { id: 68, name: "T-Shirt", sizes: { white: 5, red: 2, blue: 1 } },
];

export default function Test() {
  const deleting = useBoolean();

  async function onDelete(id: ID[]) {
    deleting.setTrue();
    await delay(4000);
    console.log("ID[] ", id);
    deleting.setFalse();
  }

  return (
    <div>
      <ClientHeader />

      <MuiTable
        onDeleteMultiple={onDelete}
        tableCells={tableCells}
        rows={rows}
        tableTitle="Products"
        
        deleting={deleting}
      />
    </div>
  );
}
