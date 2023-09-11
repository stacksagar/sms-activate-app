import CircleSpinner from "@/common/MaterialUi/CircleSpinner";
import MuiTextField from "@/common/MaterialUi/Forms/MuiTextField";
import MuiButton from "@/common/MaterialUi/MuiButton";
import { useAuth } from "@/context/AuthProvider";
import useBoolean from "@/hooks/state/useBoolean";
import useNumber from "@/hooks/state/useNumber";
import error_message from "@/lib/error_message";
import toast from "@/lib/toast";
import axios from "axios";
import React from "react";

export default function WithCryptomus() {
  const amount = useNumber("" as unknown as number);
  const loading = useBoolean();
  const { user } = useAuth();

  async function handleCryptoPayment() {
    if (amount.value < 0.1) {
      toast({ message: "min 0.1 amount needed!", type: "warning" });
      return;
    }

    const openLinkInNewTab = (url: string) => {
      window && window.open(url, "_blank");
    };

    loading.setTrue();
    try {
      const { data } = await axios.post<CryptoMusCreateInvoiceResponse>(
        "/api/cryptomus/create-invoice",
        {
          amount: amount.value.toString(),
          currency: "USD",
          additional_data: {
            payable_amount: amount.value.toString(),
            userId: user._id,
          },
          url_success: "https://yensms.com/profile/wallet",
        }
      );

      openLinkInNewTab(data.result.url);
    } catch (error) {
      console.log("ERROR: ", error);
      toast({ message: error_message(error), type: "error" });
    } finally {
      loading.setFalse();
    }
  }

  return (
    <div className="space-y-2">
      <MuiTextField
        required={false}
        onChange={amount.change}
        value={amount.value > 0 ? amount.value : ""}
        type="number"
        placeholder="Amount"
        label="Deposit Amount"
      />

      <MuiButton disabled={loading.true} onClick={handleCryptoPayment}>
        {loading.true ? (
          <div className="flex items-center">
            <small>wait a moment..</small>
            <CircleSpinner />
          </div>
        ) : (
          "Payment"
        )}
      </MuiButton>
    </div>
  );
}
