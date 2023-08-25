"use client";
import FIcon from "@/common/FIcon";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import useCopy from "@/hooks/useCopy";
import delay from "@/lib/delay";
import { useReduxSelector } from "@/redux/redux_store";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { useGetActivationsCode } from "./hooks";
import ButtonWithCopy from "@/common/ButtonWithCopy";

const ServiceDetails = ({ row }: { row: ActivationT }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        className="dark:rounded-lg"
        src={row.service_logo}
        alt=""
        width={28}
        height={28}
      />
      <Image src={row.country_logo} alt="" width={28} height={28} />

      <ButtonWithCopy value={row?.phoneNumber} showValue />
    </div>
  );
};

const CodeAndStatus = ({ row }: { row: ActivationT }) => {
  const { copy, isCopied } = useCopy();

  return (
    <div className="flex items-center gap-1">
      {row.sms_code?.length ? (
        <ButtonWithCopy
          value={row?.sms_code[row?.sms_code?.length - 1]}
          showValue
        />
      ) : row.status === "STATUS_WAIT_CODE" ? (
        <div className="animate-spin">
          <IconButton size="small">
            <FIcon icon="refresh" />
          </IconButton>
        </div>
      ) : (
        <span> {row.status} </span>
      )}
    </div>
  );
};

const tableCells: MuiTableHeader<ActivationT>[] = [
  {
    key: "service_logo",
    label: "Service Details",
    RenderComponent({ row }) {
      return <ServiceDetails row={row} />;
    },
  },
  {
    key: "cost",
    label: "Cost",
    RenderComponent({ row }) {
      return <div>{row.cost} ₽</div>;
    },
  },

  {
    key: "status",
    label: "Status/Code",
    RenderComponent({ row }) {
      return <CodeAndStatus row={row} />;
    },
  },
];

export default function ServiceRightbar() {
  const { data } = useReduxSelector((s) => s.activations);
  const deleting = useBoolean();
  const getCode = useGetActivationsCode();
  async function onDelete(ids: ID[]) {
    deleting.setTrue();
    await delay(3000);
    console.log("IDs[] ", ids);
    deleting.setFalse();
  }

  const getCodeCalled = useBoolean();

  useEffect(() => {
    getCodeCalled.setTrue();
    if (getCodeCalled.true) return;

    getCode();
  }, [getCode, getCodeCalled]);

  return (
    <div className="col-span-8 bg-white dark:bg-gray-800">
      <MuiTable
        onDelete={onDelete}
        tableCells={tableCells}
        rows={data}
        tableTitle="Activations"
        deleting={deleting}
        hideActions
      />
    </div>
  );
}

export function RefreshCode() {
  return (
    <div>
      <Button>
        <FIcon icon="trash" />
      </Button>
    </div>
  );
}
