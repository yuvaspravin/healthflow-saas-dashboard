import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import patientReducer from "../features/patients/patientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patients: patientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "healthflow_patients",
    JSON.stringify(state.patients.patients),
  );
});
