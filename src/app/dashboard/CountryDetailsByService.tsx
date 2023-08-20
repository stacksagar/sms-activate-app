import Image from "next/image";
import React from "react";
import { ListItem, ListItemButton, IconButton } from "@mui/material";
import FIcon from "@/common/FIcon";
import useBoolean from "@/hooks/state/useBoolean";
import { useReduxSelector } from "@/redux/redux_store";
import { useOrderNumber } from "./hooks";
import { useSession } from "next-auth/react";
import toast from "@/lib/toast";

export default function CountryDetailsByService({
  service,
}: {
  service: ServiceData & Country;
}) {
  const { data: session } = useSession();
  const loading = useBoolean();
  const { selectedService } = useReduxSelector((s) => s.services);

  const handleOrderNumber = useOrderNumber(
    selectedService?.shortName,
    service.country,
    loading
  );

  function handleOrderNumberBtn() {
    if (session?.user?.email === "bangladeshisoftware@gmail.com") {
      handleOrderNumber();
    } else {
      toast({ message: "Insufficient Balance!", type: "warn" });
    }
  }

  return (
    <div>
      <ListItem>
        <ListItemButton
          disabled={loading.true}
          onClick={handleOrderNumberBtn}
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
              <small className="font-semibold">
                {service?.price}.
                <FIcon icon="ruble" />
              </small>
            </div>

            <IconButton color="warning">
              <FIcon icon="shopping-cart" />
            </IconButton>
          </div>
        </ListItemButton>
      </ListItem>
    </div>
  );
}
