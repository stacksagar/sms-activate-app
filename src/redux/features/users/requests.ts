import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_params?: any) => {
    const { data } = await axios.get(`/api/users`);
    return data;
  }
);
