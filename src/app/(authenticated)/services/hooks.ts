import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { UseBoolean } from "@/hooks/state/useBoolean";
import get_sms_service_price from "@/lib/sms-active/get_sms_service_price";
import toast from "@/lib/toast";
import toast_async from "@/lib/toast_async";
import { activationActions } from "@/redux/features/activations/activationsSlice";
import { fetchActivations } from "@/redux/features/activations/requests";
import { fetchServicesPrices } from "@/redux/features/servicesPricesSlice/requests";
import { useReduxDispatch, useReduxSelector } from "@/redux/redux_store";
import axios from "axios";
import { useSetting } from "@/context/SettingProvider";
import ruble_to_usd from "@/lib/ruble_to_usd";

export function useRefreshActivations() {
  const { user } = useAuth();
  const dispatch = useReduxDispatch();

  return async () => {
    dispatch(fetchActivations({ id: user?._id }));
    console.count(" ::Refreshed at " + new Date().toLocaleTimeString());
  };
}

export function useOrderNumber() {
  const { setting } = useSetting();

  const { data: servicePrices, fetched: fetched_prices } = useReduxSelector(
    (s) => s.services_prices
  );
  const { user, setUser } = useAuth();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    if (fetched_prices) return;
    dispatch(fetchServicesPrices({}));
  }, [dispatch, fetched_prices]);

  return async (
    serviceCode: string,
    countryCode: string,
    loading?: UseBoolean
  ) => {
    loading && loading.setTrue();

    try {
      // :: check this service custom price is added or not
      const serviceCustomPrice = servicePrices.find(
        (p) => p.service === serviceCode
      );

      if (serviceCustomPrice) {
        if (user.balance < serviceCustomPrice.user_cost) {
          return toast({
            message: "Insufficient balance, Please deposit!",
            type: "warning",
          });
        }
      } else {
        // :: check service API price
        const serviceApiPrice = await get_sms_service_price(
          serviceCode,
          countryCode
        );

        const api_cost = serviceApiPrice?.cost as number;
        if (!api_cost || api_cost <= 0)
          return toast({
            message: "Unavailable, try later!",
            type: "warning",
          });

        const converted_usd_cost = ruble_to_usd(
          api_cost,
          Number(setting?.public?.["1_usd_to_ruble"]) || 98
        );

        if (user.balance < converted_usd_cost) {
          toast({ message: "Insufficient balance!!", type: "warning" });
          return;
        }
      }

      const { data } = await toast_async<ActivationPromise>(
        axios.post("/api/sms-active/activations", {
          user: user?._id,
          serviceCode,
          countryCode,
          usd_to_ruble_price: Number(setting?.public?.["1_usd_to_ruble"]),
        }),

        {
          start: "Creating your order...",
          error: "No numbers available!",
        }
      );

      data?.activation &&
        dispatch(activationActions.addActivation(data?.activation));

      setUser((p) => ({
        ...p,
        balance: data?.newBalance || 0,
      }));
    } finally {
      loading && loading.setFalse();
    }
  };
}
