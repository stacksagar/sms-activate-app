"use client";

import FIcon from "@/common/FIcon";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import { useAuth } from "@/context/AuthProvider";
import { useSetting } from "@/context/SettingProvider";
import useBoolean from "@/hooks/state/useBoolean";
import { Button, Typography } from "@mui/material";
import React from "react";
import walletTableCells from "./walletTableCells";
import Link from "next/link";

export default function Wallet() {
  const { setting } = useSetting();
  const { user } = useAuth();

  const deleting = useBoolean();
  function onMultipleDelete() {}

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl space-x-2">
          <span>Available Balance:</span>
          <span className="font-bold text-yellow-600">
            {setting?.public?.currency}
            {user?.balance}
          </span>
        </h2>
        <div className="w-fit">
          <Link href="/profile/add-balance">
            <Button variant="contained" startIcon={<FIcon icon="plus" />}>
              Add Balance
            </Button>
          </Link>
        </div>
      </div>
      <br />
      <MuiTable
        onRefreshData={() => {}}
        onDelete={onMultipleDelete}
        tableCells={walletTableCells}
        rows={[]}
        loading={false}
        tableTitle="Deposits History"
        deleting={deleting}
      />
    </div>
  );
}
