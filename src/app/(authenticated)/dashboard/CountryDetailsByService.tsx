import Image from "next/image";
import React from "react";
import { ListItem, ListItemButton, IconButton } from "@mui/material";
import FIcon from "@/common/FIcon";
import useBoolean from "@/hooks/state/useBoolean";
import { useReduxSelector } from "@/redux/redux_store";
import { useOrderNumber } from "./hooks";
import { useSetting } from "@/context/SettingProvider";

export default function CountryDetailsByService({
  service,
}: {
  service: ServiceData & Country;
}) {
  const { setting } = useSetting();
  const loading = useBoolean();
  const { selectedService } = useReduxSelector((s) => s.services);

  const handleOrder = useOrderNumber();

  return (
    <div>
      <ListItem>
        <ListItemButton
          disabled={loading.true}
          onClick={() =>
            handleOrder(selectedService?.shortName, service.country, loading)
          }
          className="flex items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <Image
              src={`https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/${service?.country}.svg`}
              width={40}
              height={20}
              className="h-8 w-auto"
              alt={""}
            />
            <div className="flex flex-col items-start gap-0 leading-5">
              <span className="font-medium"> {service?.eng} </span>
              <small>{service?.count || 0} pcs </small>
            </div>
          </div>

          <div className="w-fit ml-auto flex items-center gap-2">
            <div className="flex flex-col leading-4">
              <small>Price</small>
              <div>
                <small className="font-semibold">{service?.price}.</small>
                <small>{setting?.public?.currency}</small>
              </div>
            </div>

            <div className="text-yellow-600">
              <FIcon icon="shopping-cart" />
            </div>
          </div>
        </ListItemButton>
      </ListItem>
    </div>
  );
}
