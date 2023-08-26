import { useAuth } from "@/context/AuthProvider";
import { UseBoolean } from "@/hooks/state/useBoolean";
import toast from "@/lib/toast";
import toast_async from "@/lib/toast_async";
import { activationActions } from "@/redux/features/activations/activationsSlice";
import { useReduxDispatch } from "@/redux/redux_store";
import axios from "axios";
import { toast as toastify } from "react-toastify";

export function useGetActivationsCode(fetchingCode?: UseBoolean) {
  const dispatch = useReduxDispatch();

  return async () => {
    fetchingCode?.setTrue();

    function updateData(data: GetActiveActivations) {
      dispatch(activationActions.updateActivations(data?.activeActivations));
    }

    function receivedAll(data: GetActiveActivations) {
      return data?.activeActivations?.every((a) => a.smsCode);
    }

    function cancelStatus() {
      dispatch(activationActions.cancelActivationsStatus());
    }

    let fetch_code = setInterval(async () => {
      console.count(new Date().toLocaleTimeString());
      const response = await axios.get(
        `/api/sms-active/action/getActiveActivations`
      );
      const data: GetActiveActivations = response?.data?.data;
      if (data?.error || data?.status === "error") {
        clearInterval(fetch_code);
        if (receivedAll(data)) {
          updateData(data);
        } else {
          cancelStatus();
        }
      } else updateData(data);
    }, 30000);

    const response = await axios.get(
      `/api/sms-active/action/getActiveActivations`
    );
    const data: GetActiveActivations = response?.data?.data;

    if (data?.error || data?.status === "error") {
      clearInterval(fetch_code);
      if (receivedAll(data)) {
        updateData(data);
      } else {
        cancelStatus();
      }
    } else updateData(data);
  };
}

export function useOrderNumber() {
  const { user } = useAuth();
  const dispatch = useReduxDispatch();

  return async (
    serviceCode: string,
    countryCode: string | number,
    loading?: UseBoolean
  ) => {
    loading && loading.setTrue();

    try {
      const { data } = await toast_async<ActivationPromise>(
        axios.post("/api/sms-active/activations", {
          user: user?._id,
          serviceCode,
          countryCode,
        }),
        {
          start: "Creating your order...",
        }
      );

      data?.activation &&
        dispatch(activationActions.addActivation(data?.activation));
    } finally {
      loading && loading.setFalse();
    }
  };
}
