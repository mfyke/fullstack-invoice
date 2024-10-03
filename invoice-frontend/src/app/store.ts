import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { invoiceApi } from "./services/invoiceService";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(invoiceApi.middleware),
});

export default store;