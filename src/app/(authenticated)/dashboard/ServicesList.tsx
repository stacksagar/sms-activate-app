"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
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

export default function ServicesList() {
  const { setting } = useSetting();
  const { services, loading, fetched, selectedService, visibleValue } =
    useReduxSelector((state) => state.services);
  const dispatch = useReduxDispatch();

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
    if (fetched) return;
    dispatch(fetchServices(null));
  }, [dispatch, fetched]);

  useEffect(() => {
    if (!selectedService?.name || search?.value?.length < 2) return;

    if (search.value.length > 1) {
      dispatch(serviceActions.removeSelectedService());
    }
  }, [search, dispatch, selectedService]);

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
                      Object.values(services || {}),
                      ["name"],
                      search.value
                    )
                  : Object.values(services).filter((_, i) => i <= visibleValue)
                )?.map((service: SMSService) =>
                  service?.name ? (
                    <ListItem
                      key={uid()}
                      component="div"
                      className={`w-full flex flex-col items-start justify-start`}
                    >
                      <ListItemButton
                        disabled={ordering.true}
                        onClick={() => handleSetService(service)}
                        className="block w-full"
                      >
                        <div className="flex items-center gap-2">
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
                        </div>
                      </ListItemButton>
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
