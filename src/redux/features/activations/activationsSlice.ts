import { createSlice } from "@reduxjs/toolkit";

interface State {
  data: Activation[];
  loading: boolean;
  fetched: boolean;
  error?: string;
}

const initialState: State = {
  data: [
    {
      id: 1,
      activationId: "1678177405",
      phoneNumber: "18652331277",
      country_logo:
        "https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/187.svg",
      service_logo:
        "https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/lf0.webp",
      time: "13 min",
      cost: 20,
      status: "STATUS_WAIT_CODE",
      sms_code: ["453453"],
      sms_text: [],
    },

    {
      id: 2,
      activationId: "1678259901",
      phoneNumber: "14257255007",
      time: "2023-08-20 12:40:40",
      operator: "any",
      cost: 30,
      canGetAnotherSms: false,
      status: "STATUS_WAIT_CODE",
      sms_code: [],
      sms_text: [],
      country_logo:
        "https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/country/187.svg",
      service_logo:
        "https://smsactivate.s3.eu-central-1.amazonaws.com/assets/ico/fb0.webp",
    },
  ],
  loading: false,
  fetched: false,
  error: "",
};

const activationSlice = createSlice({
  name: "activations",
  initialState,
  reducers: {
    updateActivation(state, action) {
      if (!action.payload?.id) return;
      let index = -1;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i].id === action.payload?.id) {
          index = i;
          break;
        }
      }

      if (index < 0) return;
      state.data[index] = {
        ...state.data[index],
        ...action.payload.data,
      };
    },

    updateActivations(state, action) {
      const activations: ActiveActivation[] = action.payload;
      if (!activations) return;

      for (let i = 0; i < state.data?.length; i++) {
        for (let j = 0; j < activations?.length; j++) {
          const service = state.data[i];
          const activeService = activations[j];

          if (service.activationId === activeService.activationId) {
            state.data[i].sms_code = activeService?.smsCode;
            state.data[i].status =
              activeService?.smsCode?.length > 0
                ? "COMPLETED"
                : "STATUS_WAIT_CODE";
          } else {
            if (state.data[i].status === "STATUS_WAIT_CODE")
              state.data[i].status = "STATUS_CANCEL";
          }
        }
      }
    },

    cancelActivationsStatus(state) {
      for (let i = 0; i < state.data?.length; i++) {
        if (state.data[i].status === "STATUS_WAIT_CODE") {
          state.data[i].status = "STATUS_CANCEL";
        }
      }
    },

    addActivation(state, action) {
      state.data.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {},
});

export const activationActions = activationSlice.actions;
export default activationSlice;
