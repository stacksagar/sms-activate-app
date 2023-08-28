"use client";
import FIcon from "@/common/FIcon";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import { Button, IconButton } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import ButtonWithCopy from "@/common/ButtonWithCopy";
import { countryLogo, serviceLogo } from "@/data/dynamic_logos";
import showDate from "@/lib/showDate";
import services_name from "@/data/services_name";
import moment from "moment";
import { useSetting } from "@/context/SettingProvider";
import { fetchActivations } from "@/redux/features/activations/requests";
import { useAuth } from "@/context/AuthProvider";
import toast_async from "@/lib/toast_async";
import { activationActions } from "@/redux/features/activations/activationsSlice";
import axios from "axios";
import { fetchCountries } from "@/redux/features/services/requests";
import { clearInterval } from "timers";
import { useRefreshActivations } from "./hooks";
import MuiSelect from "@/common/MaterialUi/Forms/MuiSelect";
import useString from "@/hooks/state/useString";

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
  const { countries, countries_fetched } = useReduxSelector((s) => s.services);
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (countries_fetched) return;
    dispatch(fetchCountries({}));
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 pl-2">
        <Image
          className="dark:rounded-lg"
          src={countryLogo(row.countryCode)}
          alt=""
          width={20}
          height={20}
        />

        <div> {countries[row?.countryCode]?.eng} </div>
      </div>
      <ButtonWithCopy value={row?.phoneNumber} showValue />
    </div>
  );
};

const CodeAndStatus = ({ row }: { row: ActivationT }) => {
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
          <div>
            {new Date(row?.createdAt || Date.now()).toLocaleTimeString()}
          </div>
          <small>
            {moment(new Date(row?.createdAt || Date.now())).fromNow()}
          </small>
        </div>
      );
    },
  },

  {
    key: "serviceCode",
    label: "Service",
    RenderComponent: ServiceDetails,
  },
  {
    key: "countryCode",
    label: "Country/Phone",
    RenderComponent: CountryDetails,
  },

  {
    key: "total_cost",
    label: "Cost",
    RenderComponent({ row }) {
      const { setting } = useSetting();

      return (
        <div>
          {row.total_cost} {setting?.public?.currency}
        </div>
      );
    },
  },

  {
    key: "status",
    label: "Status/Code",
    RenderComponent: CodeAndStatus,
  },

  {
    key: "actions",
    shouldHideDeleteButton(row) {
      return row.status === "COMPLETED" ? true : false;
    },
  },
];

export default function ServiceRightbar() {
  const refreshActivations = useRefreshActivations();
  const { user, setUser } = useAuth();
  const dispatch = useReduxDispatch();
  const { data } = useReduxSelector((s) => s.activations);
  const deleting = useBoolean();

  const currentStatus = useString<ActivationStatus>("STATUS_WAIT_CODE");

  useEffect(() => {
    if (!user?._id) return;
    dispatch(fetchActivations({ id: user?._id }));
  }, [dispatch, user]);

  const [codeIntervals, setCodeIntervals] = React.useState<NodeJS.Timer[]>([]);

  useEffect(() => {
    if (data?.length < 1) return;

    const is_waiting = data.some((item) => item.status === "STATUS_WAIT_CODE");

    if (!is_waiting) {
      codeIntervals.forEach(
        (interval) => interval && window && window.clearInterval(interval)
      );
      console.log("active activations not running!");
      return;
    }

    setCodeIntervals((p) => [...p, setInterval(refreshActivations, 15000)]);
  }, [data]);

  useEffect(() => {
    const last_interval_index = codeIntervals?.length - 1;
    codeIntervals.forEach((interval, index) => {
      if (last_interval_index !== index) {
        interval && window && window.clearInterval(interval);
      }
    });
  }, [codeIntervals]);

  async function onMultipleDelete(ids: ID[]) {
    deleting.setTrue();
    try {
      await toast_async<any>(
        axios.delete("/api/sms-active/activations", { data: { ids } }),
        {
          start: "Deleting.. wait a moment!",
          success: `Successfully deleted ${ids?.length} items!`,
          error: "",
        }
      );

      const userRes = await axios.get<{ user: UserT }>(
        `/api/auth/_fetch?id=${user?._id}`
      );
      setUser((p) => ({ ...p, balance: userRes?.data?.user?.balance }));
      dispatch(activationActions.deleteByIds(ids));
    } finally {
      deleting.setFalse();
    }
  }

  return (
    <div className="max-w-full lg:w-[calc(100%-350px)] bg-transparent dark:bg-gray-800 h-fit">
      <MuiTable
        onRefreshData={() => dispatch(fetchActivations({ id: user._id }))}
        onDelete={onMultipleDelete}
        tableCells={tableCells}
        rows={
          currentStatus.value === "STATUS_WAIT_CODE"
            ? data.filter(
                (item) =>
                  item.status === "STATUS_WAIT_CODE" ||
                  item.status === "COMPLETED"
              )
            : data.filter((item) => item.status === currentStatus.value)
        }
        tableTitle={
          <>
            <MuiSelect
              label="Select Activations"
              value={currentStatus.value}
              onChange={currentStatus.change}
              options={[
                { title: "Active Activations", value: "STATUS_WAIT_CODE" },
                { title: "Completed Activations", value: "IN_HISTORY" },
                { title: "Canceled Activations", value: "STATUS_CANCEL" },
              ]}
            />
          </>
        }
        deleting={deleting}
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
