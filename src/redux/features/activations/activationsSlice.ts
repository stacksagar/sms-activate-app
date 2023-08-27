import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchActivations } from "./requests";

interface State {
  data: ActivationT[];
  loading: boolean;
  fetched: boolean;
  error?: string;
}

const initialState: State = {
  data: [],
  loading: false,
  fetched: false,
  error: "",
};

const activationSlice = createSlice({
  name: "activations",
  initialState,
  reducers: {
    // :: delete activations by single/multiple IDs
    deleteByIds(state, action: PayloadAction<ID[]>) {
      const ids = action.payload;
      state.data = state.data.filter((user) => !ids.includes(user?._id));
    },

    updateActivation(state, action) {
      if (!action.payload?.id) return;
      let index = -1;
      for (let i = 0; i < state.data.length; i++) {
        if (state.data[i]._id === action.payload?.id) {
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

    addActivation(state, action: PayloadAction<ActivationT>) {
      state.data.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchActivations.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchActivations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.activations || [];
      state.error = "";
      state.fetched = true;
    });

    builder.addCase(fetchActivations.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.fetched = true;
      state.error = action.error?.message;
    });
  },
});

export const activationActions = activationSlice.actions;
export default activationSlice;
