"use client";

import CircleSpinner from "@/common/MaterialUi/CircleSpinner";
import useString from "@/hooks/state/useString";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
} from "@mui/material";
import Image from "next/image";
import payment_options from "./payment_options";
import WithCryptomus from "./WithCryptomus";
import WithManual from "./WithManual";

type PaymentOptions = keyof typeof payment_options;

export default function AddBalance() {
  const selectedOption = useString<PaymentOptions>("" as PaymentOptions);

  function PaymentOption() {
    switch (selectedOption.value) {
      case "Cryptomus":
        return <WithCryptomus />;

      default:
        return <></>;
    }
  }

  return (
    <div>
      <Typography variant="h6"> Choose Payment Option </Typography>
      <Divider />

      <List>
        {Object.entries(payment_options).map(([key, option]) => (
          <ListItem key={key} disablePadding>
            <ListItemButton
              onClick={() => selectedOption.setCustom(key as PaymentOptions)}
            >
              <ListItemIcon>
                {option?.logo ? (
                  <Image
                    className="9"
                    width={40}
                    height={40}
                    src={option.logo || "/"}
                    alt=""
                  />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <br />
      <PaymentOption />
    </div>
  );
}
