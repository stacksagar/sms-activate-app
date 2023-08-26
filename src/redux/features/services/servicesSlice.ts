import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries, fetchServices } from "./requests";
import services_name from "@/data/services_name";
import { serviceLogo } from "@/data/dynamic_logos";

type Data = {
  [key: string]: {
    [key: string]: ServiceData;
  };
};

interface State {
  data: Data;

  services: {
    [key: string]: SMSService;
  };

  countries: {
    [key: string]: Country;
  };

  selectedService: SMSService;

  visibleValue: number;
  loading: boolean;
  fetched: boolean;
  countries_loading: boolean;
  countries_fetched: boolean;
  error?: string;
}

const initialState: State = {
  data: {},
  countries: {},
  services: {},
  selectedService: {} as SMSService,
  visibleValue: 20,
  loading: false,
  fetched: false,
  countries_loading: false,
  countries_fetched: false,
  error: "",
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setSelectedService(state, action) {
      state.selectedService = action.payload;
    },
    removeSelectedService(state) {
      state.selectedService = {} as SMSService;
    },
    moreVisible(state, action) {
      state.visibleValue = state.visibleValue + action.payload;
    },
    resetVisible(state) {
      state.visibleValue = 20;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchServices.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.data || {};
      state.services = Object.keys(action.payload?.data || {}).reduce(
        (acc: any, val) => {
          acc[val] = {
            shortName: val,
            name: services_name[val],
            logo: serviceLogo(val),
          };
          return acc;
        },
        {}
      );

      state.error = "";
      state.fetched = true;
    });

    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.services = {};
      state.fetched = true;
      state.error = action.error.message;
    });

    builder.addCase(fetchCountries.pending, (state) => {
      state.countries_loading = true;
    });

    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action?.payload?.data;

      state.error = "";
      state.countries_loading = false;
      state.countries_fetched = true;
    });

    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.countries = {};
      state.countries_loading = false;
      state.countries_fetched = true;
      state.error = action.error.message;
    });
  },
});

export const serviceActions = serviceSlice.actions;
export default serviceSlice;
