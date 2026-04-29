import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Patient, ViewMode } from "../../types/patient";
import { MOCK_PATIENTS } from "./patientData";

export interface PatientState {
  patients: Patient[];
  searchTerm: string;
  viewMode: ViewMode;
  loading: boolean;
  isModalOpen: boolean;
  modalMode: "add" | "edit" | "view" | "delete" | null;
  selectedPatient: Patient | null;
}
const loadPersistedPatients = () => {
  try {
    const serializedState = localStorage.getItem("healthflow_patients");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const persistedPatients = loadPersistedPatients();

const initialState: PatientState = {
  patients: persistedPatients || MOCK_PATIENTS,
  searchTerm: "",
  viewMode: "grid",
  loading: false,
  isModalOpen: false,
  modalMode: null,
  selectedPatient: null,
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setViewMode: (state, action: PayloadAction<ViewMode>) => {
      state.viewMode = action.payload;
    },
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    searchPatients: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    // MODAL CONTROL LOGIC
    openModal: (
      state,
      action: PayloadAction<{
        mode: PatientState["modalMode"];
        patient?: Patient;
      }>,
    ) => {
      state.isModalOpen = true;
      state.modalMode = action.payload.mode;
      state.selectedPatient = action.payload.patient || null;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalMode = null;
      state.selectedPatient = null;
    },

    // CRUD LOGIC
    addPatient: (state, action: PayloadAction<Patient>) => {
      // Add new patient to the beginning of the list
      state.patients.unshift(action.payload);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setViewMode,
  setPatients,
  searchPatients,
  openModal,
  closeModal,
  addPatient,
  updatePatient,
  deletePatient,
} = patientSlice.actions;

export default patientSlice.reducer;
