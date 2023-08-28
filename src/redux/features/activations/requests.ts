import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchActivations = createAsyncThunk(
  "activations/fetchActivations",
  async (params?: any) => {
    const search_query = new URLSearchParams(params)?.toString();
    const { data } = await axios.get<{ activations: ActivationT[] }>(
      `/api/sms-active/activations?${search_query}`
    );

    return data;
  }
);
