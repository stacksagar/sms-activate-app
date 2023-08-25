import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./requests";

interface State {
  data: UserT[];
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteByIds(state, action: PayloadAction<ID[]>) {
      const ids = action.payload;
      state.data = state.data.filter((user) => !ids.includes(user?._id));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.users || [];
      state.error = "";
      state.fetched = true;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.fetched = true;
      state.error = action.error?.message;
    });
  },
});

export const userActions = usersSlice.actions;
export default usersSlice;
