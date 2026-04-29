import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  closeModal,
  addPatient,
  updatePatient,
} from "../../features/patients/patientSlice";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useState } from "react";
import type { Patient } from "../../types/patient";
import { sendLocalNotification } from "../../services/notificationService";
import { toast } from "sonner";

interface FormState {
  name: string;
  diagnosis: string;
  age: string;
  status: string;
}

export const PatientModal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalMode, selectedPatient } = useAppSelector(
    (state) => state.patients,
  );

  const [formData, setFormData] = useState<FormState>(() => ({
    name: selectedPatient?.name || "",
    diagnosis: selectedPatient?.diagnosis || "",
    age: selectedPatient ? String(selectedPatient.age) : "",
    status: selectedPatient?.status || "Stable",
  }));

  // Don't render if the modal is closed or if we're in delete mode (which uses DeleteModal)
  if (!isModalOpen || modalMode === "delete") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the patient object
    const patientBase = {
      name: formData.name,
      diagnosis: formData.diagnosis,
      age: Number(formData.age), // Convert string back to number for the data model
      status: formData.status as "Stable" | "Critical" | "Recovering",
    };

    if (modalMode === "add") {
      const newPatient: Patient = {
        ...patientBase,
        id: Date.now().toString(),
        gender: "Other", // Default values for fields not in the simple form
        lastVisit: new Date().toISOString().split("T")[0],
        email: "",
        phone: "",
      };

      sendLocalNotification(
        "Patient Added",
        `${formData.name} has been successfully registered.`,
      );

      dispatch(addPatient(newPatient));
      toast.success("Patient record created successfully");
    } else if (modalMode === "edit" && selectedPatient) {
      const updatedPatient: Patient = {
        ...selectedPatient,
        ...patientBase,
      };
      sendLocalNotification(
        "Profile Updated",
        `Changes for ${formData.name} have been saved.`,
      );
      dispatch(updatePatient(updatedPatient));
      toast.success("Profile Updated");
    }

    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 capitalize">
            {modalMode} Patient
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Full Name"
            disabled={modalMode === "view"}
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Diagnosis"
            disabled={modalMode === "view"}
            placeholder="e.g. Hypertension"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              type="number"
              disabled={modalMode === "view"}
              placeholder="0"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                disabled={modalMode === "view"}
                className="h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white disabled:bg-slate-50 disabled:text-slate-500 transition-all"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Stable">Stable</option>
                <option value="Recovering">Recovering</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(closeModal())}
            >
              {modalMode === "view" ? "Close" : "Cancel"}
            </Button>

            {modalMode !== "view" && (
              <Button type="submit">
                {modalMode === "add" ? "Add Patient" : "Save Changes"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
