import { configureStore, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import serviceSlice from "./features/services/servicesSlice";
import activationSlice from "./features/activations/activationsSlice";

const redux_store = configureStore({
  reducer: {
    services: serviceSlice.reducer,
    activations: activationSlice.reducer,
  },

  devTools: process.env.NODE_ENV === "development",
});

type ReduxState = ReturnType<typeof redux_store.getState>;
type ReduxDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

export const useReduxDispatch = () => useDispatch<ReduxDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default redux_store;
