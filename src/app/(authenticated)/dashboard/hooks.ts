import { useAuth } from "@/context/AuthProvider";
import { UseBoolean } from "@/hooks/state/useBoolean";
import toast_async from "@/lib/toast_async";
import { activationActions } from "@/redux/features/activations/activationsSlice";
import { fetchActivations } from "@/redux/features/activations/requests";
import { useReduxDispatch } from "@/redux/redux_store";
import axios from "axios";

export function useRefreshActivations() {
  const { user } = useAuth();
  const dispatch = useReduxDispatch();

  return async () => {
    dispatch(fetchActivations({ id: user?._id }));
    console.count(" ::Refreshed at " + new Date().toLocaleTimeString());
  };
}

export function useOrderNumber() {
  const { user, setUser } = useAuth();
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
      setUser((p) => ({
        ...p,
        balance:
          p.balance -
          (typeof data?.activation?.total_cost === "number"
            ? data?.activation?.total_cost
            : 0),
      }));
    } finally {
      loading && loading.setFalse();
    }
  };
}
