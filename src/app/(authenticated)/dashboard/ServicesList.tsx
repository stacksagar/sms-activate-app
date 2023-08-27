"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import Image from "next/image";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import { fetchServices } from "@/redux/features/services/requests";
import ListSkeleton from "@/common/MaterialUi/Skeleton/ListSkeleton";
import useString from "@/hooks/state/useString";
import dynamic_filter from "@/lib/dynamic_filter";
import { uid } from "uid";
import { serviceActions } from "@/redux/features/services/servicesSlice";
import ManageSelectedService from "./ManageSelectedService";
import ShowAndLessButton from "@/common/ShowAndLessButton";
import { useSetting } from "@/context/SettingProvider";
import { useOrderNumber } from "./hooks";
import useBoolean from "@/hooks/state/useBoolean";
import FIcon from "@/common/FIcon";
import { fetchServicesPrices } from "@/redux/features/servicesPricesSlice/requests";
import get_sms_service_price from "@/lib/sms-active/get_sms_service_price";
import axios from "axios";

export default function ServicesList() {
  const { setting } = useSetting();
  const { services, loading, fetched, selectedService, visibleValue } =
    useReduxSelector((state) => state.services);
  const dispatch = useReduxDispatch();

  const { data: prices, fetched: fetched_prices } = useReduxSelector(
    (s) => s.services_prices
  );
  const [api_prices, set_api_prices] = useState<any>({});

  function get_price(serviceCode?: string) {
    return prices.find((p) => p.service === serviceCode);
  }

  function get_api_price(serviceCode: string): any {
    return api_prices[serviceCode]?.cost || 0;
  }

  const search = useString("");

  const ordering = useBoolean();
  const handleOrder = useOrderNumber();

  function handleSetService(service: SMSService) {
    if (setting?.public?.selected_country) {
      handleOrder(
        service?.shortName,
        setting?.public?.selected_country,
        ordering
      );
    } else {
      dispatch(serviceActions.setSelectedService(service));
      search.setCustom("");
    }
  }

  useEffect(() => {
    if (fetched_prices) return;
    dispatch(fetchServicesPrices(null));
  }, [dispatch, fetched_prices]);

  useEffect(() => {
    if (fetched) return;
    dispatch(fetchServices(null));
  }, [dispatch, fetched]);

  useEffect(() => {
    if (!selectedService?.name || search?.value?.length < 2) return;

    if (search.value.length > 1) {
      dispatch(serviceActions.removeSelectedService());
    }
  }, [search, dispatch, selectedService]);

  const [favorites, setFavorites] = React.useState<SMSService[]>([]);

  useEffect(() => {
    let favorite = JSON.parse(
      localStorage.getItem("favorite_services") || "[]"
    ) as SMSService[];
    setFavorites(favorite);

    axios
      .get(`/api/sms-active/action/getPrices?country=187`)
      .then(({ data }) => {
        console.log("data ", data?.data);
        set_api_prices(data?.data["187"] || {});
      });
  }, []);

  function addFavoriteHandle(service: SMSService) {
    let favorite = JSON.parse(
      localStorage.getItem("favorite_services") || "[]"
    ) as SMSService[];

    const exist = favorite.some((f) => f?.shortName === service?.shortName);
    if (exist) {
      favorite = favorite.filter((f) => f?.shortName !== service?.shortName);
    } else {
      favorite.push({
        ...service,
        favorite: true,
      });
    }
    localStorage.setItem("favorite_services", JSON.stringify(favorite));
    setFavorites(favorite);
  }

  return (
    <>
      <MuiTextField
        type="search"
        onChange={search.change}
        value={search.value}
        label={
          selectedService?.name
            ? "Select another service..."
            : "Search service..."
        }
      />

      {selectedService?.name ? (
        <ManageSelectedService />
      ) : (
        <Box>
          <div className="w-full h-[400px] max-h-full overflow-auto">
            {loading || !fetched ? (
              <ListSkeleton count={7} height={50} />
            ) : (
              <>
                {(search?.value?.length > 1
                  ? dynamic_filter(
                      [...favorites, ...Object.values(services || {})],
                      ["name"],
                      search.value
                    )
                  : [...favorites, ...Object.values(services)].filter(
                      (_, i) => i <= visibleValue
                    )
                )?.map((service: SMSService) =>
                  service?.name ? (
                    <ListItem
                      key={uid()}
                      component="div"
                      className={`w-full flex items-start justify-between`}
                    >
                      <ListItemButton
                        disabled={ordering.true}
                        onClick={() => handleSetService(service)}
                        className="block w-full"
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Image
                            className="rounded"
                            src={service.logo}
                            width={20}
                            height={20}
                            alt={``}
                          />
                          <div
                            dangerouslySetInnerHTML={{
                              __html: service?.name || "",
                            }}
                          ></div>

                          <small className="text-orange-600 font-medium">
                            {setting?.public?.currency}
                            {get_price(service?.shortName)?.user_cost ||
                              get_api_price(service.shortName)}
                          </small>
                        </div>
                      </ListItemButton>
                      <IconButton
                        onClick={() => addFavoriteHandle(service)}
                        size="small"
                        className="ml-auto"
                      >
                        {service?.favorite ? (
                          <FIcon icon="star" className="text-red-600" />
                        ) : (
                          <FIcon icon="star" className="opacity-50" />
                        )}
                      </IconButton>
                    </ListItem>
                  ) : null
                )}

                {/* Services Show/Less More Button */}
                <ShowAndLessButton
                  shouldHide={search?.value}
                  fullLength={Object.keys(services).length}
                  showLength={visibleValue}
                  onMore={() => dispatch(serviceActions.moreVisible(20))}
                  onLess={() => dispatch(serviceActions.resetVisible())}
                />
              </>
            )}
          </div>
        </Box>
      )}
    </>
  );
}
