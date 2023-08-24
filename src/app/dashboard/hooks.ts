import { UseBoolean } from "@/hooks/state/useBoolean";
import toast from "@/lib/toast";
import toast_async from "@/lib/toast_async";
import { activationActions } from "@/redux/features/activations/activationsSlice";
import { useReduxDispatch } from "@/redux/redux_store";
import axios from "axios";
import { toast as toastify } from "react-toastify";
import { uid } from "uid";

export function useGetActivationsCode(fetchingCode?: UseBoolean) {
  const dispatch = useReduxDispatch();

  return async () => {
    fetchingCode?.setTrue();

    function updateData(data: GetActiveActivations) {
      dispatch(activationActions.updateActivations(data.activeActivations));
    }

    function receivedAll(data: GetActiveActivations) {
      return data.activeActivations?.every((a) => a.smsCode);
    }

    function cancelStatus() {
      dispatch(activationActions.cancelActivationsStatus());
    }

    let fetch_code = setInterval(async () => {
      console.count(new Date().toLocaleTimeString());
      const response = await axios.get(`/api/sms-active/getActiveActivations`);
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

    const response = await axios.get(`/api/sms-active/getActiveActivations`);
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

export function useOrderNumber(
  serviceCode: string,
  serviceCountryCode: string | number,
  loading?: UseBoolean
) {
  const dispatch = useReduxDispatch();
  const getCode = useGetActivationsCode();

  return async () => {
    loading && loading.setTrue();

    try {
      const { data } = await toast_async(
        axios.get(
          `/api/sms-active/getNumberV2?service=${serviceCode}&country=${serviceCountryCode}&operator=tmobile`
        ),
        {
          start: "Order is processing...",
          success: "Processing completed!",
          error: "Failed, Please contact support!",
        }
      );

      if (typeof data?.data === "string") {
        toastify.dismiss();
        toast({
          message: data?.data,
          type: "warning",
        });
      } else {
        toast({
          message: "Congrats! You've ordered!",
          type: "info",
        });
      }

      if (data?.data?.activationId) {
        const {
          activationId,
          countryCode,
          activationTime,
          activationOperator,
          phoneNumber,
          canGetAnotherSms,
          cost,
        } = data?.data;

        const newActivation = {
          id: uid(),
          activationId,
          phoneNumber,
          time: activationTime,
          operator: activationOperator,
          cost,
          canGetAnotherSms,
          status: "STATUS_WAIT_CODE",
          sms_code: [],
          sms_text: [],
          countryCode,
          serviceCode,
          country_logo: `https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/${serviceCountryCode}.svg`,
          service_logo: `https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/${serviceCode}0.webp`,
        };

        dispatch(activationActions.addActivation(newActivation));
        getCode();
      }
    } finally {
      loading && loading.setFalse();
    }
  };
}
