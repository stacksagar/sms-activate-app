import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_params?: any) => {
    const response = await fetch(
      `/api/sms-active/action/getTopCountriesByService`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchCountries = createAsyncThunk(
  "services/fetchCountries",
  async (_params?: any) => {
    const response = await fetch(`/api/sms-active/action/getCountries`);
    const data = await response.json();
    return data;
  }
);
