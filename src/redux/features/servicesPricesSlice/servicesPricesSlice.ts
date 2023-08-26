import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchServicesPrices } from "./requests";

interface State {
  data: SMSServicePrice[];
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

const servicesPricesSlice = createSlice({
  name: "servicesPrices",
  initialState,
  reducers: {
    deleteByIds(state, action: PayloadAction<ID[]>) {
      const ids = action.payload;
      state.data = state.data.filter(
        (servicePrice) => !ids.includes(servicePrice?._id)
      );
    },

    addNewToTop(state, action: PayloadAction<SMSServicePrice | undefined>) {
      action.payload && state.data.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchServicesPrices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchServicesPrices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.prices || [];
      state.error = "";
      state.fetched = true;
    });

    builder.addCase(fetchServicesPrices.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.fetched = true;
      state.error = action.error?.message;
    });
  },
});

export const servicesPriceActions = servicesPricesSlice.actions;
export default servicesPricesSlice;
