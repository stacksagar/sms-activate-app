import CountdownTimer from "@/app/(authenticated)/services/CountdownTimer";
import ButtonWithCopy from "@/common/ButtonWithCopy";
import { useSetting } from "@/context/SettingProvider";
import { countryLogo, serviceLogo } from "@/data/dynamic_logos";
import services_name from "@/data/services_name";
import showDate from "@/lib/showDate";
import { fetchCountries } from "@/redux/features/services/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import Image from "next/image";
import { useEffect } from "react";

const ServiceDetails = ({ row }: { row: ActivationT }) => {
  return (
    <div className="flex items-center gap-2">
      <Image
        className="dark:rounded-lg"
        src={serviceLogo(row.serviceCode) || "/"}
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
  }, [dispatch, countries_fetched]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 pl-2">
        <Image
          className="dark:rounded-lg"
          src={countryLogo(row.countryCode) || "/"}
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
        <CountdownTimer createdAt={new Date(row.createdAt)} />
      ) : (
        <span> {row.status} </span>
      )}
    </div>
  );
};

const activationTableCells: MuiTableHeader<ActivationT>[] = [
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

export default activationTableCells;
