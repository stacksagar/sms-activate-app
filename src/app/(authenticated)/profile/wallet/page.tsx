"use client";

import FIcon from "@/common/FIcon";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import { useAuth } from "@/context/AuthProvider";
import { useSetting } from "@/context/SettingProvider";
import useBoolean from "@/hooks/state/useBoolean";
import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import walletTableCells from "./walletTableCells";
import axios from "axios";
import toast from "@/lib/toast";

export default function Wallet() {
  const { setting } = useSetting();
  const { user } = useAuth();

  const [deposits, setDeposits] = useState([] as DepositT[]);

  useEffect(() => {
    if (!user._id) return;
    axios
      .get<{ deposits: DepositT[] }>(`/api/deposits?userId=${user._id}`)
      .then(({ data }) => {
        setDeposits(data?.deposits || []);
      });
  }, [user]);

  const deleting = useBoolean();
  function onMultipleDelete() {
    deleting.setTrue();
    setTimeout(() => {
      toast({ message: "Deposit can't be delete!", type: "warning" });
      deleting.setFalse();
    }, 500);
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl space-x-2">
          <span>Available Balance:</span>
          <span className="font-bold text-yellow-600">
            {setting?.public?.currency}
            {user?.balance?.toFixed(2)}
          </span>
        </h2>
        <div className="w-fit">
          <a href="/profile/add-balance">
            <Button variant="contained" startIcon={<FIcon icon="plus" />}>
              Add Balance
            </Button>
          </a>
        </div>
      </div>
      <br />
      <MuiTable
        onRefreshData={() => {}}
        onDelete={onMultipleDelete}
        tableCells={walletTableCells}
        rows={deposits}
        loading={false}
        tableTitle="Your Deposits History"
        deleting={deleting}
      />
    </div>
  );
}
