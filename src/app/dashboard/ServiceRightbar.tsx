"use client";
import FIcon from "@/common/FIcon";
import MuiTable from "@/components/Tables/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import useNumber from "@/hooks/state/useNumber";
import useCopy from "@/hooks/useCopy";
import delay from "@/lib/delay";
import { activationActions } from "@/redux/features/activations/activationsSlice";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import { useGetActivationsCode } from "./hooks";

const ServiceDetails = ({ row }: { row: Activation }) => {
  const { copy, isCopied } = useCopy();
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

      <Button
        title="Copy Number"
        className="flex items-center gap-1"
        onClick={() => copy(row?.phoneNumber)}
      >
        <span>{row?.phoneNumber}</span>
        <span>
          {isCopied ? <FIcon icon="check" /> : <FIcon icon="clipboard" />}
        </span>
      </Button>
    </div>
  );
};

const CodeAndStatus = ({ row }: { row: Activation }) => {
  const { copy, isCopied } = useCopy();

  return (
    <div className="flex items-center gap-1">
      {row.sms_code?.length ? (
        <Button
          title="Copy Code"
          className="flex items-center gap-1"
          onClick={() => copy(row?.sms_code[row?.sms_code?.length - 1])}
        >
          <span>{row.sms_code[row.sms_code?.length - 1]}</span>
          <span>
            {isCopied ? <FIcon icon="check" /> : <FIcon icon="clipboard" />}
          </span>
        </Button>
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

const tableCells: MuiTableHeader<Activation>[] = [
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
        onDeleteMultiple={onDelete}
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
