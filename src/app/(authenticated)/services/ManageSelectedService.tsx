import FIcon from "@/common/FIcon";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { serviceActions } from "@/redux/features/services/servicesSlice";
import Image from "next/image";
import { fetchCountries } from "@/redux/features/services/requests";
import { uid } from "uid";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import useString from "@/hooks/state/useString";
import dynamic_filter from "@/lib/dynamic_filter";
import CountryDetailsByService from "./CountryDetailsByService";
import ShowAndLessButton from "@/common/ShowAndLessButton";
import WarningText from "@/common/WarningText";
import ListSkeleton from "@/common/MaterialUi/Skeleton/ListSkeleton";

export default function ManageSelectedService() {
  const dispatch = useReduxDispatch();

  const [serviceCountries, setServerCountries] = useState<
    (ServiceData & Country)[]
  >([]);

  const [visible, setVisible] = useState(50);
  const search = useString("USA");

  const {
    selectedService,
    data,
    countries,
    countries_fetched,
    countries_loading,
  } = useReduxSelector((s) => s.services);

  useEffect(() => {
    if (countries_fetched) return;
    dispatch(fetchCountries(null));
  }, [dispatch, countries_fetched]);

  useEffect(() => {
    if (!selectedService?.shortName) return;
    const getServiceCountries = Object.values(
      data[selectedService?.shortName] || {}
    ).map((obj) => ({
      ...obj,
      ...(countries[obj.country] || {}),
    }));

    setServerCountries(getServiceCountries);
  }, [data, selectedService, countries]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            className="rounded"
            src={selectedService?.logo || "/"}
            width={20}
            height={20}
            alt={``}
          />
          <div
            dangerouslySetInnerHTML={{
              __html:
                selectedService?.name + `<small> (Verification) </small>` || "",
            }}
          ></div>
        </div>

        <IconButton
          color="warning"
          onClick={() => dispatch(serviceActions.removeSelectedService())}
        >
          <FIcon icon="times" />
        </IconButton>
      </div>

      {countries_loading ? (
        <ListSkeleton count={5} height={75} />
      ) : (
        <div>
          <div className="pt-4 pb-2">
            <MuiTextField
              name="search country"
              type="search"
              onChange={search.change}
              value={search.value}
              size="small"
              autoComplete="off"
              label={"Search country"}
            />
          </div>

          <div className="w-full h-[400px] max-h-full overflow-auto">
            {(search?.value?.length > 1
              ? dynamic_filter(
                  serviceCountries,
                  ["rus", "eng", "chn"],
                  search.value
                )
              : serviceCountries.filter((_, i) => i <= visible)
            ).map((data) => {
              return data?.eng ? (
                <CountryDetailsByService key={uid()} service={data} />
              ) : null;
            })}

            <WarningText shouldShow={serviceCountries?.length === 0} />

            <ShowAndLessButton
              shouldHide={search?.value || serviceCountries.length === 0}
              fullLength={serviceCountries.length}
              showLength={visible}
              onMore={() => setVisible((p) => p + 20)}
              onLess={() => setVisible(50)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
