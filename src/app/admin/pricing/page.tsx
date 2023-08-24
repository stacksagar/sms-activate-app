"use client";
import MuiSearchSelect from "@/common/MaterialUi/Forms/MuiSearchSelect";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import MuiButton from "@/common/MaterialUi/MuiButton";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import useNumber from "@/hooks/state/useNumber";
import get_sms_service_price from "@/lib/sms-active/get_sms_service_price";
import toast_async from "@/lib/toast_async";
import {
  fetchCountries,
  fetchServices,
} from "@/redux/features/services/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import pricingTableCells from "./pricingTableCells";

export default function Pricing() {
  const dispatch = useReduxDispatch();
  const { services, countries, data, fetched, countries_fetched } =
    useReduxSelector((s) => s.services);
  const [searchServices, setSearchServices] = useState<SMSService[]>([]);
  const [searchCountries, setSearchCountries] = useState<Country[]>([]);
  const [selectedService, setSelectedService] = useState({} as SMSService);
  const [selectedCountry, setSelectedCountry] = useState({} as Country);

  const api_cost = useNumber(0);
  const api_cost_loading = useBoolean();

  const deleting = useBoolean();

  function onMultipleDelete() {}

  useEffect(() => {
    if (selectedService?.shortName && selectedCountry?.eng) {
      get_sms_service_price(
        selectedService?.shortName,
        selectedCountry.id as string
      ).then((data) => {
        api_cost.setCustom((data?.cost as number) || 0);
      });
    } else {
      return;
    }
  }, [selectedCountry, selectedService, api_cost]);

  useEffect(() => {
    if (fetched) return;
    dispatch(fetchServices(null));
  }, [dispatch, fetched]);

  useEffect(() => {
    if (countries_fetched) return;
    dispatch(fetchCountries(null));
  }, [dispatch, countries_fetched]);

  useEffect(() => {
    const arrayServices = Object.values(services).filter((item) => item.name);
    setSearchServices(arrayServices);
    const arrayCountries = Object.values(countries).map((c) => ({
      ...c,
      logo: `https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/${c?.id}.svg`,
      eng: c?.eng || `ID: ${c?.id}`,
    }));
    setSearchCountries(arrayCountries);
  }, [services, countries, data]);

  return (
    <div>
      <div className="bg-white p-5 dark:bg-gray-800 rounded max-w-full overflow-hidden">
        <div className="grid sm:grid-cols-2 gap-4 place-items-center">
          <MuiSearchSelect
            label={"Select Service"}
            defaultValue={selectedService}
            options={searchServices}
            titleKey="name"
            onChange={setSelectedService}
            imageKey="logo"
          />
          <MuiSearchSelect
            label={"Select Country"}
            defaultValue={selectedCountry}
            options={searchCountries}
            titleKey="eng"
            onChange={setSelectedCountry}
            imageKey="logo"
          />
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <div className="w-fit p-2 relative mr-auto">
              {api_cost_loading?.true ? (
                <div className="absolute w-full h-full inset-0 m-auto bg-white dark:bg-gray-900">
                  <Skeleton width="100%" height="100%" />
                </div>
              ) : null}

              <span>API COST:</span>
              <b> ₽. {api_cost.value} </b>
            </div>
            <MuiTextField label="Price" type="number" />
          </div>
          <MuiButton>Add Price</MuiButton>
        </div>
      </div>
      <br />
      <MuiTable
        onDeleteMultiple={onMultipleDelete}
        tableCells={pricingTableCells}
        rows={[]}
        loading={false}
        tableTitle="Services Price"
        deleting={deleting}
      />
    </div>
  );
}
