import { configureStore, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import servicesSlice from "./features/services/servicesSlice";
import activationsSlice from "./features/activations/activationsSlice";
import usersSlice from "./features/users/usersSlice";
import servicesPricesSlice from "./features/servicesPricesSlice/servicesPricesSlice";

const redux_store = configureStore({
  reducer: {
    services: servicesSlice.reducer,
    activations: activationsSlice.reducer,
    users: usersSlice.reducer,
    services_prices: servicesPricesSlice.reducer,
  },

  devTools: process.env.NODE_ENV === "development",
});

type ReduxState = ReturnType<typeof redux_store.getState>;
type ReduxDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const useReduxDispatch = () => useDispatch<ReduxDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default redux_store;
