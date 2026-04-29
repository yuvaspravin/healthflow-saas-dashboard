import { LayoutGrid, List } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setViewMode } from "../../features/patients/patientSlice";

export const ViewToggle = () => {
  const dispatch = useAppDispatch();
  const viewMode = useAppSelector((state) => state.patients.viewMode);

  return (
    <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
      <button
        onClick={() => dispatch(setViewMode("grid"))}
        className={`p-2 rounded-lg transition-all ${
          viewMode === "grid"
            ? "bg-white text-emerald-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => dispatch(setViewMode("list"))}
        className={`p-2 rounded-lg transition-all ${
          viewMode === "list"
            ? "bg-white text-emerald-600 shadow-sm"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <List size={20} />
      </button>
    </div>
  );
};
