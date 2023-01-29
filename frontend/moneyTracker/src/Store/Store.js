import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./Reducer";
import { apiSlice } from "../Store/ApiSlice";

export const store = configureStore({
  reducer: {
    expense: expenseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
