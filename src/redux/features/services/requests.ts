import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_params?: any) => {
    const response = await fetch(`/api/sms-active/getTopCountriesByService`);
    const data = await response.json();
    return data;
  }
);

export const fetchCountries = createAsyncThunk(
  "services/fetchCountries",
  async (_params?: any) => {
    const response = await fetch(`/api/sms-active/getCountries`);
    const data = await response.json();
    return data;
  }
);
