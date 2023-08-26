import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServicesPrices = createAsyncThunk(
  "servicesPrices/fetchServicesPrices",
  async (params?: any) => {
    const search_query = new URLSearchParams(params)?.toString();
    const { data } = await axios.get(`/api/sms-active/prices?${search_query}`);
    return data;
  }
);
