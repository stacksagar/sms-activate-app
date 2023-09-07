"use client";
import MuiSearchSelect from "@/common/MaterialUi/Forms/MuiSearchSelect";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import MuiButton from "@/common/MaterialUi/MuiButton";
import MuiTable from "@/common/MaterialUi/MuiTable/MuiTable";
import useBoolean from "@/hooks/state/useBoolean";
import useNumber from "@/hooks/state/useNumber";
import get_sms_service_price from "@/lib/sms-active/get_sms_service_price";

import {
  fetchCountries,
  fetchServices,
} from "@/redux/features/services/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import pricingTableCells from "./pricingTableCells";
import { fetchServicesPrices } from "@/redux/features/servicesPricesSlice/requests";
import toast from "@/lib/toast";
import toast_async from "@/lib/toast_async";
import axios from "axios";
import { servicesPriceActions } from "@/redux/features/servicesPricesSlice/servicesPricesSlice";
import MuiBreadcrumbs from "@/common/MaterialUi/MuiBreadcrumbs";
import { countryLogo } from "@/data/dynamic_logos";

export default function Pricing() {
  const dispatch = useReduxDispatch();
  const { services, countries, data, fetched, countries_fetched } =
    useReduxSelector((s) => s.services);

  const { data: prices, fetched: fetched_prices } = useReduxSelector(
    (s) => s.services_prices
  );

  const [searchServices, setSearchServices] = useState<SMSService[]>([]);
  const [searchCountries, setSearchCountries] = useState<Country[]>([]);
  const [selectedService, setSelectedService] = useState({} as SMSService);
  const [selectedCountry, setSelectedCountry] = useState({} as Country);

  const user_cost = useNumber(0);
  const api_cost = useNumber(0);
  const api_cost_loading = useBoolean();

  useEffect(() => {
    if (selectedService?.shortName && selectedCountry?.eng) {
      get_sms_service_price(
        selectedService?.shortName,
        selectedCountry.id.toString()
      ).then((data) => {
        api_cost.setCustom((data?.cost as number) || 0);
      });
    } else {
      return;
    }
  }, [selectedCountry, selectedService, api_cost]);

  useEffect(() => {
    if (fetched_prices) return;
    dispatch(fetchServicesPrices({ }));
  }, [dispatch, fetched_prices]);

  useEffect(() => {
    if (fetched) return;
    dispatch(fetchServices({}));
  }, [dispatch, fetched]);

  useEffect(() => {
    if (countries_fetched) return;
    dispatch(fetchCountries({}));
  }, [dispatch, countries_fetched]);

  useEffect(() => {
    const arrayServices = Object.values(services).filter((item) => item.name);
    setSearchServices(arrayServices);
    const arrayCountries = Object.values(countries).map((c) => ({
      ...c,
      logo: countryLogo(c?.id),
      eng: c?.eng || `ID: ${c?.id}`,
    }));
    setSearchCountries(arrayCountries);
  }, [services, countries, data]);

  async function handleAddPrice() {
    const newPrice = {
      service: selectedService.shortName,
      country: selectedCountry?.id?.toString(),
      api_cost: api_cost.value,
      user_cost: user_cost.value,
    };

    if (!Object.values(newPrice).every((v) => v)) {
      toast({
        message: "Please check all!",
        type: "warning",
      });
      return;
    }

    const { data } = await toast_async<{ price: SMSServicePrice }>(
      axios.post("/api/sms-active/prices", newPrice),
      {
        success: "Added service price!",
      }
    );
    dispatch(servicesPriceActions.addNewToTop(data?.price));
  }

  const deleting = useBoolean();
  async function onMultipleDelete(ids: ID[]) {
    deleting.setTrue();
    try {
      await toast_async<any>(
        axios.delete("/api/sms-active/prices", { data: { ids } }),
        {
          start: "Deleting.. wait a moment!",
          success: `Successfully deleted ${ids?.length} items!`,
          error: "",
        }
      );
      dispatch(servicesPriceActions.deleteByIds(ids));
    } finally {
      deleting.setFalse();
    }
  }

  return (
    <div>
      <MuiBreadcrumbs
        links={[
          {
            title: "Dashboard",
            icon: "home",
            href: "/admin",
          },

          {
            title: "Services Price",
            icon: "money-bill",
            href: "/admin/pricing",
          },
        ]}
      />

      <br />
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
            <MuiTextField
              label="Set Custom Price"
              type="number"
              onChange={user_cost.change}
            />
          </div>
          <MuiButton onClick={handleAddPrice}>Add Price</MuiButton>
        </div>
      </div>
      <br />
      <MuiTable
        onRefreshData={() => dispatch(fetchServicesPrices(null))}
        onDelete={onMultipleDelete}
        tableCells={pricingTableCells}
        rows={prices || []}
        loading={!fetched_prices}
        tableTitle="Services Price"
        deleting={deleting}
      />
    </div>
  );
}
