import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./Slice/ApiSlice";
import functionReducer from "./Slice/FunctionSlice";
import authSlice from "./Slice/authSlice";
// ...
const store = configureStore({
  reducer: {
    function: functionReducer,
    authSlice: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
