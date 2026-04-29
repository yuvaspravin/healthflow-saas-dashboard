import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  setPatients,
  setLoading,
  openModal,
} from "../features/patients/patientSlice";
import { MOCK_PATIENTS } from "../features/patients/patientData";

// Components
import MainLayout from "../components/layout/MainLayout";
import { Button } from "../components/ui/Button";
import { ViewToggle } from "../components/patients/ViewToggle";
import { PatientSearch } from "../components/patients/PatientSearch";
import { PatientSkeleton } from "../components/patients/PatientSkeleton";
import { PatientModal } from "../components/patients/PatientModal";
import { DeleteModal } from "../components/patients/DeleteModal";
import PatientGrid from "../components/patients/PatientGrid";
import PatientList from "../components/patients/PatientList";
import type { Patient } from "../types/patient";

const Patients = () => {
  const dispatch = useAppDispatch();

  // 1. Grab all necessary state from Redux
  const {
    patients,
    viewMode,
    searchTerm,
    loading,
    selectedPatient,
    modalMode,
  } = useAppSelector((state) => state.patients);

  // 2. SMART FETCH: Only load mock data if LocalStorage is empty
  useEffect(() => {
    if (patients.length === 0) {
      // Show the skeleton loader for the initial "empty" state
      dispatch(setLoading(true));
      const timer = setTimeout(() => {
        dispatch(setPatients(MOCK_PATIENTS));
        dispatch(setLoading(false));
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      // If we already have patients (from LocalStorage),
      // make sure loading is false immediately so they appear.
      dispatch(setLoading(false));
    }
  }, [dispatch, patients.length]); // Track patients.length to decide when to stop loading

  // 3. Client-side Search Logic
  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAction = (mode: "edit" | "view" | "delete", patient: Patient) => {
    dispatch(openModal({ mode, patient }));
  };

  return (
    <MainLayout>
      <header className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        {/* Left Side: Title */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Patient Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage and monitor patient records across the facility.
          </p>
        </div>

        {/* Right Side: Controls aligned to the right/stacked on mobile */}
        <div className="flex flex-col items-end gap-3 w-full md:w-auto">
          <Button
            onClick={() => dispatch(openModal({ mode: "add" }))}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <Plus size={18} /> Add Patient
          </Button>

          <div className="flex items-center gap-3 w-full">
            <PatientSearch />
            <ViewToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="transition-all duration-300">
        {loading ? (
          <PatientSkeleton />
        ) : filteredPatients.length > 0 ? (
          viewMode === "grid" ? (
            <PatientGrid
              patients={filteredPatients}
              onDelete={(patient) => handleAction("delete", patient)}
              onEdit={(p) => handleAction("edit", p)}
              onView={(p) => handleAction("view", p)}
            />
          ) : (
            <PatientList
              patients={filteredPatients}
              onDelete={(patient) => handleAction("delete", patient)}
              onEdit={(p) => handleAction("edit", p)}
              onView={(p) => handleAction("view", p)}
            />
          )
        ) : (
          /* Empty State: Only shows if search results are zero */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Plus className="text-slate-300 rotate-45" size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              No patients found
            </h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
              We couldn't find any records matching{" "}
              <span className="font-bold text-emerald-600">"{searchTerm}"</span>
              . Try checking the spelling or adding a new patient record.
            </p>
          </div>
        )}
      </div>

      {/* MODAL LAYER */}
      {/* key={id} ensures React recreates the form state for each patient */}
      <PatientModal key={selectedPatient?.id || modalMode || "new-form"} />
      <DeleteModal />
    </MainLayout>
  );
};

export default Patients;
