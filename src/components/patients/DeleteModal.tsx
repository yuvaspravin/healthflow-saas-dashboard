import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { Button } from "../ui/Button";
import {
  closeModal,
  deletePatient,
} from "../../features/patients/patientSlice";
import { sendLocalNotification } from "../../services/notificationService";
import { toast } from "sonner";

export const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, modalMode, selectedPatient } = useAppSelector(
    (state) => state.patients,
  );

  if (!isModalOpen || modalMode !== "delete") return null;
  const confirmDelete = () => {
    if (selectedPatient) {
      dispatch(deletePatient(selectedPatient.id));
      sendLocalNotification(
        "Record Deleted",
        `${selectedPatient.name}'s data was removed.`,
      );
      dispatch(closeModal());
      toast.success("Profile Updated");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Are you sure?</h2>
        <p className="text-slate-500 text-sm mb-8">
          You are about to delete <b>{selectedPatient?.name}</b>. This action
          cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-red-500 hover:bg-red-600 border-none"
            onClick={() => confirmDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
