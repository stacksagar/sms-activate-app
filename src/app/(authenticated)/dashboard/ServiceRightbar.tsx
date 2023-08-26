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
import { countryLogo, serviceLogo } from "@/data/dynamic_logos";
import showDate from "@/lib/showDate";
import services_name from "@/data/services_name";
import moment from "moment";

const ServiceDetails = ({ row }: { row: ActivationT }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        className="dark:rounded-lg"
        src={serviceLogo(row.serviceCode)}
        alt=""
        width={28}
        height={28}
      />

      <span> {services_name[row?.serviceCode]} </span>
    </div>
  );
};

const CountryDetails = ({ row }: { row: ActivationT }) => {
  const { countries } = useReduxSelector((s) => s.services);
  return (
    <div className="flex items-center gap-2">
      <Image
        className="dark:rounded-lg"
        src={countryLogo(row.countryCode)}
        alt=""
        width={28}
        height={28}
      />
      <span> {countries[row?.countryCode]?.eng} </span>
    </div>
  );
};

const PhoneNumber = ({ row }: { row: ActivationT }) => {
  return (
    <div className="flex items-center gap-2">
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
    key: "createdAt",
    label: "Date/Time",
    RenderComponent({ row }) {
      return (
        <div>
          <div>{showDate(row?.createdAt || new Date().toString(), true)}</div>
          <div>{moment(new Date(row?.createdAt || Date.now())).fromNow()}</div>
        </div>
      );
    },
  },

  {
    key: "serviceCode",
    label: "Service Details",
    RenderComponent: ServiceDetails,
  },
  {
    key: "countryCode",
    label: "Country",
    RenderComponent: CountryDetails,
  },

  {
    key: "phoneNumber",
    label: "Phone Number",
    RenderComponent: PhoneNumber,
  },

  {
    key: "total_cost",
    label: "Cost",
    RenderComponent({ row }) {
      return <div>{row.total_cost} ₽</div>;
    },
  },

  {
    key: "status",
    label: "Status/Code",
    RenderComponent: CodeAndStatus,
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
