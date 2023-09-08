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
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import ruble_to_usd from "@/lib/ruble_to_usd";

export default function ServicesList() {
  const { setting } = useSetting();

  const { user, setUser } = useAuth();

  const { services, loading, fetched, selectedService, visibleValue } =
    useReduxSelector((state) => state.services);
  const dispatch = useReduxDispatch();

  const { data: prices, fetched: fetched_prices } = useReduxSelector(
    (s) => s.services_prices
  );
  const [api_prices, set_api_prices] = useState<any>({});

  const search = useString("");
  const ordering = useBoolean();
  const handleOrder = useOrderNumber();

  const [allServices, setAllServices] = useState<
    (SMSService & { default_price?: number })[]
  >([]);

  function handleSetService(service: SMSService) {
    if (setting?.public?.selected_country) {
      handleOrder(
        service?.shortName,
        setting?.public?.selected_country as string,
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

  useEffect(() => {
    axios
      .get(`/api/sms-active/action/getPrices?country=187`)
      .then(({ data }) => {
        set_api_prices(data?.data["187"] || {});
      });
  }, []);

  useEffect(() => {
    const initialData = [
      ...(user?.favorite_services || []),
      ...Object.values(services || {}),
    ].map((item) => {
      return {
        ...item,
        default_price:
          prices.find((p) => p.service === item.shortName)?.user_cost ||
          ruble_to_usd(
            api_prices[item.shortName]?.cost as number,
            Number(setting?.public?.["1_usd_to_ruble"])
          ),
      };
    });

    setAllServices(initialData);
  }, [user, services, prices, api_prices]);

  async function addFavoriteHandle(service: SMSService) {
    let favorites = user?.favorite_services || ([] as SMSService[]);

    const exist = favorites.some((f) => f?.shortName === service?.shortName);

    if (exist) {
      favorites = favorites.filter((f) => f?.shortName !== service?.shortName);
    } else {
      favorites.push({
        ...service,
        favorite: true,
      });
    }
    setUser((p) => ({
      ...p,
      favorite_services: favorites,
    }));

    await axios.put(`/api/auth/update?id=${user?._id}`, {
      favorite_services: favorites,
    });
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
          <div>
            <div className="w-full h-[400px] max-h-full overflow-auto">
              {loading || !fetched ? (
                <ListSkeleton count={7} height={50} />
              ) : (
                <>
                  {(search?.value?.length > 1
                    ? dynamic_filter(allServices, ["name"], search.value)
                    : allServices.filter((_, i) => i <= visibleValue)
                  )?.map((service: SMSService & { default_price?: number }) =>
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
                              src={service.logo || "/"}
                              width={20}
                              height={20}
                              alt={``}
                            />

                            <span className="text-sm font-normal">
                              {service?.name}
                            </span>

                            <small className="text-orange-600 dark:text-orange-400 font-medium">
                              {setting?.public?.currency}
                              {service?.default_price}
                            </small>
                          </div>
                        </ListItemButton>
                        <IconButton
                          onClick={() => addFavoriteHandle(service)}
                          size="small"
                          className="ml-auto"
                        >
                          {service?.favorite ? (
                            <FIcon icon="star" className="text-red-500" />
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
          </div>
        </Box>
      )}
    </>
  );
}
