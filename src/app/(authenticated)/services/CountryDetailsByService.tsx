import Image from "next/image";
import React from "react";
import { ListItem, ListItemButton, IconButton } from "@mui/material";
import FIcon from "@/common/FIcon";
import useBoolean from "@/hooks/state/useBoolean";
import { useReduxSelector } from "@/redux/redux_store";
import { useOrderNumber } from "./hooks";
import { useSetting } from "@/context/SettingProvider";
import MuiSelect from "@/common/MaterialUi/Forms/MuiSelect";

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
            handleOrder(
              selectedService?.shortName,
              service.country as string,
              loading
            )
          }
          className="flex items-center justify-between gap-2"
        >
          <MuiSelect
            label="Select Currency"
            options={[
              { title: "Bitcoin (BTC)", value: "BTC" },
              { title: "Ethereum (ETH)", value: "ETH" },
              { title: "Litecoin (LTC)", value: "LTC" },
              { title: "Tether (USDT)", value: "USDT" },
              { title: "Dogecoin (DOGE)", value: "DOGE" },
              { title: "Binance Coin (BNB)", value: "BNB" },
              { title: "Tron (TRX)", value: "TRX" },
              { title: "Bitcoin Cash (BCH)", value: "BCH" },
              { title: "Dash (DASH)", value: "DASH" },
              { title: "Ripple (XRP)", value: "XRP" },
              { title: "USD Coin (USDC)", value: "USDC" },
              { title: "Polkadot (DOT)", value: "DOT" },
              { title: "Solana (SOL)", value: "SOL" },
              { title: "Avalanche (AVAX)", value: "AVAX" },
              { title: "Terra (LUNA)", value: "LUNA" },
              { title: "Axie Infinity (AXS)", value: "AXS" },
              { title: "Polygon (MATIC)", value: "MATIC" },
            ]}
          />

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
