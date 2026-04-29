import { Search } from "lucide-react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { searchPatients } from "../../features/patients/patientSlice";

export const PatientSearch = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="relative max-w-md w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search by name or diagnosis..."
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
        onChange={(e) => dispatch(searchPatients(e.target.value))}
      />
    </div>
  );
};
