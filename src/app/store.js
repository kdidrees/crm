import { configureStore } from "@reduxjs/toolkit";
import leadReducer from "../redux/slices/leadForm";

export const store = configureStore({
  reducer: {
    // put all the reducers here
    leads: leadReducer,
  },
});
